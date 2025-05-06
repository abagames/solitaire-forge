import { Card, Suit, Rank } from "../types.ts";
import { createRng } from "./rng.ts"; // Import RNG if shuffle needs seeding

// Add SUITS and RANKS constants
export const SUITS: Suit[] = ["SPADE", "HEART", "DIAMOND", "CLUB"];
export const RANKS: Rank[] = [
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

/**
 * Creates a standard 52-card deck.
 * @param initialCardId The starting ID for the cards.
 * @returns A new array of Card objects representing the deck.
 */
export const createDeck = (initialCardId: number = 0): Card[] => {
  let deck: Card[] = [];
  let cardIdCounter = initialCardId;
  for (const suit of SUITS) {
    for (const rank of RANKS) {
      deck.push({ suit, rank, id: `card-${cardIdCounter++}` });
    }
  }
  return deck;
};

/**
 * Shuffles an array of cards (or types extending Card) using the Fisher-Yates algorithm.
 * @param deck The array of cards to shuffle.
 * @param seed Optional seed for deterministic shuffling using a pseudo-random number generator.
 * @returns A new array containing the shuffled cards of the same type.
 */
export const shuffleDeck = <T extends Card>(deck: T[], seed?: string): T[] => {
  const rng = seed ? createRng(seed) : Math.random;
  const shuffled: T[] = [...deck]; // Create a copy to avoid modifying the original
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // Swap elements
  }
  return shuffled;
};

/**
 * Gets the numerical value of a card based on its rank for game logic.
 * A=1, 2-10=value, J=11, Q=12, K=13
 * @param card The card to evaluate.
 * @returns The numerical value of the card.
 */
export const getCardValue = (card: Card): number => {
  const rank = card.rank;
  if (rank === "A") return 1;
  if (rank === "K") return 13;
  if (rank === "Q") return 12;
  if (rank === "J") return 11;
  return parseInt(rank, 10); // For ranks '2' through '10'
};

/**
 * Gets the color of a card based on its suit.
 * @param card The card to evaluate.
 * @returns 'RED' or 'BLACK'.
 */
export const getCardColor = (card: Card): "RED" | "BLACK" => {
  return card.suit === "HEART" || card.suit === "DIAMOND" ? "RED" : "BLACK";
};
