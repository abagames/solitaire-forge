export type Suit = "SPADE" | "HEART" | "DIAMOND" | "CLUB";
export type Rank =
  | "A"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "10"
  | "J"
  | "Q"
  | "K";

export interface Card {
  suit: Suit;
  rank: Rank;
  id: string; // Unique ID for each card instance
}

/**
 * Base interface for the state of any game.
 * Specific games will extend this.
 */
export interface BaseGameState {
  // Common properties might go here in the future
  // We add an internal counter for card IDs for convenience
  _cardIdCounter: number;
}

/**
 * Base interface for any action a player can take.
 * Specific games will define concrete action types.
 */
export interface BaseAction {
  type: string;
  payload?: any;
}

/**
 * Defines the core logic and rules for a specific card game.
 */
export interface GameDefinition<
  State extends BaseGameState,
  Act extends BaseAction
> {
  gameId: string;
  gameName: string;
  description?: string;

  /**
   * Generates the initial state for a new game.
   * @param seed Optional seed for deterministic random number generation (e.g., for shuffling).
   * @returns The starting game state.
   */
  setupGame: (seed?: string) => State;

  /**
   * Determines all valid actions a player can take in the given state.
   * @param state The current game state.
   * @returns An array of valid actions.
   */
  getAvailableActions: (state: State) => Act[];

  /**
   * Applies a given action to the current state and returns the resulting state.
   * This function should also perform validation to ensure the action is legal in the current state.
   * It should return a new state object, leaving the original state unmodified.
   * @param state The current game state.
   * @param action The action to apply.
   * @returns The new game state after applying the action.
   */
  applyAction: (state: State, action: Act) => State;

  /**
   * Checks if the game has ended (win or lose) or is still ongoing.
   * @param state The current game state.
   * @param history Optional list of past actions (can be used for loop detection, etc.).
   * @returns An object indicating the game status ('WIN', 'LOSE', 'ONGOING') and an optional reason for losing.
   */
  checkGameEnd: (
    state: State,
    history?: Act[]
  ) => { status: "WIN" | "LOSE" | "ONGOING"; reason?: string };

  // Optional: Game-specific helper functions or configuration could be added.
  // e.g., getCardValue?: (card: Card) => number;

  // Optional: A basic AI strategy for this game
  basicAI?: PlayerAI<State, Act>;
}

// --- Player AI Interface ---

/**
 * Interface for an AI that can play a game defined by a GameDefinition.
 */
export interface PlayerAI<State extends BaseGameState, Act extends BaseAction> {
  /**
   * Given the current game state, a list of available actions, and optionally the game history,
   * choose the next action to take.
   * @param state The current game state.
   * @param availableActions An array of valid actions.
   * @param history Optional array of past actions taken in the game.
   * @param actionSeed Seed specifically for *this* action choice, derived from the main simulation seed.
   * @returns The chosen action.
   */
  chooseAction: (
    state: State,
    availableActions: Act[],
    history?: Act[],
    actionSeed?: string
  ) => Act;
}
