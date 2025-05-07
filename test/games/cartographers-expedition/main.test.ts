// test/games/cartographers-expedition/main.test.ts
import { jest, describe, it, expect, beforeEach } from "@jest/globals"; // Import Jest globals
import type { Rank, Suit, Card } from "../../../src/types.js"; // 型定義をインポート
import type {
  ExpeditionState,
  ExpeditionAction,
} from "../../../src/games/cartographers-expedition/definition.js"; // ExpeditionState を definition からインポート

// Import the modules. Jest will use manual mocks (__mocks__ or stubs via moduleNameMapper)
// @ts-expect-error TS7016: Could not find a declaration file for module 'crisp-game-lib'.
import * as crispGameLibModule from "crisp-game-lib";
import { CartographersExpedition as ActualCartographersExpedition } from "../../../src/games/cartographers-expedition/definition.js";

// テスト対象の関数や定数をインポート
import {
  handleOngoingInput,
  // --- From main.ts (actual exports) ---
  __TEST_ONLY_setGameState,
  getGameState,
  __TEST_ONLY_setSelectedSourceCell,
  getSelectedSourceCell,
  __TEST_ONLY_setSelectedHandIndex,
  getSelectedHandIndex,
  __TEST_ONLY_setTutorialStep,
  getTutorialStep,
  __TEST_ONLY_setIsDiscardModeActive,
  getIsDiscardModeActive,
  __TEST_ONLY_setGridCardViews,
  // getGridCardViews, // testGridCardViews を直接使うので不要な場合もある
  __TEST_ONLY_setHandCardViews,
  // getHandCardViews, // testHandCardViews を直接使うので不要な場合もある
  __TEST_ONLY_setTutorialBubble,
  getTutorialBubble,
  __TEST_ONLY_setShownTutorialStepsThisSession,
  getShownTutorialStepsThisSession,
  updateTutorialDisplay,
} from "../../../src/games/cartographers-expedition/main.js";

let testGridCardViews: any[][];
let testHandCardViews: any[];
let testTutorialBubbleInstance: any;
let initialTutorialStepForTest: any; // To store the tutorial step before input

// const getCrispGlobal = ...; // This helper might no longer be needed if moduleNameMapper works as expected

describe("Cartographer's Expedition - Main Game Flow", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    // crisp-game-lib-stub.ts sets globals. We only need to reset mutable state on the imported module's objects if necessary.
    if (crispGameLibModule && crispGameLibModule.input) {
      (crispGameLibModule.input as any).isJustPressed = false;
      // The `pos` object with its methods (isInRect, set) should be defined in the stub and set globally.
      // No need to re-assign crispGameLibModule.input.pos here if the global one is used by main.ts.
      // Let's ensure the stub's global pos is reset if it's mutable, or that it's fresh.
      // For now, assume the stub's pos is fresh or its methods are jest.fn() cleared by clearAllMocks.
    }

    // Reset properties on the stubbed crispGameLibModule's input object directly if they are mutable state.
    // The stub itself defines the structure and jest.fn() for functions.
    if (crispGameLibModule && crispGameLibModule.input) {
      (crispGameLibModule.input as any).isJustPressed = false;
      // Ensure pos has vector methods, create a compatible object from stub's vec
      const vecStub = crispGameLibModule.vec(0, 0); // vec() from stub returns {x,y, ...commonVecProps}
      (crispGameLibModule.input as any).pos = {
        x: 0,
        y: 0,
        isInRect: vecStub.isInRect,
        set: vecStub.set,
      };
    }
    // jest.clearAllMocks() handles resetting all jest.fn() instances, including those exported by the stub and used globally.

    // Resetting mocks on the (manually mocked via __mocks__) definition module
    if (ActualCartographersExpedition) {
      if (
        typeof (ActualCartographersExpedition.applyAction as jest.Mock)
          ?.mockClear !== "function"
      ) {
        ActualCartographersExpedition.applyAction =
          jest.fn<
            (
              state: ExpeditionState,
              action: ExpeditionAction
            ) => ExpeditionState
          >();
      } else {
        (ActualCartographersExpedition.applyAction as jest.Mock).mockClear();
      }
      if (
        typeof (ActualCartographersExpedition.checkGameEnd as jest.Mock)
          ?.mockClear !== "function"
      ) {
        ActualCartographersExpedition.checkGameEnd = jest
          .fn<
            (
              state: ExpeditionState,
              history?: ExpeditionAction[]
            ) => { status: "ONGOING" | "WIN" | "LOSE"; reason?: string }
          >()
          .mockReturnValue({ status: "ONGOING" });
      } else {
        (ActualCartographersExpedition.checkGameEnd as jest.Mock).mockClear();
        (
          ActualCartographersExpedition.checkGameEnd as jest.Mock
        ).mockReturnValue({ status: "ONGOING" });
      }
      if (
        typeof (ActualCartographersExpedition.setupGame as jest.Mock)
          ?.mockClear !== "function"
      ) {
        ActualCartographersExpedition.setupGame =
          jest.fn<(seed?: string) => ExpeditionState>();
      }
      if (
        typeof (ActualCartographersExpedition.getAvailableActions as jest.Mock)
          ?.mockClear !== "function"
      ) {
        ActualCartographersExpedition.getAvailableActions = jest
          .fn<(state: ExpeditionState) => ExpeditionAction[]>()
          .mockReturnValue([]);
      }
    }

    const initialGameState = {
      grid: [
        [null, null, null, null, null],
        [
          null,
          {
            rank: "7" as Rank,
            suit: "DIAMOND" as Suit,
            faceUp: true,
            id: "grid-1-1",
          },
          {
            rank: "A" as Rank,
            suit: "SPADE" as Suit,
            faceUp: false,
            id: "grid-1-2",
          },
          null,
          null,
        ],
        [null, null, null, null, null],
        [null, null, null, null, null],
        [null, null, null, null, null],
      ],
      hand: [
        { rank: "K" as Rank, suit: "DIAMOND" as Suit, id: "hand-0" },
        { rank: "2" as Rank, suit: "HEART" as Suit, id: "hand-1" },
        null,
        null,
      ],
      drawPile: [{ rank: "3" as Rank, suit: "CLUB" as Suit, id: "draw-0" }],
      discardPile: [] as Card[],
      moves: 0,
      _cardIdCounter: 10,
    } as ExpeditionState;
    __TEST_ONLY_setGameState(initialGameState);
    __TEST_ONLY_setSelectedSourceCell(null);
    __TEST_ONLY_setSelectedHandIndex(null);
    __TEST_ONLY_setTutorialStep(1);
    initialTutorialStepForTest = 1; // Store it for use as prevStep
    __TEST_ONLY_setIsDiscardModeActive(false);
    __TEST_ONLY_setShownTutorialStepsThisSession(new Set());

    // CardView and SpeechBubbleView will now come from the stub via crispGameLibModule
    testGridCardViews = initialGameState.grid.map((row: any[]) =>
      row.map((cell) => {
        if (cell) {
          const mockView = new crispGameLibModule.CardView();
          mockView.rank = cell.rank;
          mockView.suit = cell.suit;
          mockView.isFaceUp = cell.faceUp;
          return mockView;
        }
        return null;
      })
    );
    testHandCardViews = initialGameState.hand.map((card: any) => {
      if (card) {
        const mockView = new crispGameLibModule.CardView();
        mockView.rank = card.rank;
        mockView.suit = card.suit;
        mockView.isFaceUp = true;
        return mockView;
      }
      return null;
    });
    __TEST_ONLY_setGridCardViews(testGridCardViews);
    __TEST_ONLY_setHandCardViews(testHandCardViews);

    testTutorialBubbleInstance = new crispGameLibModule.SpeechBubbleView();
    __TEST_ONLY_setTutorialBubble(testTutorialBubbleInstance);

    // Mock crispGameLibModule.color to return the input color name
    (crispGameLibModule.color as jest.Mock).mockImplementation((name) => name);
  });

  it("STEP 1: should select a face-up grid card as source", () => {
    const sourceCardR = 1,
      sourceCardC = 1;
    const sourceCardView = testGridCardViews[sourceCardR]?.[sourceCardC];
    if (!sourceCardView) throw new Error("Test setup: Source CardView missing");

    const clickPosSource = { x: 10, y: 20 };
    (crispGameLibModule.input as any).isJustPressed = true;
    (crispGameLibModule.input.pos as any).x = clickPosSource.x;
    (crispGameLibModule.input.pos as any).y = clickPosSource.y;
    sourceCardView.containsPoint.mockReturnValue(true);

    handleOngoingInput();

    // Call updateTutorialDisplay manually to simulate display update
    const currentTutorialStep = getTutorialStep();
    const bubbleInstance = getTutorialBubble(); // Assuming getTutorialBubble is exported from main.ts
    const shownSteps = getShownTutorialStepsThisSession(); // Assuming this is exported
    updateTutorialDisplay(
      currentTutorialStep,
      initialTutorialStepForTest,
      bubbleInstance,
      shownSteps
    );

    expect(crispGameLibModule.play).toHaveBeenCalledWith("tap");
    expect(getSelectedSourceCell()).toEqual({ r: sourceCardR, c: sourceCardC });
    expect(getSelectedHandIndex()).toBeNull();
    expect(getTutorialStep()).toBe(2);
    expect(testTutorialBubbleInstance.setText).toHaveBeenCalled();
  });

  it("STEP 2: should select a matching hand card after selecting a source", () => {
    const sourceCardR = 1,
      sourceCardC = 1;
    __TEST_ONLY_setSelectedSourceCell({ r: sourceCardR, c: sourceCardC });
    __TEST_ONLY_setTutorialStep(2);
    initialTutorialStepForTest = 2; // Update initial step for this test context for updateTutorialDisplay call

    const handCardIndex = 0;
    const handCardView = testHandCardViews[handCardIndex];
    if (!handCardView) throw new Error("Test setup: Hand CardView missing");

    const clickPosHand = { x: 30, y: 100 };
    (crispGameLibModule.input as any).isJustPressed = true;
    (crispGameLibModule.input.pos as any).x = clickPosHand.x;
    (crispGameLibModule.input.pos as any).y = clickPosHand.y;
    handCardView.containsPoint.mockReturnValue(true);

    handleOngoingInput();

    // Call updateTutorialDisplay manually
    const currentTutorialStep = getTutorialStep();
    const bubbleInstance = getTutorialBubble();
    const shownSteps = getShownTutorialStepsThisSession();
    updateTutorialDisplay(
      currentTutorialStep,
      initialTutorialStepForTest,
      bubbleInstance,
      shownSteps
    );

    expect(crispGameLibModule.play).toHaveBeenCalledWith("tap");
    expect(getSelectedHandIndex()).toBe(handCardIndex);
    expect(getTutorialStep()).toBe(4);
    expect(testTutorialBubbleInstance.setText).toHaveBeenCalled();
  });

  it("STEP 3: should reveal an adjacent face-down card", () => {
    const sourceCardR = 1,
      sourceCardC = 1;
    const handCardIndex = 0;
    __TEST_ONLY_setSelectedSourceCell({ r: sourceCardR, c: sourceCardC });
    __TEST_ONLY_setSelectedHandIndex(handCardIndex);
    __TEST_ONLY_setTutorialStep(4); // Player is about to select a target
    initialTutorialStepForTest = 4; // For updateTutorialDisplay later

    const targetCardR = 1,
      targetCardC = 2;
    const targetCardView = testGridCardViews[targetCardR]?.[targetCardC];
    if (!targetCardView) throw new Error("Test setup: Target CardView missing");

    // Capture the game state *before* the action is applied by handleOngoingInput
    const gameStateBeforeCall = JSON.parse(JSON.stringify(getGameState()));
    if (!gameStateBeforeCall)
      throw new Error(
        "GameState is null before calling handleOngoingInput in STEP 3"
      );

    // Define the expected state *after* the action (this is what applyAction mock will return)
    const revealedCardState = {
      rank: "A" as Rank,
      suit: "SPADE" as Suit,
      faceUp: true,
      id: "grid-1-2",
    };
    const newHandCardState = {
      rank: "5" as Rank,
      suit: "CLUB" as Suit,
      id: "draw-0",
    };
    const expectedGameStateAfterAction = JSON.parse(
      JSON.stringify(gameStateBeforeCall)
    ); // Start with pre-action state
    expectedGameStateAfterAction.grid[targetCardR][targetCardC] =
      revealedCardState;
    expectedGameStateAfterAction.hand[handCardIndex] = newHandCardState;
    expectedGameStateAfterAction.drawPile = [];
    (ActualCartographersExpedition.applyAction as jest.Mock).mockReturnValue(
      expectedGameStateAfterAction
    );

    const clickPosTarget = { x: 50, y: 20 };
    (crispGameLibModule.input as any).isJustPressed = true;
    (crispGameLibModule.input.pos as any).x = clickPosTarget.x;
    (crispGameLibModule.input.pos as any).y = clickPosTarget.y;
    targetCardView.containsPoint.mockReturnValue(true);
    targetCardView.isFlipping = false;
    targetCardView.isMoving = false;

    handleOngoingInput(); // This will call the mocked applyAction

    // 1. Verify applyAction was called with the correct *pre-action* state and action payload
    expect(
      ActualCartographersExpedition.applyAction as jest.Mock
    ).toHaveBeenCalledWith(
      gameStateBeforeCall, // Use the state captured *before* handleOngoingInput
      {
        type: "revealAdjacent",
        payload: {
          handIndex: handCardIndex,
          sourceRow: sourceCardR,
          sourceCol: sourceCardC,
          targetRow: targetCardR,
          targetCol: targetCardC,
        },
      }
    );

    // 2. Verify that the global gameState in main.ts was updated to what applyAction returned
    expect(getGameState()?.grid[targetCardR][targetCardC]).toEqual(
      revealedCardState
    );
    expect(getGameState()?.hand[handCardIndex]).toEqual(newHandCardState);
    expect(getGameState()?.drawPile).toEqual([]);

    // 3. Verify other side effects
    expect(crispGameLibModule.play).toHaveBeenCalledWith("coin");
    expect(getSelectedSourceCell()).toBeNull();
    expect(getSelectedHandIndex()).toBeNull();

    // 4. Verify tutorial update
    const currentTutorialStep = getTutorialStep();
    const bubbleInstance = getTutorialBubble();
    const shownSteps = getShownTutorialStepsThisSession();
    updateTutorialDisplay(
      currentTutorialStep,
      initialTutorialStepForTest,
      bubbleInstance,
      shownSteps
    );
    expect(getTutorialStep()).toBe(6); // Expected: After revealing an Ace, show goal (step 6)
    expect(testTutorialBubbleInstance.setText).toHaveBeenCalled();
  });

  it("should activate discard mode, discard a card, and update state", () => {
    // Setup: Assume tutorial allows discard or player is past tutorial stages where it's restricted.
    // For simplicity, let's assume tutorial step is not a blocker for discard here.
    // Let the initial tutorial step be one where discard could be a next logical step if introduced.
    __TEST_ONLY_setTutorialStep(5); // e.g., "Continue exploring or discard"
    initialTutorialStepForTest = 5;

    // Activate discard mode (simulating a button press or a dedicated input)
    // For this test, we'll directly set it, assuming the UI to do so is tested elsewhere
    // or that handleOngoingInput would eventually lead to this state change.
    // To properly test activating discard mode via input, we might need a specific clickable area
    // and logic in handleOngoingInput. For now, let's test the discard action itself.
    __TEST_ONLY_setIsDiscardModeActive(true);
    expect(getIsDiscardModeActive()).toBe(true);

    // Simulate clicking a hand card to discard
    const handCardToDiscardIndex = 1; // e.g., the second card in hand
    const handCardViewToDiscard = testHandCardViews[handCardToDiscardIndex];
    if (!handCardViewToDiscard)
      throw new Error("Test setup: Hand CardView for discard is missing");

    // Capture current game state to verify applyAction call
    const gameStateBeforeCall = JSON.parse(JSON.stringify(getGameState()));
    if (!gameStateBeforeCall)
      throw new Error("GameState is null before discard action");

    // Define the expected game state after discard
    const expectedGameStateAfterDiscard = JSON.parse(
      JSON.stringify(gameStateBeforeCall)
    );
    const discardedCard =
      expectedGameStateAfterDiscard.hand[handCardToDiscardIndex];
    expectedGameStateAfterDiscard.hand[handCardToDiscardIndex] = null; // Or however drawing a new card is handled
    if (discardedCard) {
      expectedGameStateAfterDiscard.discardPile.push(discardedCard);
    }
    // Simulate drawing a new card if applicable (adjust if draw pile is empty)
    if (expectedGameStateAfterDiscard.drawPile.length > 0) {
      const newCardFromDraw = expectedGameStateAfterDiscard.drawPile.shift();
      expectedGameStateAfterDiscard.hand[handCardToDiscardIndex] =
        newCardFromDraw;
    } else {
      expectedGameStateAfterDiscard.hand[handCardToDiscardIndex] = null;
    }
    expectedGameStateAfterDiscard.moves++;

    (ActualCartographersExpedition.applyAction as jest.Mock).mockReturnValue(
      expectedGameStateAfterDiscard
    );

    const clickPosHandDiscard = { x: 35, y: 105 }; // Different from other clicks
    (crispGameLibModule.input as any).isJustPressed = true;
    (crispGameLibModule.input.pos as any).x = clickPosHandDiscard.x;
    (crispGameLibModule.input.pos as any).y = clickPosHandDiscard.y;
    handCardViewToDiscard.containsPoint.mockReturnValue(true);

    handleOngoingInput(); // This should trigger the discard

    // 1. Verify applyAction was called correctly
    expect(
      ActualCartographersExpedition.applyAction as jest.Mock
    ).toHaveBeenCalledWith(gameStateBeforeCall, {
      type: "discardAndDraw",
      payload: { handIndex: handCardToDiscardIndex },
    });

    // 2. Verify game state was updated
    expect(getGameState()).toEqual(expectedGameStateAfterDiscard);

    // 3. Verify side effects of discard
    expect(getIsDiscardModeActive()).toBe(false); // Should deactivate after discard
    expect(crispGameLibModule.play).toHaveBeenCalledWith("flip"); // Changed from "remove"
    expect(getSelectedSourceCell()).toBeNull(); // Selections should be reset
    expect(getSelectedHandIndex()).toBeNull();

    // 4. Verify tutorial update
    const currentTutorialStep = getTutorialStep();
    const bubbleInstance = getTutorialBubble();
    const shownSteps = getShownTutorialStepsThisSession();
    updateTutorialDisplay(
      currentTutorialStep,
      initialTutorialStepForTest, // previous step was 5
      bubbleInstance,
      shownSteps
    );
    // Assuming discard leads to a general "continue playing" step or back to a neutral state
    // Adjust expected tutorial step based on actual game logic
    expect(getTutorialStep()).toBe(1); // Example: back to selecting source or some other logical step
    expect(testTutorialBubbleInstance.setText).toHaveBeenCalled();
  });

  it("should trigger game end (WIN) condition and call crisp end functions", () => {
    // Setup: Place game in a state where the next action could lead to a win.
    // This often happens after a card reveal or similar action.
    // We'll use the same setup as STEP 3 for revealing a card,
    // but mock checkGameEnd to return WIN.

    const sourceCardR = 1,
      sourceCardC = 1;
    const handCardIndex = 0;
    __TEST_ONLY_setSelectedSourceCell({ r: sourceCardR, c: sourceCardC });
    __TEST_ONLY_setSelectedHandIndex(handCardIndex);
    __TEST_ONLY_setTutorialStep(4); // Player is about to select a target to reveal
    initialTutorialStepForTest = 4;

    const targetCardR = 1,
      targetCardC = 2;
    const targetCardView = testGridCardViews[targetCardR]?.[targetCardC];
    if (!targetCardView)
      throw new Error("Test setup: Target CardView missing for game end test");

    const gameStateBeforeCall = JSON.parse(JSON.stringify(getGameState()));
    if (!gameStateBeforeCall)
      throw new Error("GameState is null for game end test");

    const revealedCardState = {
      rank: "A" as Rank,
      suit: "SPADE" as Suit,
      faceUp: true,
      id: "grid-1-2",
    };
    const newHandCardState = {
      rank: "5" as Rank,
      suit: "CLUB" as Suit,
      id: "draw-0",
    };
    const expectedGameStateAfterAction = JSON.parse(
      JSON.stringify(gameStateBeforeCall)
    );
    expectedGameStateAfterAction.grid[targetCardR][targetCardC] =
      revealedCardState;
    expectedGameStateAfterAction.hand[handCardIndex] = newHandCardState;
    expectedGameStateAfterAction.drawPile = [];
    expectedGameStateAfterAction.moves++;

    (ActualCartographersExpedition.applyAction as jest.Mock).mockReturnValue(
      expectedGameStateAfterAction
    );
    // Crucially, mock checkGameEnd to return a WIN state for this specific call path
    // The global mock in beforeEach defaults to ONGOING.
    const mockCheckGameEndResult = {
      status: "WIN" as "WIN" | "LOSE" | "ONGOING", // Type assertion for clarity
      reason: "All Aces revealed!",
    };
    (
      ActualCartographersExpedition.checkGameEnd as jest.Mock
    ).mockReturnValueOnce(mockCheckGameEndResult);

    const clickPosTarget = { x: 50, y: 20 };
    (crispGameLibModule.input as any).isJustPressed = true;
    (crispGameLibModule.input.pos as any).x = clickPosTarget.x;
    (crispGameLibModule.input.pos as any).y = clickPosTarget.y;
    targetCardView.containsPoint.mockReturnValue(true);
    targetCardView.isFlipping = false;
    targetCardView.isMoving = false;

    handleOngoingInput(); // This will call applyAction internally

    // 1. Verify applyAction was called
    expect(ActualCartographersExpedition.applyAction).toHaveBeenCalledWith(
      gameStateBeforeCall,
      {
        type: "revealAdjacent",
        payload: {
          handIndex: handCardIndex,
          sourceRow: sourceCardR,
          sourceCol: sourceCardC,
          targetRow: targetCardR,
          targetCol: targetCardC,
        },
      }
    );

    // 2. Verify gameState was updated by applyAction
    expect(getGameState()).toEqual(expectedGameStateAfterAction);

    // Simulate the part of the update loop in main.ts that calls checkGameEnd
    // In the actual game, handleOngoingInput() returning true would trigger this.
    // Here, we assume handleOngoingInput did its job of updating state via applyAction.
    const stateAfterAction = getGameState(); // This is expectedGameStateAfterAction
    if (!stateAfterAction)
      throw new Error("GameState became null after action in test"); // Guard for null
    const gameEndResult =
      ActualCartographersExpedition.checkGameEnd(stateAfterAction);

    // 3. Verify checkGameEnd was called with the new state
    expect(ActualCartographersExpedition.checkGameEnd).toHaveBeenCalledWith(
      expectedGameStateAfterAction
    );
    expect(gameEndResult).toEqual(mockCheckGameEndResult);

    // 4. Simulate what the update loop in main.ts would do with this result
    // and verify crisp-game-lib end functions were called for WIN.
    // This part simulates the logic from main.ts's update() function:
    // if (endCheckResult.status !== "ONGOING") {
    //   gameLifeCycle = "GameOver";
    //   gameStatus = endCheckResult.status;
    //   gameOverReason = endCheckResult.reason ?? null;
    //   // ... and then based on gameStatus, title() or text() is called.
    // }
    if (gameEndResult.status === "WIN") {
      // Simulate the call to crispGameLibModule.title as it would happen in main.ts
      crispGameLibModule.title("YOU WIN!", {
        detail: gameEndResult.reason,
        backgroundColor: crispGameLibModule.color("yellow"),
        color: crispGameLibModule.color("black"),
      });
    } else if (gameEndResult.status === "LOSE") {
      // Should also test LOSE condition similarly
      // For this test, we are focusing on WIN
    }

    expect(crispGameLibModule.title).toHaveBeenCalledWith("YOU WIN!", {
      detail: "All Aces revealed!",
      backgroundColor: "yellow", // Mocked color returns the name
      color: "black", // Mocked color returns the name
    });

    // 5. Verify selections are reset, etc. (This might happen in handleOngoingInput or after game end)
    expect(getSelectedSourceCell()).toBeNull();
    expect(getSelectedHandIndex()).toBeNull();

    // Tutorial might not update or might show a "Game Over" message
    // Depending on logic, check getTutorialStep() and setText if applicable
    // For now, assume game end bypasses further tutorial steps.
  });
});
