import "crisp-game-lib";
import { CardView, characters, SpeechBubbleView } from "../../utils/view.ts";
import {
  CartographersExpedition,
  ExpeditionState,
  ExpeditionAction,
  OBSTACLE_RANKS,
} from "./definition.ts";
import { Card, Rank, Suit } from "../../types.ts";

const isRecording = false;

let gameState: ExpeditionState | null = null;
let selectedHandIndex: number | null = null;
let selectedSourceCell: { r: number; c: number } | null = null;
// --- 追加: ゲーム状態と終了理由を保持する変数 ---
let gameStatus: "ONGOING" | "WIN" | "LOSE" = "ONGOING";
let gameOverReason: string | null = null;
// --- 追加: 捨てモード状態 ---
let isDiscardModeActive: boolean = false;

// --- 追加: チュートリアル状態変数 ---
type TutorialStep = 1 | 2 | 3 | 4 | 5 | 6 | "OFF"; // ステップ6を追加
let tutorialStep: TutorialStep = 1; // 初期ステップ

// --- 追加: 前フレームのチュートリアルステップ ---
let previousTutorialStep: TutorialStep | null = null;

// --- 追加: 吹き出しインスタンス ---
// 位置やサイズは手札エリア付近に仮設定
let tutorialBubble: SpeechBubbleView | null = null;

// --- このセッションで表示済みのチュートリアルステップ ---
let shownTutorialStepsThisSession: Set<TutorialStep> = new Set();

// --- 追加: 盤面カードビューを保持する2次元配列 ---
let gridCardViews: (CardView | null)[][] = [];
// --- 追加: 手札カードビューを保持する配列 ---
let handCardViews: (CardView | null)[] = []; // Allow null for empty slots

// --- グリッドとカード表示用定数 ---
const GRID_START_X = 5;
const GRID_START_Y = 10;
const CARD_DISPLAY_WIDTH = 12;
const CARD_DISPLAY_HEIGHT = 18;
const VIEW_SIZE = { x: 70, y: 130 }; // Add view size constant

// --- 情報表示用の定数 (宣言順序修正) ---
const LANDMARK_TEXT_X = 5;
const LANDMARK_TEXT_Y = 5;
const HAND_CARD_START_X = GRID_START_X; // HAND_CARD_START_X を先に宣言
const HAND_LABEL_Y = GRID_START_Y + 5 * CARD_DISPLAY_HEIGHT + 9;
const DRAW_TEXT_X = HAND_CARD_START_X; // HAND_CARD_START_X を使用
const DRAW_TEXT_Y = HAND_LABEL_Y - 5;
const HAND_CARD_Y = HAND_LABEL_Y;

// --- ゴミ箱アイコン用の定数 (X座標を修正) ---
const DISCARD_ICON_X = VIEW_SIZE.x - 5; // Use VIEW_SIZE.x
const DISCARD_ICON_Y = VIEW_SIZE.y - 5; // Use VIEW_SIZE.y
const DISCARD_ICON_WIDTH = 6;
const DISCARD_ICON_HEIGHT = 6;

// --- NEW: Game Lifecycle State ---
type GameLifeCycle = "NeedsInit" | "Initializing" | "Ongoing" | "GameOver";
let gameLifeCycle: GameLifeCycle = "NeedsInit";

// --- Helper Functions ---
function rankToNumber(rank: Rank): number {
  if (rank === "A") return 1;
  if (rank === "K") return 13;
  if (rank === "Q") return 12;
  if (rank === "J") return 11;
  return parseInt(rank, 10);
}

function suitToLowercase(suit: Suit): "spade" | "heart" | "diamond" | "club" {
  return suit.toLowerCase() as "spade" | "heart" | "diamond" | "club";
}

function canSelectHandForSource(sourceCell: { r: number; c: number }): boolean {
  if (!gameState || !sourceCell) return false;
  const sourceCard = gameState.grid[sourceCell.r]?.[sourceCell.c];
  if (!sourceCard || !sourceCard.faceUp) return false;

  for (const handCard of gameState.hand) {
    if (
      handCard &&
      (handCard.suit === sourceCard.suit || handCard.rank === sourceCard.rank)
    ) {
      return true; // マッチする手札が見つかった
    }
  }
  return false; // マッチする手札がなかった
}

// --- チュートリアル吹き出しの状態を更新/表示する関数 (変更時のみ呼び出される想定) ---
function updateTutorialBubble(
  currentStep: TutorialStep,
  shownSteps: Set<TutorialStep>,
  bubble: SpeechBubbleView | null
  // currentSourceSelection は不要になった
): void {
  if (!bubble) return;

  // チュートリアルがOFFなら隠す
  if (currentStep === "OFF") {
    bubble.hide();
    return;
  }

  const bubbleMargin = 5; // 共通マージン
  // --- MODIFIED: Check if already shown ---
  const alreadyShown = shownSteps.has(currentStep);

  // Hide if already shown, otherwise show and mark as shown
  // Exception: Always show step 6 if it's the current step, as it's the goal.
  if (alreadyShown && currentStep !== 6) {
    bubble.hide();
    return; // Don't proceed if hidden
  } else if (!alreadyShown) {
    shownSteps.add(currentStep); // Mark as shown if it wasn't
  }

  // --- Show the bubble (unless hidden above) ---
  bubble.show();

  if (currentStep === 1) {
    // --- 修正: 表示済みなら hide() は削除 ---
    // if (!shownSteps.has(1)) { // Condition removed
    bubble.setText("Click a face-up card.");
    const centerCardTopY = GRID_START_Y + 2 * CARD_DISPLAY_HEIGHT;
    const bubbleX = GRID_START_X + 2.5 * CARD_DISPLAY_WIDTH - bubble.size.x / 2;
    const bubbleY = centerCardTopY - bubble.size.y - bubbleMargin + 1;
    bubble.pos.set(bubbleX, bubbleY);
    bubble.setTail("center", "down");
    // bubble.show(); // Moved up
    // shownSteps.add(1); // Moved up
    // } else {
    //   bubble.hide(); // 表示済みなら隠す // Removed
    // }
  } else if (currentStep === 2) {
    // --- 修正: 表示済みなら hide() は削除 ---
    // if (!shownSteps.has(2)) { // Condition removed
    bubble.setText("OK! Now click a Hand card (match suit or rank).");
    const handTopY = HAND_CARD_Y;
    const bubbleX = HAND_CARD_START_X + 5;
    const bubbleY = handTopY - bubble.size.y - bubbleMargin + 3;
    bubble.pos.set(bubbleX, bubbleY);
    bubble.setTail("left", "none");
    // bubble.show(); // Moved up
    // shownSteps.add(2); // Moved up
    // } else {
    //   bubble.hide(); // 表示済みなら隠す // Removed
    // }
  } else if (currentStep === 3) {
    // --- 修正: 表示済みなら hide() は削除 ---
    // if (!shownSteps.has(3)) { // Condition removed
    bubble.setText(
      "No match? Click the trash icon, then a hand card to discard."
    );
    // 位置をゴミ箱アイコン(65, 125)の上に調整
    const bubbleX = DISCARD_ICON_X - bubble.size.x * 0.9;
    const bubbleY =
      DISCARD_ICON_Y -
      bubble.size.y -
      bubbleMargin -
      DISCARD_ICON_HEIGHT / 2 -
      5; // アイコンの上
    bubble.pos.set(bubbleX, bubbleY);
    bubble.setTail("right", "down"); // Tail: right, down (一致)
    // bubble.show(); // Moved up
    // shownSteps.add(3); // Moved up
    // } else {
    //   bubble.hide(); // 表示済みなら隠す // Removed
    // }
  } else if (currentStep === 4) {
    // --- 修正: 表示済みなら hide() は削除 ---
    // if (!shownSteps.has(4)) { // Condition removed
    bubble.setText("Good! Click a face-down card next to a Selected card.");
    const sourceBottomY = GRID_START_Y + 3 * CARD_DISPLAY_HEIGHT; // Approximate original Y reference
    let bubbleX = GRID_START_X + 2.5 * CARD_DISPLAY_WIDTH - bubble.size.x / 2;
    let bubbleY = sourceBottomY + bubbleMargin; // Position Y calculation seems consistent (below center)
    bubbleX = clamp(bubbleX, 0, VIEW_SIZE.x - bubble.size.x); // Use VIEW_SIZE.x
    bubble.setTail("center", "none"); // Revert Tail: center, none
    bubble.pos.set(bubbleX, bubbleY); // Position seems roughly consistent
    // bubble.show(); // Moved up
    // shownSteps.add(4); // Moved up
    // } else {
    //   bubble.hide(); // 表示済みなら隠す // Removed
    // }
  } else if (currentStep === 5) {
    // if (!shownSteps.has(5)) { // Condition removed
    bubble.setText(
      "10, J, Q, K are special! Need matching rank (J for J, etc.) to reveal from here."
    );
    const bubbleX = GRID_START_X + 2.5 * CARD_DISPLAY_WIDTH - bubble.size.x / 2;
    const bubbleY = GRID_START_Y; // Revert Y position to top edge
    bubble.pos.set(clamp(bubbleX, 0, VIEW_SIZE.x - bubble.size.x), bubbleY); // Use VIEW_SIZE.x
    bubble.setTail("center", "none"); // Revert Tail: center, none
    // bubble.show(); // Moved up
    // shownSteps.add(5); // Moved up
    // } else {
    //   bubble.hide(); // Removed
    // }
  } else if (currentStep === 6) {
    // if (!shownSteps.has(6)) { // Condition removed, handled by general show/hide logic
    bubble.setText("Goal: Reveal 4 corner Aces (A)! Lose if draw pile empty!");
    const bubbleX = GRID_START_X + 2.5 * CARD_DISPLAY_WIDTH - bubble.size.x / 2;
    const bubbleY = GRID_START_Y; // Revert Y position to top edge
    bubble.pos.set(clamp(bubbleX, 0, VIEW_SIZE.x - bubble.size.x), bubbleY); // Use VIEW_SIZE.x
    bubble.setTail("center", "none"); // Revert Tail: center, none
    // bubble.show(); // Moved up
    // shownSteps.add(6); // Moved up and handled above
    // } else {
    //   bubble.hide(); // Removed
    // }
  } else {
    // 想定外のステップの場合は隠す
    bubble.hide();
  }
}

// --- NEW: Function to handle tutorial state updates based on game actions ---
function handleTutorialInputLogic(
  step: TutorialStep,
  actionType:
    | "sourceClicked"
    | "targetClicked" // Target click before validation
    | "handClicked"
    | "backgroundClicked"
    | "discardTriggered" // Clicked trash icon
    | "discardActionTaken" // Discarded a card
    | "revealActionTaken" // Successfully revealed a card
    | "gameOver"
    | "invalidAction", // e.g., buzz sound played
  currentState: {
    selectedSourceCell: { r: number; c: number } | null;
    selectedHandIndex: number | null;
    isDiscardModeActive: boolean;
    revealedCardRank?: Rank; // Optional, needed for 'revealActionTaken'
    shownSteps: Set<TutorialStep>;
    canSelectHand?: boolean; // Optional, needed for 'sourceClicked'
    isValidRevealAttempt?: boolean; // Optional, needed for 'targetClicked'
  }
): TutorialStep {
  if (step === "OFF") return "OFF"; // Stay off if already off

  switch (actionType) {
    case "sourceClicked":
      if (currentState.selectedSourceCell) {
        // Source was selected (not deselected)
        // If hand is already selected, it might transition to step 4, but handClicked handles that.
        // If hand is NOT selected, transition depends on whether hand can be selected.
        if (currentState.selectedHandIndex === null) {
          // Only transition if going from initial prompt steps.
          if (step === 1 || step === 2 || step === 3) {
            return currentState.canSelectHand ? 2 : 3;
          }
        }
      } else {
        // Source was deselected by clicking it again.
        return 1; // Go back to prompting for source selection.
      }
      break; // Keep current step if no specific logic matches (e.g., source selected while hand already selected)

    case "targetClicked":
      // Called when a face-down card is clicked during the target phase.
      // The actual reveal logic determines the next step in 'revealActionTaken'.
      // If the *attempt* is invalid (e.g., JQK mismatch), 'invalidAction' might be called after the buzz sound.
      // No immediate step change here based just on clicking a potential target.
      break;

    case "handClicked":
      if (
        currentState.selectedHandIndex !== null &&
        currentState.selectedSourceCell !== null
      ) {
        // Both Source and Hand selected VALIDLY (assumption based on call context).
        // The check for validity (match) should happen *before* calling this.
        return 4; // Prompt for target selection.
      } else if (
        currentState.selectedHandIndex !== null &&
        currentState.selectedSourceCell === null
      ) {
        // Hand selected, but no source selected yet.
        return 1; // Stay/Go back to prompting for source.
      } else if (currentState.selectedHandIndex === null) {
        // Hand was deselected.
        return 1; // Go back to prompting for source.
      }
      break;

    case "backgroundClicked":
      if (!currentState.isDiscardModeActive) {
        // Ignore background click if discard is active.
        selectedHandIndex = null; // Deselect hand on background click
        selectedSourceCell = null; // Deselect source on background click
        return 1; // Reset to step 1.
      }
      break;

    case "discardTriggered": // Clicked trash icon.
      // No step change just for clicking the icon. Step 3 message covers this.
      // May visually highlight hand cards, but that's drawing logic.
      break;

    case "discardActionTaken":
      // After successful discard & draw.
      return 1; // Reset to prompt for source.

    case "revealActionTaken":
      // Called AFTER a successful reveal action.
      if (currentState.revealedCardRank) {
        // --- MODIFIED: Check against OBSTACLE_RANKS ---
        const isObstacle = OBSTACLE_RANKS.includes(
          currentState.revealedCardRank
        );
        const step5Shown = currentState.shownSteps.has(5); // Step 5 is the Obstacle explanation
        const step6Shown = currentState.shownSteps.has(6); // Step 6 is the goal

        if (isObstacle && !step5Shown) {
          return 5; // Show Obstacle explanation first time one is revealed.
        } else if (!step6Shown) {
          return 6; // Show objective if not shown yet.
        } else {
          // Both key steps (JQK if applicable, objective) have been shown.
          return 1; // Reset to prompt for the next source card.
        }
      } else {
        // Should not happen if a card was revealed, but reset just in case.
        return 1;
      }
      break;

    case "gameOver":
      return "OFF"; // Turn off tutorial.

    case "invalidAction":
      // Buzz sound played due to invalid move.
      // Example: Tried invalid target -> Should stay in step 4 (prompting for target).
      if (step === 4) {
        return 4; // Stay on step 4.
      }
      // Example: Tried invalid hand match for source -> Should stay in step 2 or 3.
      if (step === 2 || step === 3) {
        // Determine if it should be 2 or 3 based on canSelectHand?
        // Re-evaluating might be complex here. Let's just stay.
        return step;
      }
      // If invalid source selection (e.g., clicking face down initially) -> Stay in step 1.
      if (step === 1) {
        return 1;
      }
      // For now, keep the current step on invalid actions, letting the user retry.
      break;
  }

  // Return current step if no specific transition occurred in the switch cases above.
  return step;
}

// --- NEW: Function to update the tutorial display state ---
export function updateTutorialDisplay(
  step: TutorialStep,
  prevStep: TutorialStep | null,
  bubble: SpeechBubbleView | null,
  shownSteps: Set<TutorialStep>
) {
  if (step !== prevStep && bubble) {
    // Update the bubble visual state only when the step changes
    updateTutorialBubble(step, shownSteps, bubble);
    previousTutorialStep = step; // Update the global previous step tracker AFTER updating the bubble
  }
}

// --- 追加: 手札のカード位置を計算するヘルパー関数 ---
function calculateHandPos(index: number): Vector {
  const posX =
    HAND_CARD_START_X + index * CARD_DISPLAY_WIDTH + CARD_DISPLAY_WIDTH / 2;
  const posY = HAND_CARD_Y + CARD_DISPLAY_HEIGHT / 2;
  return vec(posX, posY);
}

// --- 追加: カードビューを初期化/更新する関数 ---
function initializeCardViews(state: ExpeditionState) {
  // グリッドビュー初期化
  gridCardViews = [];
  for (let r = 0; r < state.grid.length; r++) {
    gridCardViews[r] = [];
    for (let c = 0; c < state.grid[r].length; c++) {
      const cell = state.grid[r][c];
      if (cell) {
        const posX =
          GRID_START_X + c * CARD_DISPLAY_WIDTH + CARD_DISPLAY_WIDTH / 2;
        const posY =
          GRID_START_Y + r * CARD_DISPLAY_HEIGHT + CARD_DISPLAY_HEIGHT / 2;
        const cardView = new CardView();
        cardView.pos = vec(posX, posY);
        cardView.rank = rankToNumber(cell.rank);
        cardView.suit = suitToLowercase(cell.suit);
        cardView.isFaceUp = cell.faceUp;
        gridCardViews[r][c] = cardView;
      } else {
        gridCardViews[r][c] = null;
      }
    }
  }

  // Initialize handCardViews (allow null initially, but should be filled)
  handCardViews = Array(state.hand.length).fill(null);
  state.hand.forEach((card, index) => {
    const pos = calculateHandPos(index);
    const cardView = new CardView();
    cardView.pos = pos;
    cardView.rank = rankToNumber(card.rank);
    cardView.suit = suitToLowercase(card.suit);
    cardView.isFaceUp = true;
    handCardViews[index] = cardView; // Place directly at index
  });
}

// --- NEW: Function for session initialization ---
function initializeSession() {
  console.log("DEBUG: Initializing session...");
  playBgm();
  if (!tutorialBubble) {
    tutorialBubble = new SpeechBubbleView(0, 0, 60, 20, "", {
      align: "center",
      direction: "down",
    });
  }
  // Tutorial state is NOT reset here per user request
  // previousTutorialStep = null;
  // shownTutorialStepsThisSession.clear();
  // tutorialStep = 1;
  console.log("DEBUG: Session initialization complete.");
}

// --- NEW: Function to start a new game ---
// (Returns true on success, false on failure. Sets gameState)
function startNewGame(): boolean {
  // <-- Return type boolean
  console.log("DEBUG: Starting new game...");

  // Setup new game state using the definition
  gameState = CartographersExpedition.setupGame();

  // Create views based on the new game state
  initializeCardViews(gameState);

  // Reset selections and game status
  selectedHandIndex = null;
  selectedSourceCell = null;
  isDiscardModeActive = false;
  gameStatus = "ONGOING"; // Reset gameStatus for display
  gameOverReason = null;
  // Tutorial step is NOT reset here per user request

  // Safety check in case setup failed (unlikely if setupGame doesn't return null/throw)
  if (!gameState) {
    console.error(
      "CRITICAL: Failed to initialize gameState after setupGame() call!"
    );
    return false; // Indicate failure
  }
  console.log("DEBUG: New game start complete.");
  // --- Update tutorial display immediately after new game start ---
  // (Moved tutorial update call to main update loop after successful init)
  return true; // Indicate success
}

// --- NEW: Function to handle input during Ongoing state ---
// Returns true if an action was taken, false otherwise.
export function handleOngoingInput(): boolean {
  if (!gameState) return false; // Should not happen due to guard in update, but safe check

  const clickPos = input.pos;
  let clickedOnElement = false;
  let actionTaken = false;
  let invalidActionSoundPlayed = false; // Track if buzz sound was played this frame

  // --- 1. ゴミ箱アイコンクリック ---
  const iconRect = {
    x: DISCARD_ICON_X - DISCARD_ICON_WIDTH / 2,
    y: DISCARD_ICON_Y - DISCARD_ICON_HEIGHT / 2,
    width: DISCARD_ICON_WIDTH,
    height: DISCARD_ICON_HEIGHT,
  };
  if (
    clickPos.isInRect(iconRect.x, iconRect.y, iconRect.width, iconRect.height)
  ) {
    play("tap");
    isDiscardModeActive = !isDiscardModeActive;
    if (isDiscardModeActive) {
      selectedSourceCell = null; // Deselect source when activating discard mode
    }
    clickedOnElement = true;
    // --- Update Tutorial Step ---
    tutorialStep = handleTutorialInputLogic(tutorialStep, "discardTriggered", {
      selectedSourceCell,
      selectedHandIndex,
      isDiscardModeActive,
      shownSteps: shownTutorialStepsThisSession,
    });
  }

  // --- 2. 盤面クリック処理 (revealAdjacent / source selection) ---
  if (!actionTaken && !clickedOnElement) {
    for (let r = 0; r < 5 && !clickedOnElement && !actionTaken; r++) {
      for (let c = 0; c < 5 && !clickedOnElement && !actionTaken; c++) {
        const cardView = gridCardViews[r]?.[c];

        if (cardView && cardView.containsPoint(clickPos)) {
          clickedOnElement = true;
          const cell = gameState.grid[r]?.[c];

          // --- Grid click while discard mode active ---
          if (isDiscardModeActive) {
            isDiscardModeActive = false; // Clicking grid cancels discard mode
            // Treat as background click for tutorial reset
            tutorialStep = handleTutorialInputLogic(
              tutorialStep,
              "backgroundClicked",
              {
                selectedSourceCell,
                selectedHandIndex,
                isDiscardModeActive,
                shownSteps: shownTutorialStepsThisSession,
              }
            );
            break; // inner loop break
          }

          // --- ターゲット選択フェーズ (Source & Hand already selected) ---
          if (
            cell &&
            selectedHandIndex !== null &&
            selectedSourceCell !== null
          ) {
            if (cell.faceUp) {
              // Clicked a face-up card during target phase
              const isSameSource =
                selectedSourceCell.r === r && selectedSourceCell.c === c;
              play("tap");
              if (isSameSource) {
                // Clicked the ALREADY selected source card: Deselect ONLY the source
                console.log(
                  "Clicked selected source again -> Deselecting source ONLY."
                );
                selectedSourceCell = null; // Deselect source only
                // Tutorial Step Update: Hand still selected, source deselected -> back to step 1
                tutorialStep = handleTutorialInputLogic(
                  tutorialStep,
                  "sourceClicked",
                  {
                    selectedSourceCell, // now null
                    selectedHandIndex,
                    isDiscardModeActive,
                    shownSteps: shownTutorialStepsThisSession,
                    canSelectHand: false, // Not relevant as source is deselected
                  }
                );
              } else {
                // Clicked a DIFFERENT face-up card: Treat as new source selection
                console.log(
                  "Clicked different face-up card -> New source selection."
                );
                selectedSourceCell = { r, c }; // Keep hand selected, change source
                // Tutorial Step Update: Based on new source and existing hand selection
                const newCanSelectHand =
                  canSelectHandForSource(selectedSourceCell);
                tutorialStep = handleTutorialInputLogic(
                  tutorialStep,
                  "sourceClicked",
                  {
                    selectedSourceCell, // the new one
                    selectedHandIndex, // still selected
                    isDiscardModeActive,
                    shownSteps: shownTutorialStepsThisSession,
                    canSelectHand: newCanSelectHand,
                  }
                );
                // Since hand is selected, check if this new combo is valid to move to step 4
                const handCardForCheck = gameState.hand[selectedHandIndex];
                const sourceCardForCheck = gameState.grid[r]?.[c];
                let isValidComboNow = false;
                if (handCardForCheck && sourceCardForCheck) {
                  const isObstacle = OBSTACLE_RANKS.includes(
                    sourceCardForCheck.rank
                  );
                  if (isObstacle) {
                    if (handCardForCheck.rank === sourceCardForCheck.rank) {
                      isValidComboNow = true;
                    }
                  } else {
                    if (
                      handCardForCheck.suit === sourceCardForCheck.suit ||
                      handCardForCheck.rank === sourceCardForCheck.rank
                    )
                      isValidComboNow = true;
                  }
                }
                if (isValidComboNow) {
                  tutorialStep = 4; // If valid combo, immediately go to prompt target
                } else {
                  // If invalid combo (e.g. JQK mismatch), stay in step 2/3 based on canSelectHand
                  tutorialStep = newCanSelectHand ? 2 : 3;
                }
              }
              // --- END MODIFICATION for face-up click during target phase ---
            } else if (
              // Clicked face-down card (potential target)
              cardView &&
              !cardView.isFlipping &&
              !cardView.isMoving
            ) {
              // Check adjacency
              const dx = Math.abs(selectedSourceCell.r - r);
              const dy = Math.abs(selectedSourceCell.c - c);
              let isValidRevealAttempt = false;
              let handCard: Card | undefined = undefined;
              let sourceCard: Card | null | undefined = undefined;

              if (dx + dy === 1) {
                // Is adjacent?
                handCard = gameState.hand[selectedHandIndex];
                sourceCard =
                  gameState.grid[selectedSourceCell.r]?.[selectedSourceCell.c];

                // Check validity (using OBSTACLE_RANKS)
                if (sourceCard && handCard) {
                  const isObstacleSource = OBSTACLE_RANKS.includes(
                    sourceCard.rank
                  );
                  if (isObstacleSource) {
                    // Obstacle ranks: Rank must match
                    if (handCard.rank === sourceCard.rank) {
                      isValidRevealAttempt = true;
                    }
                  } else {
                    // Non-obstacle ranks: Suit or rank must match
                    if (
                      handCard.suit === sourceCard.suit ||
                      handCard.rank === sourceCard.rank
                    ) {
                      isValidRevealAttempt = true;
                    }
                  }
                }
              }

              // --- Call tutorial logic for target click attempt ---
              // Doesn't change step here, but might be used by handleTutorialInputLogic later if invalid
              // handleTutorialInputLogic(tutorialStep, "targetClicked", { /* ... state ... */ isValidRevealAttempt }); // Not changing step here

              if (isValidRevealAttempt && handCard && sourceCard) {
                // --- Valid Reveal Action ---
                const action: ExpeditionAction = {
                  type: "revealAdjacent",
                  payload: {
                    handIndex: selectedHandIndex,
                    sourceRow: selectedSourceCell.r,
                    sourceCol: selectedSourceCell.c,
                    targetRow: r,
                    targetCol: c,
                  },
                };
                const handIndexToReplace = selectedHandIndex;
                const targetCardView = gridCardViews[r]?.[c]; // Use targetCardView from outer scope

                if (targetCardView) {
                  // Ensure target view exists before animating/acting
                  targetCardView.startFlipAnimation(true);

                  const wasDrawPileEmpty = gameState.drawPile.length === 0;
                  // Apply game state change AFTER starting animation
                  gameState = CartographersExpedition.applyAction(
                    gameState,
                    action
                  );
                  const revealedCard = gameState.grid[r]?.[c]; // Get state AFTER action

                  // Play sound based on revealed card
                  play(revealedCard?.rank === "A" ? "coin" : "flip");

                  // --- Update Tutorial AFTER successful reveal ---
                  tutorialStep = handleTutorialInputLogic(
                    tutorialStep,
                    "revealActionTaken",
                    {
                      selectedSourceCell: null, // selections reset after action
                      selectedHandIndex: null,
                      isDiscardModeActive,
                      shownSteps: shownTutorialStepsThisSession,
                      revealedCardRank: revealedCard?.rank, // Pass revealed rank
                    }
                  );

                  // Create and place new view if card was drawn
                  if (!wasDrawPileEmpty) {
                    const newCard = gameState.hand[handIndexToReplace];
                    const finalPos = calculateHandPos(handIndexToReplace);
                    const startPos = vec(finalPos.x, VIEW_SIZE.y + 30); // Use VIEW_SIZE.y
                    const newCardView = new CardView();
                    newCardView.pos = startPos;
                    newCardView.rank = rankToNumber(newCard.rank);
                    newCardView.suit = suitToLowercase(newCard.suit);
                    newCardView.isFaceUp = true;
                    newCardView.startMoveAnimation(finalPos);
                    handCardViews[handIndexToReplace] = newCardView;
                  } else {
                    handCardViews[handIndexToReplace] = null; // No card drawn
                  }

                  selectedHandIndex = null; // Reset selections
                  selectedSourceCell = null;
                  actionTaken = true; // Mark action as taken
                } else {
                  console.error(`Target CardView missing at [${r}, ${c}]`);
                  play("buzz"); // Should not happen, but play buzz if view is missing
                  invalidActionSoundPlayed = true;
                }
              } else {
                play("buzz"); // Invalid move (not adjacent, mismatch, etc.)
                invalidActionSoundPlayed = true;
              }
            }
          } else if (cell && cell.faceUp) {
            // --- 起点選択フェーズ (Source selection / deselection) ---
            play("tap");
            const alreadySelected =
              selectedSourceCell?.r === r && selectedSourceCell?.c === c;
            selectedSourceCell = alreadySelected ? null : { r, c };
            // --- Update Tutorial Step ---
            tutorialStep = handleTutorialInputLogic(
              tutorialStep,
              "sourceClicked",
              {
                selectedSourceCell, // the new value (null or {r,c})
                selectedHandIndex, // existing value
                isDiscardModeActive,
                shownSteps: shownTutorialStepsThisSession,
                canSelectHand: selectedSourceCell
                  ? canSelectHandForSource(selectedSourceCell)
                  : false,
              }
            );
          } else if (cell && !cell.faceUp) {
            // 裏向きカードクリック (アクション不可時)
            play("buzz");
            invalidActionSoundPlayed = true;
          }
        } // isInRect
      } // inner for (c)
      if (clickedOnElement) break; // outer loop break
    } // outer for (r)
  } // End Grid Click Check

  // --- 3. 手札クリック処理 (discardAndDraw / hand selection) ---
  if (!actionTaken && !clickedOnElement) {
    if (isDiscardModeActive) {
      // --- 捨てモード ---
      for (let index = 0; index < handCardViews.length; index++) {
        const cardView = handCardViews[index];
        if (
          cardView &&
          !cardView.isMoving &&
          cardView.containsPoint(clickPos)
        ) {
          clickedOnElement = true;
          if (gameState.drawPile.length > 0) {
            const logicalIndex = index; // Assuming visual index is logical index
            const action: ExpeditionAction = {
              type: "discardAndDraw",
              payload: { handIndex: logicalIndex },
            };
            const cardToDiscardView = handCardViews[index];

            // Check if the card view exists and is not moving
            if (cardToDiscardView && !cardToDiscardView.isMoving) {
              // Apply game state change
              gameState = CartographersExpedition.applyAction(
                gameState,
                action
              );

              // Create and place new view ONLY if a card was drawn
              const newCard = gameState.hand[logicalIndex];
              if (newCard) {
                const finalPos = calculateHandPos(logicalIndex);
                const startPos = vec(finalPos.x, VIEW_SIZE.y + 30); // Use VIEW_SIZE.y
                const newCardView = new CardView();
                newCardView.pos = startPos;
                newCardView.rank = rankToNumber(newCard.rank);
                newCardView.suit = suitToLowercase(newCard.suit);
                newCardView.isFaceUp = true;
                newCardView.startMoveAnimation(finalPos);
                handCardViews[index] = newCardView; // Replace in main array
              } else {
                handCardViews[index] = null; // Slot becomes empty
              }

              play("flip");
              selectedHandIndex = null; // Deselect hand
              selectedSourceCell = null; // Deselect source
              actionTaken = true;
              isDiscardModeActive = false; // Turn off discard mode

              // --- Update Tutorial Step ---
              tutorialStep = handleTutorialInputLogic(
                tutorialStep,
                "discardActionTaken",
                {
                  selectedSourceCell,
                  selectedHandIndex,
                  isDiscardModeActive,
                  shownSteps: shownTutorialStepsThisSession,
                }
              );
            }
          } else {
            // Draw pile is empty
            play("buzz");
            invalidActionSoundPlayed = true;
          }
          break; // Exit loop once a card is clicked
        }
      }
    } else {
      // --- 通常モード (Hand selection / deselection) ---
      for (let index = 0; index < handCardViews.length; index++) {
        const cardView = handCardViews[index];
        if (
          cardView &&
          !cardView.isMoving &&
          cardView.containsPoint(clickPos)
        ) {
          clickedOnElement = true;
          play("tap");
          const previouslySelectedHandIndex = selectedHandIndex;
          selectedHandIndex = selectedHandIndex === index ? null : index; // Toggle selection

          // --- Update Tutorial Step ---
          tutorialStep = handleTutorialInputLogic(tutorialStep, "handClicked", {
            selectedSourceCell,
            selectedHandIndex, // Use the new value of selectedHandIndex
            isDiscardModeActive,
            shownSteps: shownTutorialStepsThisSession,
          });
          // If hand and source are now selected, check validity for potential step 4 move
          if (selectedHandIndex !== null && selectedSourceCell !== null) {
            const handCardForCheck = gameState.hand[selectedHandIndex];
            const sourceCardForCheck =
              gameState.grid[selectedSourceCell.r]?.[selectedSourceCell.c];
            let isValidComboNow = false;
            if (handCardForCheck && sourceCardForCheck) {
              const isObstacle = OBSTACLE_RANKS.includes(
                sourceCardForCheck.rank
              );
              if (isObstacle) {
                if (handCardForCheck.rank === sourceCardForCheck.rank) {
                  isValidComboNow = true;
                }
              } else {
                if (
                  handCardForCheck.suit === sourceCardForCheck.suit ||
                  handCardForCheck.rank === sourceCardForCheck.rank
                )
                  isValidComboNow = true;
              }
            }
            if (isValidComboNow) {
              tutorialStep = 4; // Move to step 4 if the combo is valid
            } else {
              // If invalid combo, handleTutorialInputLogic should keep it at 1, 2, or 3.
              // We might need to explicitly set it back if handleTutorial doesn't cover this exact edge case.
              // Let's rely on handleTutorialInputLogic for now. If issues arise, revisit.
              play("buzz"); // Play buzz if the selected hand doesn't match the selected source
              invalidActionSoundPlayed = true;
            }
          }

          break; // Exit hand loop
        }
      }
    }
  } // End Hand Click Check

  // --- 4. 背景クリック処理 ---
  if (!actionTaken && !clickedOnElement) {
    const wasDiscardModeActive = isDiscardModeActive; // Store state before change
    if (isDiscardModeActive) {
      isDiscardModeActive = false; // Clicking background disables discard mode
    }
    // Only reset selections if discard wasn't just deactivated by this click
    // AND if discard mode wasn't active (regular background click deselects all)
    if (!wasDiscardModeActive) {
      selectedHandIndex = null;
      selectedSourceCell = null;
    }

    // --- Update Tutorial Step ---
    // Pass the state *before* this click happened for accurate logic
    tutorialStep = handleTutorialInputLogic(tutorialStep, "backgroundClicked", {
      selectedSourceCell: wasDiscardModeActive ? selectedSourceCell : null,
      selectedHandIndex: wasDiscardModeActive ? selectedHandIndex : null,
      isDiscardModeActive: wasDiscardModeActive,
      shownSteps: shownTutorialStepsThisSession,
    });
  }

  // --- Handle Invalid Action Tutorial Step ---
  // If a buzz sound was played during this input handling phase, call the logic
  if (invalidActionSoundPlayed) {
    tutorialStep = handleTutorialInputLogic(tutorialStep, "invalidAction", {
      selectedSourceCell,
      selectedHandIndex,
      isDiscardModeActive,
      shownSteps: shownTutorialStepsThisSession,
    });
  }

  return actionTaken;
}

// --- NEW: Function to draw the UI during the Ongoing state ---
function drawOngoingGame() {
  if (!gameState) return; // Should not happen, but safe check

  // --- Drawing Logic moved from update() ---
  if (gridCardViews.length > 0) {
    // --- ADDED: Count face-up grid cards ---
    let revealedGridCardsCount = 0;
    for (let r = 0; r < gameState.grid.length; r++) {
      for (let c = 0; c < gameState.grid[r].length; c++) {
        if (gameState.grid[r]?.[c]?.faceUp) {
          revealedGridCardsCount++;
        }
      }
    }
    const allowHighlighting = revealedGridCardsCount < 3;
    // --- END ADDITION ---

    // 盤面を描画 (CardView を使用)
    for (let r = 0; r < gridCardViews.length; r++) {
      for (let c = 0; c < gridCardViews[r].length; c++) {
        const cardView = gridCardViews[r]?.[c];
        if (cardView) {
          // isSelected 状態を毎フレーム更新
          cardView.isSelected =
            selectedSourceCell !== null &&
            selectedSourceCell.r === r &&
            selectedSourceCell.c === c;

          // isHighlighted 状態をリセットし、再評価
          cardView.isHighlighted = false;
          const cell = gameState.grid[r]?.[c];

          // --- Logic 1: Highlight possible TARGETS (when source & hand selected) ---
          if (
            allowHighlighting &&
            cell &&
            selectedHandIndex !== null &&
            selectedSourceCell !== null &&
            !cell.faceUp && // Target must be face-down
            !cardView.isFlipping &&
            !cardView.isMoving
          ) {
            const dx = Math.abs(selectedSourceCell.r - r);
            const dy = Math.abs(selectedSourceCell.c - c);
            if (dx + dy === 1) {
              // Target must be adjacent to source
              const handCard = gameState.hand[selectedHandIndex];
              const sourceCard =
                gameState.grid[selectedSourceCell.r]?.[selectedSourceCell.c];
              // Check if hand card matches the selected source card
              if (
                sourceCard &&
                handCard // Ensure both cards exist
              ) {
                // Check highlight validity based on source rank
                const isObstacleSource = OBSTACLE_RANKS.includes(
                  sourceCard.rank
                );
                let shouldHighlightInner = false;
                if (isObstacleSource) {
                  if (handCard.rank === sourceCard.rank) {
                    shouldHighlightInner = true;
                  }
                } else {
                  if (
                    handCard.suit === sourceCard.suit ||
                    handCard.rank === sourceCard.rank
                  ) {
                    shouldHighlightInner = true;
                  }
                }
                if (shouldHighlightInner) {
                  cardView.isHighlighted = true;
                }
              }
            }
          }
          // --- Logic 2: Highlight possible SOURCES (when hand selected, no source selected) ---
          else if (
            allowHighlighting &&
            cell &&
            selectedHandIndex !== null && // Hand IS selected
            selectedSourceCell === null && // Source is NOT selected
            cell.faceUp && // Source must be face-up
            !cardView.isFlipping &&
            !cardView.isMoving
          ) {
            const selectedHandCard = gameState.hand[selectedHandIndex];
            if (selectedHandCard) {
              // Ensure hand card exists
              // --- MODIFIED: Check highlight based on source rank ---
              const isObstacleSource = OBSTACLE_RANKS.includes(cell.rank);
              let shouldHighlightInner = false;
              if (isObstacleSource) {
                // Obstacle Source: Highlight only if hand RANK matches source RANK
                if (selectedHandCard.rank === cell.rank) {
                  shouldHighlightInner = true;
                }
              } else {
                // Normal Source: Highlight if hand SUIT or RANK matches source
                if (
                  selectedHandCard.suit === cell.suit ||
                  selectedHandCard.rank === cell.rank
                ) {
                  shouldHighlightInner = true;
                }
              }
              if (shouldHighlightInner) {
                cardView.isHighlighted = true;
              }
              // --- END MODIFICATION ---
            }
          }

          cardView.draw(); // Draws and updates animation
        }
      }
    }

    // 情報表示 (Draw)
    color("black");
    text(`Draw: ${gameState.drawPile.length}`, DRAW_TEXT_X, DRAW_TEXT_Y, {
      isSmallText: true,
    });

    // --- Draw Hand Cards (Simplified) ---
    handCardViews.forEach((cardView, index) => {
      if (cardView) {
        const targetPos = calculateHandPos(index);
        // Snap to position only if not currently moving in
        if (!cardView.isMoving) {
          cardView.pos.set(targetPos);
        }
        // Update selection state
        cardView.isSelected = selectedHandIndex === index;

        // Update highlight state
        cardView.isHighlighted = false;
        if (!cardView.isMoving && allowHighlighting) {
          // Can only highlight non-moving cards
          if (isDiscardModeActive) {
            cardView.isHighlighted = true;
          } else if (
            selectedHandIndex === null &&
            selectedSourceCell !== null
          ) {
            const sourceCard =
              gameState?.grid[selectedSourceCell.r]?.[selectedSourceCell.c];
            if (sourceCard) {
              // Ensure source card exists
              // --- MODIFIED: Check highlight based on source rank ---
              const isObstacleSourceRank = OBSTACLE_RANKS.includes(
                sourceCard.rank
              );
              let shouldHighlightInner = false;
              if (isObstacleSourceRank) {
                // Obstacle Source: Highlight hand card only if RANK matches
                if (rankToNumber(sourceCard.rank) === cardView.rank) {
                  shouldHighlightInner = true;
                }
              } else {
                // Normal Source: Highlight hand card if SUIT or RANK matches
                if (
                  suitToLowercase(sourceCard.suit) === cardView.suit ||
                  rankToNumber(sourceCard.rank) === cardView.rank
                ) {
                  shouldHighlightInner = true;
                }
              }
              if (shouldHighlightInner) {
                cardView.isHighlighted = true;
              }
              // --- END MODIFICATION ---
            }
          }
        }
        cardView.draw();
      } else {
        // Optionally draw an empty slot placeholder
      }
    });

    // ゴミ箱アイコン描画
    color(isDiscardModeActive ? "cyan" : "black");
    char("g", DISCARD_ICON_X, DISCARD_ICON_Y);

    // --- ADDED: Display Found Aces Count ---
    let foundAcesCount = 0;
    const gridRows = gameState.grid.length;
    const gridCols = gameState.grid[0]?.length ?? 0;
    const cornerPositions = [
      { r: 0, c: 0 },
      { r: 0, c: gridCols - 1 },
      { r: gridRows - 1, c: 0 },
      { r: gridRows - 1, c: gridCols - 1 },
    ];
    for (const pos of cornerPositions) {
      const card = gameState.grid[pos.r]?.[pos.c];
      if (card && card.faceUp && card.rank === "A") {
        foundAcesCount++;
      }
    }
    const acesText = `ACES: ${foundAcesCount} / 4`;
    const acesTextWidth = acesText.length * 4; // Estimate width for small text
    text(acesText, VIEW_SIZE.x - 2 - acesTextWidth, 5, {
      isSmallText: true,
      color: "black",
      backgroundColor: "white",
    });
    // --- END ADDITION ---
  }

  // --- Draw Tutorial Bubble (Only during Ongoing) ---
  if (tutorialBubble) {
    tutorialBubble.draw();
  }
}

function update() {
  color("black");
  char("k", 40, 50); // Draw background

  // --- Initialize session only ONCE on script load ---
  if (!ticks) {
    initializeSession();
    if (isRecording) {
      startRecording();
    }
  }
  if (isRecording && keyboard.code["KeyR"].isJustPressed) {
    stopRecording();
  }

  // --- Handle Initialization based on gameLifeCycle ---
  if (gameLifeCycle === "NeedsInit") {
    gameLifeCycle = "Initializing"; // Mark as initializing
    if (!startNewGame()) {
      // Handle critical error if startNewGame failed
      color("red");
      text("Error initializing game!", 5, 50);
      gameLifeCycle = "NeedsInit"; // Reset to retry next frame
      return; // Stop update if game failed to start
    }
    // startNewGame succeeded, gameState should be set
    if (!gameState) {
      // Safeguard check
      console.error(
        "CRITICAL: gameState is null after successful startNewGame call!"
      );
      gameLifeCycle = "NeedsInit"; // Reset to retry
      return;
    }
    gameLifeCycle = "Ongoing"; // Initialization complete, move to Ongoing
    // Update tutorial display ONCE after successful init
    updateTutorialDisplay(
      tutorialStep,
      previousTutorialStep,
      tutorialBubble,
      shownTutorialStepsThisSession
    );
  }

  // --- Type Guard for gameState --- (Ensures gameState is not null here)
  if (!gameState) {
    console.error("CRITICAL: gameState became null unexpectedly!");
    gameLifeCycle = "NeedsInit"; // Reset to initialize
    return;
  }

  // --- Update Tutorial Display (if needed, e.g., step changes) ---
  updateTutorialDisplay(
    tutorialStep,
    previousTutorialStep,
    tutorialBubble,
    shownTutorialStepsThisSession
  );

  // --- Handle Ongoing Game State ---
  if (gameLifeCycle === "Ongoing") {
    // --- Input Handling for Ongoing Game ---
    const actionTaken = input.isJustPressed ? handleOngoingInput() : false; // Call the new function

    // Check for game end AFTER action potentially taken
    if (actionTaken) {
      const endCheckResult = CartographersExpedition.checkGameEnd(gameState);
      if (endCheckResult.status !== "ONGOING") {
        gameLifeCycle = "GameOver"; // Transition to GameOver
        gameStatus = endCheckResult.status; // Update gameStatus for display
        gameOverReason = endCheckResult.reason ?? null;
        // Update tutorial state for game over
        tutorialStep = handleTutorialInputLogic(tutorialStep, "gameOver", {
          selectedSourceCell,
          selectedHandIndex,
          isDiscardModeActive,
          shownSteps: shownTutorialStepsThisSession,
        });
        if (tutorialBubble) tutorialBubble.hide(); // Hide bubble on game end
      }
    }
    // --- End Game End Check ---

    // --- Drawing for Ongoing Game ---
    // Drawing logic moved to drawOngoingGame()
    drawOngoingGame(); // Call the new drawing function

    // --- Handle Game Over State ---
  } else if (gameLifeCycle === "GameOver") {
    // --- Input Handling for Game Over (Retry) ---
    if (input.isJustPressed) {
      console.log("Retry triggered! Setting lifecycle to NeedsInit.");
      gameLifeCycle = "NeedsInit"; // Set to NeedsInit to trigger re-initialization
    }
    // --- End Input Handling for Game Over ---

    // --- Drawing for Game Over ---
    // --- ADDED: Draw the final game state first ---
    drawOngoingGame();
    // --- END ADDITION ---

    const resultText = gameStatus === "WIN" ? "ALL REVEALED" : "GAME OVER";
    const textWidth = resultText.length * 4;
    const viewCenterX = VIEW_SIZE.x / 2;
    text(resultText, viewCenterX - textWidth / 2, 60, {
      isSmallText: true,
      color: "black",
      backgroundColor: "white",
    });

    if (gameStatus === "LOSE" && gameOverReason) {
      const reasonWidth = gameOverReason.length * 4;
      text(gameOverReason, viewCenterX - reasonWidth / 2, 75, {
        isSmallText: true,
        color: "black",
        backgroundColor: "white",
      });
    }
    text(
      "Click to Retry",
      viewCenterX - ("Click to Retry".length * 4) / 2,
      90,
      {
        isSmallText: true,
        color: "black",
        backgroundColor: "white",
      }
    );
    // --- End Drawing for Game Over ---
  }
}

const imageFiles = ["./media/background.png"];

init({
  update,
  characters: characters.concat(imageFiles),
  options: {
    isSoundEnabled: false,
    isShowingScore: false,
    viewSize: VIEW_SIZE, // Use the constant here
    colorPalette: [
      [200, 172, 136],
      [231, 208, 172],
      [119, 98, 80],
      [122, 89, 62],
      [48, 39, 41],
      [42, 37, 41],
      [89, 66, 67],
      [42, 39, 43],
      [42, 39, 45],
      [231, 104, 86],
      [251, 208, 86],
      [131, 208, 172],
    ],
    audioTempo: 120,
  },
  audioFiles: {
    bgm: "./media/bgm.mp3",
    flip: "./media/flip.mp3",
    tap: "./media/tap.mp3",
    coin: "./media/coin.mp3",
    buzz: "./media/buzz.mp3",
  },
});

// ======== TEST HOOKS START ========
// These functions are intended for testing purposes only.
// Do not use them in production code.

export const __TEST_ONLY_setGameState = (newState: ExpeditionState | null) => {
  gameState = newState;
};
export const getGameState = (): ExpeditionState | null => gameState;

export const __TEST_ONLY_setSelectedSourceCell = (
  newSelection: { r: number; c: number } | null
) => {
  selectedSourceCell = newSelection;
};
export const getSelectedSourceCell = (): { r: number; c: number } | null =>
  selectedSourceCell;

export const __TEST_ONLY_setSelectedHandIndex = (newIndex: number | null) => {
  selectedHandIndex = newIndex;
};
export const getSelectedHandIndex = (): number | null => selectedHandIndex;

export const __TEST_ONLY_setTutorialStep = (newStep: TutorialStep) => {
  tutorialStep = newStep;
};
export const getTutorialStep = (): TutorialStep => tutorialStep;

export const __TEST_ONLY_setIsDiscardModeActive = (newMode: boolean) => {
  isDiscardModeActive = newMode;
};
export const getIsDiscardModeActive = (): boolean => isDiscardModeActive; // Getter for isDiscardModeActive

export const __TEST_ONLY_setGridCardViews = (
  newViews: (CardView | null)[][]
) => {
  gridCardViews = newViews;
};
export const getGridCardViews = (): (CardView | null)[][] => gridCardViews;

export const __TEST_ONLY_setHandCardViews = (newViews: (CardView | null)[]) => {
  handCardViews = newViews;
};
export const getHandCardViews = (): (CardView | null)[] => handCardViews;

export const __TEST_ONLY_setTutorialBubble = (
  newBubble: SpeechBubbleView | null
) => {
  tutorialBubble = newBubble;
};
export const getTutorialBubble = (): SpeechBubbleView | null => tutorialBubble;

export const __TEST_ONLY_setShownTutorialStepsThisSession = (
  newSet: Set<TutorialStep>
) => {
  shownTutorialStepsThisSession = newSet;
};
export const getShownTutorialStepsThisSession = (): Set<TutorialStep> =>
  shownTutorialStepsThisSession;

export const __TEST_ONLY_setGameStatus = (
  newStatus: "ONGOING" | "WIN" | "LOSE"
) => {
  gameStatus = newStatus;
};
export const getGameStatus = (): "ONGOING" | "WIN" | "LOSE" => gameStatus;

export const __TEST_ONLY_setGameOverReason = (newReason: string | null) => {
  gameOverReason = newReason;
};
export const getGameOverReason = (): string | null => gameOverReason;

export const __TEST_ONLY_setPreviousTutorialStep = (
  newStep: TutorialStep | null
) => {
  previousTutorialStep = newStep;
};
export const getPreviousTutorialStep = (): TutorialStep | null =>
  previousTutorialStep;

// ======== TEST HOOKS END ========
