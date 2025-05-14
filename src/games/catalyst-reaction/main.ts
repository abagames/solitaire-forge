import "crisp-game-lib";
import { catalystReactionGameDefinition } from "./definition.ts"; // Import the game definition
import type {
  CatalystReactionState,
  PlayCatalystAction,
} from "./definition.ts"; // Import types
import type { Card } from "../../types.ts"; // Import Card from types.ts
import { characters, CardView, SpeechBubbleView } from "../../utils/view.ts"; // Import from shared view.ts

const enableRecording = false;

// Placeholder characters array is no longer needed

let gameState: CatalystReactionState | null = null;
let selectedHandCardId: string | null = null; // Stores 'rankString+suitString' e.g. '1s' or '10d'
let selectedPlacementPosition: number | null = null; // 0 to N (N = field.length)
let gameStatus: "ongoing" | "win" | "lose" = "ongoing";
let gameOverMessage: string = "";

// --- Drawing constants ---
const CARD_WIDTH = 9;
const CARD_HEIGHT = 16;
const FIELD_START_X = 5;
const FIELD_START_Y = 10; // Adjusted from 0 to 10 (moved down by 10)
const HAND_START_X = 15;
const HAND_START_Y = 40; // Adjusted from 30 to 40 (moved down by 10)
const CARD_SPACING = 4; // Increased from 2 to 4
const PLACEMENT_MARKER_RADIUS = 1; // Changed from 2 to 1 for smaller markers

// Store CardView instances for managing individual card states (like selection, animation)
let fieldCardViews: CardView[] = [];
let handCardViews: CardView[] = [];
// Store cards that are animating off-screen (removed cards)
let disappearingCardViews: CardView[] = [];

// --- Tutorial State Variables ---
type TutorialStep = 1 | 2 | 3 | 4 | "OFF"; // Define the steps
let tutorialStep: TutorialStep = 1; // Current tutorial step, start at 1
let tutorialBubble: SpeechBubbleView | null = null; // For displaying messages
let shownTutorialStepsThisSession: Set<TutorialStep> = new Set(); // Track shown steps
let previousTutorialStep: TutorialStep | "OFF" | null = null; // To detect step changes

// TODO: Add other state variables like gameStatus, tutorial variables if needed

// --- Core Tutorial Functions ---

function initializeTutorialSystem(): void {
  if (!tutorialBubble) {
    // Create the bubble off-screen initially, or at a default non-intrusive position.
    // Dimensions can be adjusted.
    tutorialBubble = new SpeechBubbleView(5, 5, 70, 20, "", {
      align: "center",
      direction: "down",
    });
    tutorialBubble.hide(); // Start hidden
  }
  tutorialStep = 1;
  shownTutorialStepsThisSession.clear();
  previousTutorialStep = null; // Force first update of bubble display
}

function handleTutorialLogic(
  actionType:
    | "gameStart"
    | "handCardSelected"
    | "placementSelected"
    | "reactionOccurred"
    | "gameOver"
): void {
  if (tutorialStep === "OFF" && actionType !== "gameStart") {
    return; // Tutorial is off and not being restarted
  }

  let newStepCandidate: TutorialStep | "OFF" | null = null;

  switch (actionType) {
    case "gameStart":
      // This case is mostly handled by initializeTutorialSystem directly being called.
      // But if called, ensure it resets to step 1.
      newStepCandidate = 1;
      shownTutorialStepsThisSession.clear(); // Ensure steps are cleared if restarting mid-tutorial
      break;

    case "handCardSelected":
      if (tutorialStep === 1) {
        newStepCandidate = 2;
      } else if (tutorialStep === 3 && shownTutorialStepsThisSession.has(3)) {
        newStepCandidate = 4;
      } else if (tutorialStep === 4 && shownTutorialStepsThisSession.has(4)) {
        newStepCandidate = "OFF";
      }
      break;

    case "placementSelected": // This implies a hand card was already selected
      if (tutorialStep === 2 && !shownTutorialStepsThisSession.has(3)) {
        newStepCandidate = 3; // Transition to step 3 as soon as placement is chosen
      } else if (tutorialStep === 3 && shownTutorialStepsThisSession.has(3)) {
        newStepCandidate = 4;
      } else if (tutorialStep === 4 && shownTutorialStepsThisSession.has(4)) {
        newStepCandidate = "OFF";
      }
      break;

    case "reactionOccurred":
      // This case might still be useful if a reaction happens later or without direct placement,
      // but primary 2->3 transition is now handled by "placementSelected".
      // If already on step 3 (or higher) due to placement, this won't revert.
      if (tutorialStep === 2 && !shownTutorialStepsThisSession.has(3)) {
        // This specific condition to move from 2 to 3 is now less likely to be the first trigger
        // but kept for robustness if a reaction can occur changing step 2 to 3 via other means.
        newStepCandidate = 3;
      }
      // If a reaction occurs and we are on step 3, we might want to reinforce, or move to step 4 if appropriate.
      // For now, let's assume step 3 message is sufficient until next explicit player action to move to step 4.
      break;

    case "gameOver":
      newStepCandidate = "OFF";
      break;
  }

  if (newStepCandidate !== null && newStepCandidate !== tutorialStep) {
    tutorialStep = newStepCandidate;
  }
}

function updateTutorialBubbleDisplay(): void {
  if (!tutorialBubble) return;

  // Only update if the step actually changed or if it's the very first display.
  if (tutorialStep === previousTutorialStep && previousTutorialStep !== null)
    return;

  tutorialBubble.hide(); // Default to hidden, show only if there's a message for the current step
  let message = "";
  let bubbleX = 50; // Default X
  let bubbleY = 30; // Default Y
  let tailAlign: "left" | "center" | "right" = "center";
  let tailDirection: "up" | "down" | "left" | "right" | "none" = "down";

  if (tutorialStep === "OFF") {
    previousTutorialStep = "OFF";
    return;
  }

  switch (tutorialStep) {
    case 1:
      if (!shownTutorialStepsThisSession.has(1)) {
        message = "Click a card in your hand to select it as a catalyst.";
        bubbleX = HAND_START_X + tutorialBubble.size.x / 2 + 1;
        bubbleY = HAND_START_Y - tutorialBubble.size.y - 2;
        tailDirection = "down";
        tailAlign = "left";
      }
      break;
    case 2:
      if (!shownTutorialStepsThisSession.has(2) && selectedHandCardId) {
        // Only show if hand card is selected
        message = "Good! Now click a yellow marker on the field to play it.";
        bubbleX = FIELD_START_X + CARD_WIDTH * 6;
        bubbleY = FIELD_START_Y + tutorialBubble.size.y / 2 + 7;
        tailDirection = "up";
        tailAlign = "left";
      }
      break;
    case 3:
      if (!shownTutorialStepsThisSession.has(3)) {
        message = "Nice! Same rank or suit 3 times removes cards.";
        bubbleX = 70; // Center screen
        bubbleY = 30;
        tailDirection = "none";
      }
      break;
    case 4:
      if (!shownTutorialStepsThisSession.has(4)) {
        message = "Win by clearing the field. Lose if out of moves/cards.";
        bubbleX = 80; // Center screen
        bubbleY = 30; // Top of screen
        tailDirection = "none";
      }
      break;
  }

  if (message) {
    tutorialBubble.setText(message);
    tutorialBubble.pos.set(bubbleX, bubbleY);
    tutorialBubble.setTail(tailAlign, tailDirection);
    tutorialBubble.show();
    shownTutorialStepsThisSession.add(tutorialStep);
  } else if (shownTutorialStepsThisSession.has(tutorialStep)) {
    tutorialBubble.hide();
  }

  previousTutorialStep = tutorialStep;
}

// Refactored core logic for testability
export function __TEST_ONLY_handleInputAndGameLogic(
  checkGameEndOverride?: any
) {
  if (!gameState || gameStatus !== "ongoing") {
    return; // Should be handled by the main update loop's game over logic
  }

  let actionTakenThisFrame = false;

  if (input.isJustPressed) {
    let clickedOnUIElement = false;

    // 1. Check hand card clicks
    for (const cv of handCardViews) {
      if (cv.containsPoint(input.pos)) {
        clickedOnUIElement = true;
        const cardIdentifier = cv.rank.toString() + cv.suit.charAt(0);
        const wasSelected = selectedHandCardId === cardIdentifier;
        if (wasSelected) {
          selectedHandCardId = null;
        } else {
          selectedHandCardId = cardIdentifier;
        }
        selectedPlacementPosition = null;
        updateSelectionVisuals();
        handleTutorialLogic("handCardSelected"); // Call tutorial logic
        play("tap"); // Play tap sound
        break;
      }
    }

    // 2. Check placement marker clicks
    if (!clickedOnUIElement && selectedHandCardId && gameState) {
      const fieldCardCenterY = FIELD_START_Y + CARD_HEIGHT / 2;
      for (let i = 0; i <= gameState.field.length; i++) {
        let markerCenterX;
        if (i === 0) {
          markerCenterX =
            FIELD_START_X -
            Math.round(CARD_SPACING / 2.0) -
            PLACEMENT_MARKER_RADIUS;
        } else {
          markerCenterX =
            FIELD_START_X + i * (CARD_WIDTH + CARD_SPACING) - CARD_SPACING / 2;
        }
        if (
          input.pos.distanceTo(vec(markerCenterX, fieldCardCenterY)) <
          PLACEMENT_MARKER_RADIUS + 3
        ) {
          clickedOnUIElement = true;
          selectedPlacementPosition = i;
          handleTutorialLogic("placementSelected"); // Call tutorial logic
          play("tap"); // Play tap sound
          break;
        }
      }
    }

    // 3. If both hand card and placement are selected, attempt action
    if (selectedHandCardId && selectedPlacementPosition !== null && gameState) {
      const targetCardGameState = gameState.hand.find((c) => {
        const gsCardIdentifier =
          rankToNumber(c.rank).toString() + c.suit.toLowerCase().charAt(0);
        return gsCardIdentifier === selectedHandCardId;
      });

      if (targetCardGameState) {
        const playedCardId = targetCardGameState.id;
        const handBeforeAction = [...gameState.hand]; // Capture hand state before action
        const playedCardIndex = handBeforeAction.findIndex(
          (card) => card.id === playedCardId
        );
        play("flip"); // Play flip sound for card placement

        // Capture field state *before* the action for reaction detection later
        const prevFieldLength = gameState.field.length;
        const prevField = [...gameState.field];

        const action: PlayCatalystAction = {
          type: "PLAY_CATALYST",
          payload: {
            catalystCardId: targetCardGameState.id, // Use playedCardId if targetCardGameState might become stale
            position: selectedPlacementPosition,
          },
        };
        // gameState (the module-level variable) is updated by applyAction
        gameState = catalystReactionGameDefinition.applyAction(
          gameState,
          action
        );

        // After action, try to reorder the hand if a new card was drawn and it's not in the original position.
        if (playedCardIndex !== -1 && gameState.hand.length > 0) {
          const oldHandIdsPresentBeforeAction = new Set(
            handBeforeAction.map((c) => c.id)
          );
          oldHandIdsPresentBeforeAction.delete(playedCardId); // These are IDs of cards that were in hand and weren't the one played.

          let newlyDrawnCard: Card | undefined = undefined;
          let indexOfNewlyDrawnCardInCurrentHand = -1;

          for (let i = 0; i < gameState.hand.length; i++) {
            const cardInCurrentHand = gameState.hand[i];
            if (
              !oldHandIdsPresentBeforeAction.has(cardInCurrentHand.id) &&
              cardInCurrentHand.id !== playedCardId
            ) {
              newlyDrawnCard = cardInCurrentHand;
              indexOfNewlyDrawnCardInCurrentHand = i;
              break;
            }
          }

          if (
            newlyDrawnCard &&
            indexOfNewlyDrawnCardInCurrentHand !== -1 &&
            indexOfNewlyDrawnCardInCurrentHand !== playedCardIndex
          ) {
            if (playedCardIndex < gameState.hand.length) {
              const cardToMove = gameState.hand.splice(
                indexOfNewlyDrawnCardInCurrentHand,
                1
              )[0];
              gameState.hand.splice(playedCardIndex, 0, cardToMove);
            } else if (
              playedCardIndex === gameState.hand.length &&
              indexOfNewlyDrawnCardInCurrentHand < playedCardIndex
            ) {
              const cardToMove = gameState.hand.splice(
                indexOfNewlyDrawnCardInCurrentHand,
                1
              )[0];
              gameState.hand.push(cardToMove);
            }
          }
        }

        // Now, check for field reactions using the state from *before* the action (prevFieldLength, prevField)
        // and the gameState from *after* the action.
        if (gameState && gameState.field.length < prevFieldLength) {
          // Detect which cards were removed by ID
          const removedCards = prevField.filter(
            (prevCard) =>
              gameState &&
              !gameState.field.some((currCard) => currCard.id === prevCard.id)
          );

          // Find the corresponding CardView for each removed card and animate it
          const removedCardViews = fieldCardViews.filter((cv) => {
            const index = fieldCardViews.indexOf(cv);
            if (index < prevField.length) {
              return removedCards.some(
                (rc) =>
                  rankToNumber(rc.rank) === cv.rank &&
                  rc.suit.toLowerCase().charAt(0) === cv.suit.charAt(0)
              );
            }
            return false;
          });

          for (const cv of removedCardViews) {
            const copyView = new CardView();
            copyView.pos = vec(cv.pos.x, cv.pos.y);
            copyView.rank = cv.rank;
            copyView.suit = cv.suit;
            copyView.isFaceUp = true;
            copyView.startDisappearAnimation();
            disappearingCardViews.push(copyView);
          }
          handleTutorialLogic("reactionOccurred");
          play("flip"); // Play flip sound for reaction removal
        }

        actionTakenThisFrame = true;
        selectedHandCardId = null;
        selectedPlacementPosition = null;
        updateCardViews();
      } else {
        console.error(
          "Logic error: selectedHandCardId did not match any card in gameState.hand",
          selectedHandCardId
        );
        selectedHandCardId = null;
      }
    }
  }

  // Check game end conditions regardless of whether an action was taken
  if (gameState) {
    // Use the checkGameEndOverride if provided (for tests), otherwise use the default
    const checkGameEndFn =
      checkGameEndOverride || catalystReactionGameDefinition.checkGameEnd;

    // Use the catalystReactionGameDefinition object to check game end - this will use the mocked version in tests
    const endCheck = checkGameEndFn(gameState);
    if (endCheck.status !== "ONGOING") {
      gameStatus = endCheck.status.toLowerCase() as "win" | "lose";
      if (gameStatus === "win") {
        gameOverMessage = "YOU WIN!";
        play("coin"); // Play coin sound on win
      } else {
        gameOverMessage = `GAME OVER
${endCheck.reason || "No more moves!"}`;
      }
      handleTutorialLogic("gameOver"); // Call tutorial logic for game end
    } else if (
      gameState.hand.length === 0 &&
      gameState.deck.length === 0 &&
      catalystReactionGameDefinition.getAvailableActions(gameState).length === 0
    ) {
      gameStatus = "lose";
      gameOverMessage = "GAME OVER\\nNo more cards or moves!";
      handleTutorialLogic("gameOver"); // Call tutorial logic for game end
    }
  }
}

function update() {
  color("black");
  char("k", 80, 40); // Draw background

  if (!ticks) {
    playBgm(); // Play background music on start
    initializeTutorialSystem(); // Initialize tutorial system
    handleTutorialLogic("gameStart"); // Initial tutorial logic call
    if (enableRecording) {
      startRecording();
    }
  }
  if (enableRecording && keyboard.code["KeyR"].isJustPressed) {
    stopRecording();
  }

  if (!gameState) {
    gameState = catalystReactionGameDefinition.setupGame(String(Date.now()));
    selectedHandCardId = null;
    selectedPlacementPosition = null;
    gameStatus = "ongoing";
    gameOverMessage = "";
    disappearingCardViews = []; // Clear animations from previous game

    updateCardViews();
    console.log("Game Initialized", gameState);
    return; // Initial call to update should just init
  }

  if (gameStatus !== "ongoing") {
    if (input.isJustPressed) {
      gameState = null; // Signal to re-initialize on next frame
      // Tutorial will be re-initialized by the block above
    }
    // Drawing game over message
    if (gameOverMessage) {
      const messageLines = gameOverMessage.split("\n");
      const lineTextHeight = 6; // Assumed vertical space per line of text
      const topPadding = 3;
      const bottomPadding = 3;
      const spaceBetweenMessageAndRestart = 2;

      const mainMessageBlockHeight = messageLines.length * lineTextHeight;
      const restartMessageHeightAllocation = lineTextHeight; // Space allocated for the restart text line

      const boxContentHeight =
        mainMessageBlockHeight +
        spaceBetweenMessageAndRestart +
        restartMessageHeightAllocation;
      const boxHeight = boxContentHeight + topPadding + bottomPadding;

      const boxWidth = 80; // Current width of the message box
      const viewWidth = 160; // Current game view width from init options
      const viewHeight = 60; // Current game view height from init options

      const boxX = (viewWidth - boxWidth) / 2;
      const boxY = (viewHeight - boxHeight) / 2;

      color("black");
      rect(boxX, boxY, boxWidth, boxHeight);
      color("white");

      let currentY = boxY + topPadding;
      messageLines.forEach((line) => {
        text(line, boxX + 2, currentY);
        currentY += lineTextHeight;
      });

      currentY += spaceBetweenMessageAndRestart; // Add a small gap

      text("[CLICK TO RESTART]", boxX + 2, currentY, {
        isSmallText: true,
        color: "light_red",
      });
    }
    // Before returning, ensure tutorial knows it's game over if it hasn't already been set to OFF
    if (tutorialStep !== "OFF") {
      handleTutorialLogic("gameOver");
      updateTutorialBubbleDisplay(); // Update bubble to hide it
    }
    return; // Stop further processing if game is over
  }

  fieldCardViews.forEach((cv) => cv.update());
  handCardViews.forEach((cv) => cv.update());

  // Update and filter out completed disappearing cards
  disappearingCardViews = disappearingCardViews.filter((cv) => {
    cv.update();
    return cv.isMoving; // Keep only cards that are still animating
  });

  __TEST_ONLY_handleInputAndGameLogic(); // Call the refactored logic

  updateTutorialBubbleDisplay(); // Update tutorial display each frame

  // --- Drawing ---
  if (gameState) {
    fieldCardViews.forEach((cv) => cv.draw());
    handCardViews.forEach((cv) => cv.draw());
    disappearingCardViews.forEach((cv) => cv.draw());

    if (selectedHandCardId) {
      const markerOriginalColor = "yellow";
      const markerSize = PLACEMENT_MARKER_RADIUS * 2;
      const markerCenterY = FIELD_START_Y + CARD_HEIGHT / 2;

      for (let i = 0; i <= gameState.field.length; i++) {
        let markerCenterX;
        if (i === 0) {
          markerCenterX =
            FIELD_START_X -
            Math.round(CARD_SPACING / 2.0) -
            PLACEMENT_MARKER_RADIUS;
        } else {
          markerCenterX =
            FIELD_START_X + i * (CARD_WIDTH + CARD_SPACING) - CARD_SPACING / 2;
        }

        const markerRectX = markerCenterX - PLACEMENT_MARKER_RADIUS;
        const markerRectY = markerCenterY - PLACEMENT_MARKER_RADIUS;

        color(markerOriginalColor);
        rect(markerRectX, markerRectY, markerSize, markerSize);
      }
    }

    color("white");
    text(`Deck: ${gameState.deck.length}`, 60, HAND_START_Y + 9, {
      isSmallText: true,
    });

    // Draw Tutorial Bubble if it exists and is visible
    if (tutorialBubble && tutorialBubble.isVisible) {
      tutorialBubble.draw();
    }
  }
}

export function updateCardViews() {
  // Exported for potential use in tests if needed, though direct state set might be better
  if (!gameState) return;

  fieldCardViews = gameState.field.map((card, index) => {
    const cv = new CardView();
    cv.pos = vec(
      FIELD_START_X + CARD_WIDTH / 2 + index * (CARD_WIDTH + CARD_SPACING),
      FIELD_START_Y + CARD_HEIGHT / 2
    );
    cv.rank = rankToNumber(card.rank);
    cv.suit = card.suit.toLowerCase() as "spade" | "heart" | "diamond" | "club";
    cv.isFaceUp = true;
    return cv;
  });

  handCardViews = gameState.hand.map((card, index) => {
    const cv = new CardView();
    cv.pos = vec(
      HAND_START_X + CARD_WIDTH / 2 + index * (CARD_WIDTH + CARD_SPACING),
      HAND_START_Y + CARD_HEIGHT / 2
    );
    cv.rank = rankToNumber(card.rank);
    cv.suit = card.suit.toLowerCase() as "spade" | "heart" | "diamond" | "club";
    cv.isFaceUp = true;
    return cv;
  });
  updateSelectionVisuals();
}

export function updateSelectionVisuals() {
  // Exported for tests
  handCardViews.forEach((cv) => {
    const cardViewIdentifier = cv.rank.toString() + cv.suit.charAt(0);
    cv.isSelected = cardViewIdentifier === selectedHandCardId;
  });
}

export function rankToNumber(rank: Card["rank"]): number {
  // Exported for tests
  if (rank === "A") return 1;
  if (rank === "K") return 13;
  if (rank === "Q") return 12;
  if (rank === "J") return 11;
  const numRank = parseInt(rank);
  if (!isNaN(numRank) && numRank >= 2 && numRank <= 10) return numRank;
  return 0;
}

// Test-only helper functions
export const __TEST_ONLY_setGameState = (
  state: CatalystReactionState | null
) => {
  gameState = state;
};
export const __TEST_ONLY_getGameState = () => gameState;

export const __TEST_ONLY_setSelectedHandCardId = (id: string | null) => {
  selectedHandCardId = id;
};
export const __TEST_ONLY_getSelectedHandCardId = () => selectedHandCardId;

export const __TEST_ONLY_setSelectedPlacementPosition = (
  pos: number | null
) => {
  selectedPlacementPosition = pos;
};
export const __TEST_ONLY_getSelectedPlacementPosition = () =>
  selectedPlacementPosition;

export const __TEST_ONLY_setGameStatus = (
  status: "ongoing" | "win" | "lose"
) => {
  gameStatus = status;
};
export const __TEST_ONLY_getGameStatus = () => gameStatus;

export const __TEST_ONLY_setHandCardViews = (views: CardView[]) => {
  handCardViews = views;
};
export const __TEST_ONLY_setFieldCardViews = (views: CardView[]) => {
  fieldCardViews = views;
};

// --- Tutorial Test Helper Functions ---
export const __TEST_ONLY_setTutorialStep = (step: TutorialStep) => {
  tutorialStep = step;
};
export const __TEST_ONLY_getTutorialStep = () => tutorialStep;

export const __TEST_ONLY_getTutorialBubble = () => tutorialBubble;
// Note: Setting tutorialBubble directly is complex as it's an object instance.
// Tests will likely mock its creation path or spy on its methods.
// For now, a getter is sufficient. If a setter is truly needed, it would be:
// export const __TEST_ONLY_setTutorialBubble = (bubble: SpeechBubbleView | null) => {
//   tutorialBubble = bubble;
// };

export const __TEST_ONLY_setShownTutorialStepsThisSession = (
  steps: Set<TutorialStep>
) => {
  shownTutorialStepsThisSession = steps;
};
export const __TEST_ONLY_getShownTutorialStepsThisSession = () =>
  shownTutorialStepsThisSession;

export const __TEST_ONLY_setPreviousTutorialStep = (
  step: TutorialStep | "OFF" | null
) => {
  previousTutorialStep = step;
};
export const __TEST_ONLY_getPreviousTutorialStep = () => previousTutorialStep;

// Also exporting updateCardViews, updateSelectionVisuals, rankToNumber for direct test use if needed.

const imageFiles = ["background.png"];

init({
  update,
  characters: characters.concat(imageFiles),
  options: {
    viewSize: { x: 160, y: 60 }, // 横幅を150から160に変更
    isShowingScore: false,
    isSoundEnabled: false,
    // theme: "pixel", // Optional: explore themes later
    // isUsingSmallText: true, // Optional: if text needs to be smaller globally
    colorPalette: [
      [45, 27, 22],
      [34, 26, 24],
      [14, 14, 17],
      [67, 101, 123],
      [78, 90, 105],
      [27, 24, 21],
      [240, 171, 71],
      [104, 96, 85],
      [87, 83, 89],
      [94, 99, 97],
      [23, 26, 23],
      [96, 97, 94],
      [152, 160, 158],
      [104, 108, 105],
      [204, 108, 105],
      [252, 240, 158],
      [67, 201, 223],
      [244, 246, 245],
    ],
    audioTempo: 120,
  },
  audioFiles: {
    bgm: "bgm.mp3",
    tap: "tap.mp3",
    flip: "flip.mp3",
    coin: "coin.mp3",
  },
});
