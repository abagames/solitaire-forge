import { PlayerAI, BaseGameState, BaseAction, Card } from "../../types.ts";
import {
  CatalystReactionState,
  CatalystReactionAction,
  catalystReactionGameDefinition,
} from "./definition.ts";

// Helper function to check if a specific PlayCatalyst action causes a reaction
function doesActionReact(
  state: CatalystReactionState,
  action: CatalystReactionAction
): boolean {
  if (action.type !== "PLAY_CATALYST") return false;

  const { catalystCardId, position } = action.payload;
  const catalystCard = state.hand.find(
    (card: Card) => card.id === catalystCardId
  );

  if (!catalystCard) return false; // Should not happen if action is valid
  if (position < 1 || position >= state.field.length) return false; // Invalid position

  const leftCard = state.field[position - 1];
  const rightCard = state.field[position];

  const matchLeft =
    leftCard &&
    (leftCard.rank === catalystCard.rank ||
      leftCard.suit === catalystCard.suit);
  const matchRight =
    rightCard &&
    (rightCard.rank === catalystCard.rank ||
      rightCard.suit === catalystCard.suit);

  return matchLeft && matchRight; // v5 rule: both must match
}

export const CatalystReactionBasicAI: PlayerAI<
  CatalystReactionState,
  CatalystReactionAction
> = {
  chooseAction: (
    state: CatalystReactionState,
    availableActions: CatalystReactionAction[],
    history?: CatalystReactionAction[],
    actionSeed?: string
  ): CatalystReactionAction => {
    if (availableActions.length === 0) {
      throw new Error("BasicAI called with no available actions!");
    }

    // Seeded random function
    const randomFn = actionSeed
      ? mulberry32(cyrb128(actionSeed)[1])
      : Math.random;

    // 1. Prioritize reacting actions
    const reactingActions = availableActions.filter((action) => {
      if (action.type === "PLAY_CATALYST") {
        return doesActionReact(state, action);
      }
      return false;
    });

    if (reactingActions.length > 0) {
      const randomIndex = Math.floor(randomFn() * reactingActions.length);
      return reactingActions[randomIndex];
    }

    // 2. If no reacting actions, try strategic non-reacting placement
    const nonReactingActions = availableActions.filter((action) => {
      if (action.type === "PLAY_CATALYST") {
        // Filter out actions that *would* react (should be none based on above)
        // This filter step might be redundant but ensures correctness
        return !doesActionReact(state, action);
      }
      return false; // Only consider PLAY_CATALYST
    });

    const strategicPlacements: CatalystReactionAction[] = [];
    for (const action of nonReactingActions) {
      // Guaranteed to be PLAY_CATALYST here
      const { catalystCardId, position } = action.payload;
      const catalystCard = state.hand.find(
        (card: Card) => card.id === catalystCardId
      );
      if (!catalystCard) continue; // Should not happen

      const leftCard = state.field[position - 1];
      const rightCard = state.field[position];

      // Check if left or right neighbor has the same RANK
      const strategicLeft = leftCard && leftCard.rank === catalystCard.rank;
      const strategicRight = rightCard && rightCard.rank === catalystCard.rank;

      if (strategicLeft || strategicRight) {
        strategicPlacements.push(action);
      }
    }

    if (strategicPlacements.length > 0) {
      // If strategic placements found, choose one randomly
      const randomIndex = Math.floor(randomFn() * strategicPlacements.length);
      return strategicPlacements[randomIndex];
    }

    // 3. If no reacting actions and no strategic placements, choose any non-reacting action randomly
    if (nonReactingActions.length > 0) {
      const randomIndex = Math.floor(randomFn() * nonReactingActions.length);
      return nonReactingActions[randomIndex];
    }

    // 4. Fallback (should ideally not be reached if availableActions > 0 initially)
    // If only DRAW_CARD was available (which is impossible in v5+ rules)
    // Or if something went wrong filtering actions
    console.warn(
      "BasicAI: No reacting, strategic, or non-reacting moves found, falling back to random from original list."
    );
    const randomIndex = Math.floor(randomFn() * availableActions.length);
    return availableActions[randomIndex];
  },
};

// --- Simple PRNG needed for seeded random ---
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
