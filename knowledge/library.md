# Playing Card Game Rule Description Library Specification (TypeScript Version)

## 1. Introduction

### 1.1. Purpose

This library provides a specification for declaratively and rigorously describing the rules of various card games, primarily focusing on single-player card games (solitaire, etc.). It utilizes TypeScript's type system to enhance rule consistency. The goal is for LLMs (Large Language Models) to generate definitions for new games based on this specification, enabling those rules to be executed in a way that allows for simulation, automated testing, and AI play.

### 1.2. Design Philosophy

- **Type Safety:** Game rules are described in source code using TypeScript.
- **Rigor:** Definitions of rules and states eliminate ambiguity, allowing for unique interpretation and execution by the type system and library.
- **UI Separation:** Focuses purely on game logic and does not include UI-related information.

## 2. Basic Type Definitions

The core TypeScript types for game definition are shown below.

### 2.1. Card Representation

Represents standard playing cards.

```typescript
type Suit = "SPADE" | "HEART" | "DIAMOND" | "CLUB";
type Rank =
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

interface Card {
  suit: Suit;
  rank: Rank;
  id: string; // Unique ID to distinguish each card instance
}
```

### 2.2. Game State (`GameState`)

Represents the state of the game at a specific moment. Each game will have its own specific properties.

```typescript
interface GameState {
  // Example: State required for a simple matching game
  deck: Card[]; // Draw pile
  discardPile: Card[]; // Often, only the top card of the discard pile is relevant
  hand: Card[]; // Player's hand
  // Other games might add states like multiple tableau piles, scores, etc.
}
```

### 2.3. Action (`Action`)

Represents an action the player can perform. Includes the type of action and any associated information (e.g., which card to move).

```typescript
interface Action {
  type: string; // Identifier for the action type (e.g., 'DRAW_CARD', 'PLAY_FROM_HAND')
  payload?: any; // Additional information needed for the action (e.g., { cardId: '...' })
}
```

### 2.4. Game Definition (`GameDefinition`)

Defines the overall rules and logic of the game.

```typescript
interface GameDefinition<State extends GameState, Act extends Action> {
  /**
   * Generates the initial state of the game.
   * @param seed Optional seed for random number generation
   * @returns Initial state object
   */
  setupGame: (seed?: string) => State;

  /**
   * Lists all actions the player can perform in a given state.
   * @param state The current game state
   * @returns An array of executable actions
   */
  getAvailableActions: (state: State) => Act[];

  /**
   * Applies a specific action to the current state and returns the new state.
   * Rule validation is also performed here. Invalid actions are expected to either
   * throw an error or return the state unchanged.
   * @param state The current game state
   * @param action The action to apply
   * @returns The new game state
   */
  applyAction: (state: State, action: Act) => State;

  /**
   * Determines if the game has ended and its result (win/lose/ongoing).
   * @param state The current game state
   * @param history Optional history of past actions (can be used for loop detection, etc.)
   * @returns The game's end status ('WIN', 'LOSE', 'ONGOING') and an optional reason for loss.
   */
  checkGameEnd: (
    state: State,
    history?: Act[]
  ) => { status: "WIN" | "LOSE" | "ONGOING"; reason?: string };

  // Optional: Game-specific helper functions or settings
  // Example: getCardValue(card: Card): number;
}
```
