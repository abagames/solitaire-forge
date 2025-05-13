import {
  GameDefinition,
  Card,
  BaseGameState,
  BaseAction,
  Suit,
  Rank,
} from "../../types.ts";
import { createDeck, shuffleDeck } from "../../utils/cardUtils.ts";
import { createRng } from "../../utils/rng.ts";

// Interface representing the game state (export added)
export interface ExpeditionState extends BaseGameState {
  grid: ((Card & { faceUp: boolean }) | null)[][];
  hand: Card[];
  drawPile: Card[];
  discardPile: Card[];
  moves: number;
}

// Interface representing action parameters (export added)
export interface RevealAdjacentAction extends BaseAction {
  type: "revealAdjacent";
  payload: {
    handIndex: number;
    sourceRow: number;
    sourceCol: number;
    targetRow: number;
    targetCol: number;
  };
}

export interface DiscardAndDrawAction extends BaseAction {
  type: "discardAndDraw";
  payload: {
    handIndex: number; // Index of the hand card to discard
  };
}

// Type alias for actions (export added)
export type ExpeditionAction = RevealAdjacentAction | DiscardAndDrawAction;

// --- Define Grid Size ---
const GRID_ROWS = 5;
const GRID_COLS = 5;
const HAND_SIZE = 4; // Keep hand size at 4 as per last change

// --- Add Obstacle Ranks Definition --- (MODIFIED: Added export)
export const OBSTACLE_RANKS: Rank[] = ["J", "Q", "K", "10"];

export const CartographersExpedition: GameDefinition<
  ExpeditionState,
  ExpeditionAction
> = {
  // --- MODIFICATION: Update gameId and name to reflect the rule change ---
  gameId: "cartographers_expedition_v1_find_aces",
  gameName: "Cartographer's Expedition (Find Aces)",
  description:
    "A solitaire game where you reveal adjacent cards using matching hand cards to find the four corner Aces.",

  setupGame: (seed?: string): ExpeditionState => {
    const fullDeck = createDeck();

    // Separate Aces
    const aces = fullDeck.filter((card) => card.rank === "A");
    const nonAces = fullDeck.filter((card) => card.rank !== "A");

    // --- MODIFICATION: Use shuffleDeck for both ---
    const shuffledNonAces = shuffleDeck(
      [...nonAces],
      seed ? `${seed}-nonaces` : undefined
    );
    const shuffledAces = shuffleDeck(
      [...aces],
      seed ? `${seed}-aces` : undefined
    );

    const grid: ((Card & { faceUp: boolean }) | null)[][] = Array(GRID_ROWS)
      .fill(null)
      .map(() => Array(GRID_COLS).fill(null));
    const hand: Card[] = [];

    const cornerPositions = [
      { r: 0, c: 0 },
      { r: 0, c: GRID_COLS - 1 },
      { r: GRID_ROWS - 1, c: 0 },
      { r: GRID_ROWS - 1, c: GRID_COLS - 1 },
    ];

    // Place shuffled Aces in corners
    cornerPositions.forEach((pos, index) => {
      if (shuffledAces[index]) {
        grid[pos.r][pos.c] = { ...shuffledAces[index], faceUp: false };
      }
    });

    // Fill remaining grid cells with shuffled non-Aces
    let nonAceIndex = 0;
    for (let r = 0; r < GRID_ROWS; r++) {
      for (let c = 0; c < GRID_COLS; c++) {
        // Skip corners (already filled) and the center card position for now
        const isCorner = cornerPositions.some((p) => p.r === r && p.c === c);
        const isCenter =
          r === Math.floor(GRID_ROWS / 2) && c === Math.floor(GRID_COLS / 2);

        if (!isCorner && !isCenter && nonAceIndex < shuffledNonAces.length) {
          grid[r][c] = { ...shuffledNonAces[nonAceIndex++], faceUp: false };
        }
      }
    }

    // --- MODIFIED: Place center card and handle redraw ---
    const centerRow = Math.floor(GRID_ROWS / 2);
    const centerCol = Math.floor(GRID_COLS / 2);
    let initialCenterCard: (Card & { faceUp: boolean }) | null = null;

    // The remaining non-aces form the initial draw pile + potential center card
    let remainingNonAces = shuffledNonAces.slice(nonAceIndex);

    // Deal initial hand (Size 4) BEFORE placing center and redrawing
    for (let i = 0; i < HAND_SIZE && remainingNonAces.length > 0; i++) {
      const card = remainingNonAces.shift(); // Use shift to take from the start
      if (card) {
        hand.push(card);
      }
    }

    // Now remainingNonAces forms the draw pile, place the next as center
    const drawPile = remainingNonAces; // Assign remaining to drawPile
    let discardPile: Card[] = []; // Initialize discard pile

    if (drawPile.length > 0) {
      initialCenterCard = { ...drawPile.shift()!, faceUp: true }; // Take next card for center
      grid[centerRow][centerCol] = initialCenterCard;
    } else {
      console.warn("Draw pile empty before placing initial center card!");
      grid[centerRow][centerCol] = null; // Leave center empty
    }

    // Check if redraw is needed
    let redrawNeeded = false;
    if (initialCenterCard) {
      const isObstacle = OBSTACLE_RANKS.includes(initialCenterCard.rank);
      const matchesHand = hand.some(
        (hCard) =>
          hCard.suit === initialCenterCard!.suit ||
          hCard.rank === initialCenterCard!.rank
      );
      if (isObstacle || !matchesHand) {
        redrawNeeded = true;
      }
    }

    // --- MODIFIED: Redraw logic: Return to draw pile and reshuffle ---
    if (redrawNeeded && initialCenterCard) {
      console.log("Initial center card requires redraw. Starting redraw...");
      const cardsToReturnToPile: Card[] = []; // Store cards to return later
      cardsToReturnToPile.push(initialCenterCard); // Add initial card to return list
      grid[centerRow][centerCol] = null; // Empty the center spot temporarily
      let foundSuitableCard = false;

      while (drawPile.length > 0) {
        const drawnCard = drawPile.shift()!; // Take next card from draw pile
        const isObstacle = OBSTACLE_RANKS.includes(drawnCard.rank);
        const matchesHand = hand.some(
          (hCard) =>
            hCard.suit === drawnCard.suit || hCard.rank === drawnCard.rank
        );

        if (!isObstacle && matchesHand) {
          console.log(
            `Found suitable center card: ${drawnCard.rank}${drawnCard.suit}`
          );
          grid[centerRow][centerCol] = { ...drawnCard, faceUp: true }; // Place suitable card
          foundSuitableCard = true;
          break; // Exit redraw loop
        } else {
          // console.log(`Returning unsuitable card to pile: ${drawnCard.rank}${drawnCard.suit}`);
          cardsToReturnToPile.push(drawnCard); // Add unsuitable card to return list
        }
      }

      // Return the collected cards to the draw pile
      drawPile.push(...cardsToReturnToPile);

      // Reshuffle the draw pile after returning cards
      shuffleDeck(drawPile, seed ? `${seed}-redraw-shuffle` : undefined);
      console.log(`Draw pile reshuffled. New size: ${drawPile.length}`);

      if (!foundSuitableCard) {
        console.warn(
          "Draw pile exhausted during redraw, center remains empty."
        );
        grid[centerRow][centerCol] = null; // Ensure center is null if no card found
      }
    }
    // --- END CENTER CARD REDRAW LOGIC ---

    return {
      grid,
      hand,
      drawPile,
      discardPile,
      moves: 0,
      _cardIdCounter: 52, // Reset based on standard deck size
    };
  },

  getAvailableActions: (state: ExpeditionState): ExpeditionAction[] => {
    const actions: ExpeditionAction[] = [];
    const gridRows = state.grid.length;
    const gridCols = state.grid[0]?.length ?? 0;

    // --- RevealAdjacent Actions ---
    if (state.hand.length > 0) {
      for (let handIndex = 0; handIndex < state.hand.length; handIndex++) {
        const handCard = state.hand[handIndex];
        if (!handCard) continue; // Skip null slots if any exist

        for (let r = 0; r < gridRows; r++) {
          for (let c = 0; c < gridCols; c++) {
            const sourceCard = state.grid[r]?.[c];
            if (sourceCard && sourceCard.faceUp) {
              // --- MODIFIED: Check matching condition based on OBSTACLE_RANKS constant ---
              let canUseSource = false;
              const isObstacleSource = OBSTACLE_RANKS.includes(sourceCard.rank);

              if (isObstacleSource) {
                // For Obstacle Ranks: Only rank match is allowed
                if (handCard.rank === sourceCard.rank) {
                  canUseSource = true;
                }
              } else {
                // For non-obstacle ranks: Suit or rank match is allowed
                if (
                  handCard.suit === sourceCard.suit ||
                  handCard.rank === sourceCard.rank
                ) {
                  canUseSource = true;
                }
              }

              if (canUseSource) {
                // --- END MODIFICATION ---
                const adjacentCells = [
                  [r - 1, c],
                  [r + 1, c],
                  [r, c - 1],
                  [r, c + 1],
                ];
                for (const [adjR, adjC] of adjacentCells) {
                  // Use helper that considers actual grid dimensions
                  if (isInBounds(adjR, adjC, gridRows, gridCols)) {
                    const targetCard = state.grid[adjR]?.[adjC];
                    if (targetCard && !targetCard.faceUp) {
                      actions.push({
                        type: "revealAdjacent",
                        payload: {
                          handIndex,
                          sourceRow: r,
                          sourceCol: c,
                          targetRow: adjR,
                          targetCol: adjC,
                        },
                      });
                    }
                  }
                }
              }
            }
          }
        }
      }
    }

    // --- DiscardAndDraw Actions ---
    // Allow discard only if the draw pile has cards
    if (state.hand.length > 0 && state.drawPile.length > 0) {
      for (let i = 0; i < state.hand.length; i++) {
        // Add action only if there's actually a card in the hand slot
        if (state.hand[i]) {
          actions.push({
            type: "discardAndDraw",
            payload: { handIndex: i },
          });
        }
      }
    }

    return actions;
  },

  applyAction: (
    state: ExpeditionState,
    action: ExpeditionAction
  ): ExpeditionState => {
    const gridRows = state.grid.length;
    const gridCols = state.grid[0]?.length ?? 0;

    // --- Create newState with deep copied grid ---
    // (Deep copy logic remains the same, ensure it copies faceUp property)
    const deepCopiedGrid: ((Card & { faceUp: boolean }) | null)[][] = [];
    for (const row of state.grid) {
      deepCopiedGrid.push(
        row ? row.map((cell) => (cell ? { ...cell } : null)) : []
      );
    }

    // Deep copy other state parts
    const baseNewState: ExpeditionState = {
      ...state,
      grid: deepCopiedGrid,
      hand: state.hand
        .map((card) => (card ? { ...card } : null))
        .filter(Boolean) as Card[], // Filter out potential nulls just in case, map copies
      drawPile: state.drawPile.map((card) => ({ ...card })),
      discardPile: state.discardPile.map((card) => ({ ...card })),
      // moves incremented below per action type
    };

    // Handle Discard and Draw Action
    if (action.type === "discardAndDraw") {
      const { handIndex } = action.payload;
      if (
        handIndex < 0 ||
        handIndex >= state.hand.length ||
        !state.hand[handIndex] || // Ensure there's a card to discard
        state.drawPile.length === 0
      ) {
        console.warn(
          "Invalid discard action:",
          action,
          state.hand,
          state.drawPile.length
        );
        return state; // Invalid action
      }

      // Use baseNewState for modifications
      const newState: ExpeditionState = {
        ...baseNewState,
        moves: state.moves + 1,
      };

      const discardedCard = newState.hand.splice(handIndex, 1)[0];
      if (discardedCard) {
        // Ensure splice returned something
        newState.discardPile.push(discardedCard);
      } else {
        console.warn(
          "Discard failed: splice returned nothing at index",
          handIndex
        );
        return state; // Should not happen if initial checks pass
      }

      // Draw new card using pop() and insert at the same index
      const newCard = newState.drawPile.pop(); // Get card from end of draw pile
      if (newCard) {
        newState.hand.splice(handIndex, 0, newCard); // Insert at the gap
      }
      // If draw pile was empty, hand size naturally reduces.

      // DEBUG: Log hand state after modification
      // console.log(
      //   `DEBUG applyAction (${action.type}): New hand state:`,
      //   newState.hand.map((c) => c ? `${c.rank}${c.suit.charAt(0)}` : 'null').join(", ")
      // );

      return newState;
    }

    // Handle Reveal Adjacent Action
    if (action.type === "revealAdjacent") {
      const { handIndex, sourceRow, sourceCol, targetRow, targetCol } =
        action.payload;
      // Validate hand index and card existence
      if (
        handIndex < 0 ||
        handIndex >= state.hand.length ||
        !state.hand[handIndex]
      ) {
        console.warn(
          "Invalid reveal action: bad hand index",
          action,
          state.hand
        );
        return state;
      }
      // Use helper for bounds check
      if (
        !isInBounds(sourceRow, sourceCol, gridRows, gridCols) ||
        !isInBounds(targetRow, targetCol, gridRows, gridCols)
      ) {
        console.warn("Invalid reveal action: out of bounds", action);
        return state;
      }

      const handCard = state.hand[handIndex]; // Use original state for validation check
      const sourceCard = state.grid[sourceRow]?.[sourceCol];
      const targetCard = state.grid[targetRow]?.[targetCol];

      // Validate card states and adjacency
      if (
        !sourceCard ||
        !sourceCard.faceUp ||
        !targetCard ||
        targetCard.faceUp
      ) {
        console.warn(
          "Invalid reveal action: card state invalid",
          action,
          sourceCard,
          targetCard
        );
        return state;
      }
      if (
        !(
          handCard.suit === sourceCard.suit || handCard.rank === sourceCard.rank
        )
      ) {
        console.warn(
          "Invalid reveal action: hand/source mismatch",
          action,
          handCard,
          sourceCard
        );
        return state;
      }
      const dx = Math.abs(sourceRow - targetRow);
      const dy = Math.abs(sourceCol - targetCol);
      if (dx + dy !== 1) {
        console.warn("Invalid reveal action: not adjacent", action);
        return state; // Not adjacent
      }

      // Use baseNewState for modifications
      const newState: ExpeditionState = {
        ...baseNewState,
        moves: state.moves + 1,
      };

      // Reveal target card - Use spread to ensure modification doesn't affect original state copy
      const cardToReveal = newState.grid[targetRow][targetCol];
      if (cardToReveal) {
        newState.grid[targetRow][targetCol] = { ...cardToReveal, faceUp: true };
      } else {
        console.warn(
          "Target card unexpectedly null in newState",
          targetRow,
          targetCol
        );
        return state; // Should not happen
      }

      // Discard hand card
      const usedHandCard = newState.hand.splice(handIndex, 1)[0];
      if (usedHandCard) {
        newState.discardPile.push(usedHandCard);
      } else {
        console.warn(
          "Reveal discard failed: splice returned nothing at index",
          handIndex
        );
        return state; // Should not happen
      }

      // Draw new card if possible
      if (newState.drawPile.length > 0) {
        const newCard = newState.drawPile.pop();
        if (newCard) {
          newState.hand.splice(handIndex, 0, newCard); // Insert back into the same slot
        }
      }
      // If draw pile was empty, hand size naturally reduces.

      // DEBUG: Log hand state after modification
      // console.log(
      //   `DEBUG applyAction (${action.type}): New hand state:`,
      //   newState.hand.map((c) => c ? `${c.rank}${c.suit.charAt(0)}` : 'null').join(", ")
      // );

      return newState;
    }

    // --- FIX LINTER ERROR AGAIN: Cast to any to access type ---
    // This path should not be reachable with valid actions.
    console.warn(
      `DEBUG applyAction: Unknown action type received: ${
        (action as any)?.type ?? "undefined"
      }`
    );
    return state;
  },

  checkGameEnd: (
    state: ExpeditionState
  ): { status: "WIN" | "LOSE" | "ONGOING"; reason?: string } => {
    const gridRows = state.grid.length;
    const gridCols = state.grid[0]?.length ?? 0;

    // Check for win condition: All 4 corner Aces are faceUp
    const cornerAces = [
      state.grid[0][0],
      state.grid[0][GRID_COLS - 1],
      state.grid[GRID_ROWS - 1][0],
      state.grid[GRID_ROWS - 1][GRID_COLS - 1],
    ];
    const acesFound = cornerAces.filter(
      (card) => card && card.rank === "A" && card.faceUp
    ).length;

    if (acesFound === 4) {
      return { status: "WIN", reason: "Found the 4 corner Aces!" };
    }

    // --- NEW Lose Condition: Draw pile empty --- (MODIFIED: Added this check)
    if (state.drawPile.length === 0) {
      return { status: "LOSE", reason: "Draw pile is empty." };
    }

    // Check for lose condition: No available moves
    const availableActions = CartographersExpedition.getAvailableActions(state);
    if (availableActions.length === 0) {
      // Check if this is due to no cards in hand and no cards in draw pile
      const canReveal = hasRevealMoves(state);
      const canDiscard = state.hand.length > 0 && state.drawPile.length > 0; // Can always discard if hand and draw pile have cards

      if (!canReveal && !canDiscard) {
        // More specific loss reasons (will be less common now)
        let reason = "No valid moves left.";
        // This condition might still occur if the hand is empty before the draw pile is empty,
        // although with current rules that seems unlikely unless the initial hand is empty.
        if (
          state.hand.length === 0 &&
          state.drawPile.length === 0 // Added check for draw pile explicitly
          // state.field.every(row => row.every(cell => !cell || cell.faceUp))
        ) {
          reason = "Hand and draw pile are both empty."; // Simplified reason as draw pile check is separate
        }
        return { status: "LOSE", reason };
      }
      // If only one type of action is impossible but the other is possible,
      // or if draw pile is empty but reveal moves exist, game is ongoing.
    }

    return { status: "ONGOING" };
  },
};

// --- MODIFICATION: Update isInBounds to accept dimensions ---
function isInBounds(
  row: number,
  col: number,
  gridRows: number,
  gridCols: number
): boolean {
  return row >= 0 && row < gridRows && col >= 0 && col < gridCols;
}

// --- MODIFICATION: Update hasRevealMoves signature ---
function hasRevealMoves(state: ExpeditionState): boolean {
  const gridRows = state.grid.length;
  const gridCols = state.grid[0]?.length ?? 0;

  if (state.hand.length === 0 || state.hand.every((card) => !card))
    return false; // No cards in hand

  for (let handIndex = 0; handIndex < state.hand.length; handIndex++) {
    const handCard = state.hand[handIndex];
    if (!handCard) continue; // Skip empty slots

    for (let r = 0; r < gridRows; r++) {
      for (let c = 0; c < gridCols; c++) {
        const sourceCard = state.grid[r]?.[c];
        if (sourceCard && sourceCard.faceUp) {
          if (
            handCard.suit === sourceCard.suit ||
            handCard.rank === sourceCard.rank
          ) {
            const adjacentCells = [
              [r - 1, c],
              [r + 1, c],
              [r, c - 1],
              [r, c + 1],
            ];
            for (const [adjR, adjC] of adjacentCells) {
              // Use updated helper
              if (isInBounds(adjR, adjC, gridRows, gridCols)) {
                const targetCard = state.grid[adjR]?.[adjC];
                if (targetCard && !targetCard.faceUp) {
                  return true; // Found a valid reveal move
                }
              }
            }
          }
        }
      }
    }
  }
  return false; // No reveal moves found
}

// --- Add shuffleArray if not imported (basic Fisher-Yates) ---
// function shuffleArray<T>(array: T[], seed?: string): T[] {
//     // Basic non-seeded shuffle for simplicity if no seed provided
//     // Replace with seeded shuffle if available/needed
//     let currentIndex = array.length, randomIndex;
//     const rng = seed ? new Math.seedrandom(seed) : Math.random; // Needs seedrandom library or similar
//
//     while (currentIndex !== 0) {
//         randomIndex = Math.floor(rng() * currentIndex);
//         currentIndex--;
//         [array[currentIndex], array[randomIndex]] = [
//             array[randomIndex], array[currentIndex]];
//     }
//     return array;
// }
