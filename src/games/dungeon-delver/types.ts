import {
  BaseGameState,
  BaseAction,
  Card as BaseCard,
  Suit,
  Rank,
} from "../../types.js";

// Define a game-specific card type extending the base card
export interface GameCard extends BaseCard {
  faceUp?: boolean;
}

export interface Layout {
  name: string;
  type: "deck" | "hand" | "row" | "pile";
  faceUp?: boolean; // Layout全体が表向きか (主にhand用)
  faceDown?: boolean; // Layout全体が裏向きか (主にdeck用)
  x: number;
  y: number;
  maxCards?: number;
  cards: GameCard[]; // Use the new GameCard type
  metadata?: Record<string, any>;
}

export interface GameState extends BaseGameState {
  _cardIdCounter: number; // BaseGameStateから必須プロパティを継承
  layouts: Record<string, Layout>;
  outcome?: string;
  message?: string;
}

export interface ActionParams {
  [key: string]: string | number | boolean | undefined;
}

// BaseActionを継承する共通部分
interface DungeonDelverBaseAction extends BaseAction {
  layoutId?: string; // General layout context (e.g., where cost/challenge comes from, or target)
  cardId?: string; // Primary card involved (cost/challenge card)
  targetLayoutId?: string; // Layout of the target card
  targetCardId?: string; // ID of the target card
  params?: ActionParams;
}

// Specific action types using discriminated union
export type GameAction =
  | (DungeonDelverBaseAction & {
      type: "clearLevel";
      layoutId: string; // Mandatory: Which level was cleared
      cardId?: never; // Not used
      targetLayoutId?: never; // Not used
      targetCardId?: never; // Not used
    })
  | (DungeonDelverBaseAction & {
      type: "explore"; // Renamed from revealCard
      layoutId: "hand"; // Cost always comes from hand
      cardId: string; // Mandatory: The card used as cost
      targetLayoutId: string; // Mandatory: Layout of the target
      targetCardId: string; // Mandatory: The face-down card to reveal
    })
  | (DungeonDelverBaseAction & {
      type: "subdue"; // Renamed from exploreLevel
      layoutId: "hand"; // Challenge card always comes from hand
      cardId: string; // Mandatory: The card used for the challenge
      targetLayoutId: string; // Mandatory: Layout of the target
      targetCardId: string; // Mandatory: The face-up card to subdue
    });
