import {
  GameDefinition,
  BaseGameState,
  BaseAction,
  Card,
  Suit,
  Rank,
} from "../../types.ts"; // Import types from the correct file

// --- Helper Functions ---

// Fisher-Yates shuffle
function shuffle<T>(array: T[], seed?: string): T[] {
  // Basic seeded PRNG (replace with a more robust one if needed)
  let random = seed ? mulberry32(cyrb128(seed)[0]) : Math.random;
  let currentIndex = array.length,
    randomIndex;
  const newArray = [...array]; // Create a copy

  while (currentIndex !== 0) {
    randomIndex = Math.floor(random() * currentIndex);
    currentIndex--;
    [newArray[currentIndex], newArray[randomIndex]] = [
      newArray[randomIndex],
      newArray[currentIndex],
    ];
  }
  return newArray;
}

// Simple hash function for seed generation
function cyrb128(str: string): [number, number, number, number] {
  let h1 = 1779033703,
    h2 = 3144134277,
    h3 = 1013904242,
    h4 = 2773480762;
  for (let i = 0, k; i < str.length; i++) {
    k = str.charCodeAt(i);
    h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
    h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
    h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
    h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
  }
  h1 = Math.imul(h3 ^ (h1 >>> 18), 597399067);
  h2 = Math.imul(h4 ^ (h2 >>> 22), 2869860233);
  h3 = Math.imul(h1 ^ (h3 >>> 17), 951274213);
  h4 = Math.imul(h2 ^ (h4 >>> 19), 2716044179);
  return [
    (h1 ^ h2 ^ h3 ^ h4) >>> 0,
    (h2 ^ h1) >>> 0,
    (h3 ^ h1) >>> 0,
    (h4 ^ h1) >>> 0,
  ];
}

// Simple PRNG
function mulberry32(a: number): () => number {
  return function () {
    var t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// --- Game Specific Types ---

export interface CatalystReactionState extends BaseGameState {
  deck: Card[];
  field: Card[];
  hand: Card[];
  discardPile: Card[];
  _cardIdCounter: number;
}

// Action Types
// const DRAW_CARD = "DRAW_CARD"; // Removed
const PLAY_CATALYST = "PLAY_CATALYST";

// interface DrawCardAction extends BaseAction { // Removed
//   type: typeof DRAW_CARD;
// }

export interface PlayCatalystAction extends BaseAction {
  type: typeof PLAY_CATALYST;
  payload: {
    catalystCardId: string;
    position: number;
  };
}

// type CatalystReactionAction = DrawCardAction | PlayCatalystAction; // Changed
export type CatalystReactionAction = PlayCatalystAction; // Only PlayCatalyst is possible

// --- Constants ---
const MAX_HAND_SIZE = 3;
const INITIAL_FIELD_SIZE = 8;
const MAX_FIELD_SIZE = 12; // Set the maximum number of cards on the field to 12

// --- Helper Function for Automatic Reactions ---

/**
 * Scans the field for automatic reactions and performs them iteratively.
 * An automatic reaction occurs if a card matches both its left and right neighbors (rank or suit).
 * Returns the new state after all chain reactions have completed.
 */
const checkAndPerformAutomaticReactions = (
  currentState: CatalystReactionState
): CatalystReactionState => {
  let state = currentState;
  let reactionFoundInScan: boolean;

  do {
    reactionFoundInScan = false;
    const currentField = state.field;
    let fieldLength = currentField.length;

    // Iterate through possible middle cards (index 1 to length - 2)
    for (let i = 1; i < fieldLength - 1; i++) {
      const leftCard = currentField[i - 1];
      const middleCard = currentField[i];
      const rightCard = currentField[i + 1];

      // NEW Rule: Check if all 3 cards have the same rank OR same suit
      const sameRank =
        leftCard.rank === middleCard.rank && middleCard.rank === rightCard.rank;
      const sameSuit =
        leftCard.suit === middleCard.suit && middleCard.suit === rightCard.suit;

      if (sameRank || sameSuit) {
        // Reaction found!
        const reason = sameRank ? "rank" : "suit";
        // Create a new field array with the 3 cards removed
        const newField = [
          ...currentField.slice(0, i - 1),
          ...currentField.slice(i + 2),
        ];

        // Update the state with the new field
        state = { ...state, field: newField };
        reactionFoundInScan = true;
        // Break the inner loop and restart scan from the beginning of the modified field
        break;
      }
    }
    // If a reaction was found, the loop continues to rescan the modified field
  } while (reactionFoundInScan);

  return state;
};

// --- Game Definition ---

export const catalystReactionGameDefinition: GameDefinition<
  CatalystReactionState,
  CatalystReactionAction
> = {
  gameId: "catalyst-reaction-v7-auto", // Updated ID
  gameName: "Catalyst Reaction (v7, Auto Reaction)", // Updated name

  setupGame: (seed?: string): CatalystReactionState => {
    const suits: Suit[] = ["SPADE", "HEART", "DIAMOND", "CLUB"];
    const ranks: Rank[] = [
      "A",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "J",
      "Q",
      "K",
    ];
    let fullDeck: Card[] = [];
    let idCounter = 0;
    for (const suit of suits) {
      for (const rank of ranks) {
        fullDeck.push({ suit, rank, id: `card-${idCounter++}` });
      }
    }
    const shuffledDeck = shuffle(fullDeck, seed);

    const fieldSize = INITIAL_FIELD_SIZE; // Specify the initial number of cards with a constant
    let initialFieldDeal = shuffledDeck.slice(0, fieldSize);
    let currentDeck = shuffledDeck.slice(fieldSize);

    // Initialize stableState before the loop
    let stableState: CatalystReactionState = {
      _cardIdCounter: idCounter,
      deck: currentDeck,
      field: initialFieldDeal,
      hand: [],
      discardPile: [],
    };

    // Loop for initial reaction check and replenishment
    let currentField = initialFieldDeal;
    let fieldChanged = true;
    while (fieldChanged) {
      const tempState: CatalystReactionState = {
        _cardIdCounter: idCounter,
        deck: currentDeck,
        field: currentField,
        hand: [], // Hand is dealt later
        discardPile: [],
      };

      const stateAfterReaction = checkAndPerformAutomaticReactions(tempState);
      const reactionsOccurred =
        stateAfterReaction.field.length < currentField.length;

      if (reactionsOccurred) {
        currentField = stateAfterReaction.field;
        currentDeck = stateAfterReaction.deck;
        // Replenish field back to fieldSize
        const needed = fieldSize - currentField.length;
        if (needed > 0 && currentDeck.length > 0) {
          const drawCount = Math.min(needed, currentDeck.length);
          const drawnCards = currentDeck.slice(0, drawCount);
          currentField = [...currentField, ...drawnCards];
          currentDeck = currentDeck.slice(drawCount);
          fieldChanged = true; // Continue loop as field was potentially changed by replenish + next reaction check
        } else if (needed > 0 && currentDeck.length === 0) {
          fieldChanged = false; // Cannot replenish, stop the loop
        } else {
          // Field might be exactly fieldSize after reaction (unlikely but possible)
          fieldChanged = true; // Field content changed, re-check reactions
        }
      } else {
        // No reactions occurred, check if field needs final replenish (if deck ran out mid-replenish earlier)
        const needed = fieldSize - currentField.length;
        if (needed > 0 && currentDeck.length > 0) {
          const drawCount = Math.min(needed, currentDeck.length);
          const drawnCards = currentDeck.slice(0, drawCount);
          currentField = [...currentField, ...drawnCards];
          currentDeck = currentDeck.slice(drawCount);
          // Field changed due to final replenish, loop one more time to ensure no reactions on the final state
          fieldChanged = true;
        } else {
          fieldChanged = false; // No reactions and field is stable/cannot be replenished
        }
      }

      // Update stableState before potentially looping again
      stableState = {
        _cardIdCounter: idCounter,
        deck: currentDeck,
        field: currentField,
        hand: [], // Hand still empty
        discardPile: [],
      };
    }

    // Draw initial hand AFTER stabilization
    const hand: Card[] = [];
    for (let i = 0; i < MAX_HAND_SIZE && stableState.deck.length > 0; i++) {
      hand.push(stableState.deck.shift()!); // Draw from the updated deck
    }

    // Final state includes the stable field, updated deck, and initial hand
    return {
      ...stableState,
      hand: hand,
    };
  },

  getAvailableActions: (
    state: CatalystReactionState
  ): CatalystReactionAction[] => {
    const actions: CatalystReactionAction[] = [];
    // Player only needs cards in hand. Placement is always possible.
    if (state.hand.length > 0) {
      // Special handling if the field has reached the maximum number of cards
      if (state.field.length >= MAX_FIELD_SIZE) {
        // For each card in hand, add actions only for positions that cause a reaction
        for (const handCard of state.hand) {
          for (let pos = 1; pos < state.field.length; pos++) {
            const leftCard = state.field[pos - 1];
            const rightCard = state.field[pos];

            // All 3 cards have the same rank or the same suit
            const sameRank =
              leftCard.rank === handCard.rank &&
              handCard.rank === rightCard.rank;

            const sameSuit =
              leftCard.suit === handCard.suit &&
              handCard.suit === rightCard.suit;

            if (sameRank || sameSuit) {
              actions.push({
                type: PLAY_CATALYST,
                payload: { catalystCardId: handCard.id, position: pos },
              });
            }
          }
        }
      } else {
        // Normal processing: allow all positions
        for (const handCard of state.hand) {
          // Generate positions from 0 (left end) to field.length (right end)
          for (let i = 0; i <= state.field.length; i++) {
            actions.push({
              type: PLAY_CATALYST,
              payload: { catalystCardId: handCard.id, position: i },
            });
          }
        }
      }
    }
    return actions;
  },

  applyAction: (
    state: CatalystReactionState,
    action: CatalystReactionAction
  ): CatalystReactionState => {
    let newState = JSON.parse(JSON.stringify(state)); // Deep copy

    if (action.type === PLAY_CATALYST) {
      const { catalystCardId, position } = action.payload;
      const catalystIndex = newState.hand.findIndex(
        (card: Card) => card.id === catalystCardId
      );
      if (catalystIndex === -1) {
        return state; // Error: Card not in hand
      }
      const catalystCard = newState.hand[catalystIndex];

      // Correct validation: Allow 0 to field.length inclusive
      if (position < 0 || position > newState.field.length) {
        return state; // Error: Invalid position
      }

      let playerReactionOccurred = false;
      // Player reaction check only applies when placed BETWEEN existing cards
      if (position > 0 && position < newState.field.length) {
        const leftCardIndex = position - 1;
        const rightCardIndex = position; // Index in field *before* insertion
        const leftCard = newState.field[leftCardIndex];
        const rightCard = newState.field[rightCardIndex]; // Card at the insertion point index

        // Check PLAYER reaction condition
        // If all 3 cards have the same rank
        const sameRank =
          leftCard &&
          rightCard &&
          leftCard.rank === catalystCard.rank &&
          catalystCard.rank === rightCard.rank;

        // If all 3 cards have the same suit
        const sameSuit =
          leftCard &&
          rightCard &&
          leftCard.suit === catalystCard.suit &&
          catalystCard.suit === rightCard.suit;

        playerReactionOccurred = sameRank || sameSuit;

        if (playerReactionOccurred) {
          // Player reaction: Remove catalyst from hand, remove neighbors from field
          newState.hand.splice(catalystIndex, 1);
          // IMPORTANT: Remove right first because its index might change after left removal
          newState.field.splice(rightCardIndex, 1);
          newState.field.splice(leftCardIndex, 1);
        }
      }

      // If player reaction did NOT occur (either placed at ends, or condition not met when placed between cards)
      if (!playerReactionOccurred) {
        // No player reaction: Remove catalyst from hand and place it on the field at the specified position
        newState.hand.splice(catalystIndex, 1);
        newState.field.splice(position, 0, catalystCard);
      }

      // --- Perform Automatic Reaction Check AFTER field change ---
      newState = checkAndPerformAutomaticReactions(newState);

      // --- Draw Card AFTER all reactions ---
      if (newState.deck.length > 0 && newState.hand.length < MAX_HAND_SIZE) {
        newState.hand.push(newState.deck.shift()!);
      }
    } else {
      // Should not happen with current Action types
      return state;
    }

    return newState;
  },

  checkGameEnd: (
    state: CatalystReactionState
  ): { status: "WIN" | "LOSE" | "ONGOING"; reason?: string } => {
    // Win Condition
    if (state.field.length === 0) {
      return { status: "WIN" };
    }

    // Lose Condition: No hand cards to play at the start of the turn
    // Note: getAvailableActions being empty covers the case where field < 2 cards
    if (state.hand.length === 0) {
      // Check if deck is also empty, otherwise player *might* draw later (though not possible with v7 rules)
      // Simplify: If hand is empty, player cannot make a move this turn.
      return { status: "LOSE", reason: "No cards in hand to play." };
    }

    // Added check: If deck is empty AND hand is empty (e.g. last card played resulted in win check before loss)
    if (
      state.deck.length === 0 &&
      state.hand.length === 0 &&
      state.field.length > 0
    ) {
      return {
        status: "LOSE",
        reason: "Deck and hand are empty, cannot make further moves.",
      };
    }

    // New lose condition: If the field is full and no card in hand can cause a reaction
    if (state.field.length >= MAX_FIELD_SIZE) {
      // Check if any card in hand can cause a reaction
      let canCauseReaction = false;

      // Check each card in hand
      for (const handCard of state.hand) {
        // Check each position (only intermediate positions on the field)
        for (let pos = 1; pos < state.field.length; pos++) {
          const leftCard = state.field[pos - 1];
          const rightCard = state.field[pos];

          // Check if all 3 cards have the same rank or the same suit
          const sameRank =
            leftCard.rank === handCard.rank && handCard.rank === rightCard.rank;

          const sameSuit =
            leftCard.suit === handCard.suit && handCard.suit === rightCard.suit;

          if (sameRank || sameSuit) {
            canCauseReaction = true;
            break; // Sufficient if at least one reaction is possible
          }
        }
        if (canCauseReaction) break;
      }

      // If no card can cause a reaction, it's a loss
      if (!canCauseReaction) {
        return {
          status: "LOSE",
          reason: "Field is full and no reactions are possible.",
        };
      }
    }

    return { status: "ONGOING" };
  },
};

export type CatalystReactionDefinition = typeof catalystReactionGameDefinition;
