# Cartographer's Expedition

## Overview

"Cartographer's Expedition" is a single-player card game where the goal is to explore unknown lands and discover important hidden landmarks. Players strategically combine cards from their hand with face-up cards on the field to reveal adjacent face-down cards, aiming to find all four hidden landmarks (Aces).

## Requirements

- A standard 52-card deck of playing cards.

## Setup

1.  Prepare the cards as follows:

    - Remove the four Aces (one from each suit).
    - Shuffle the remaining cards.

2.  Create a 5x5 grid:

    - Place the four Aces face-down in the four corners of the board.
    - Place one card face-up in the center square (this will be the starting point of the expedition).
      - **Note:** If the initial center card is a 10, Jack, Queen, or King, OR if it does not match any of the initial hand cards by suit or rank, that card is **returned to the deck and shuffled**, and cards are redrawn from the deck until a suitable card is found (if the deck runs out, the center will be empty).
    - Place shuffled cards face-down in the remaining 20 squares, excluding the center square and the four corners.

3.  Deal 4 cards as your hand.

4.  Set aside the remaining cards as the draw pile.

## Game Objective

The goal of the game is to turn all four hidden landmarks (Aces) face-up. However, if you run out of valid moves (including running out of cards in your hand or the draw pile), you lose the game.

## Gameplay

Players perform one of the following actions **if possible**:

### Action A: Reveal Adjacent Card

1.  **Choose a face-up starting card:** Select one face-up card `F` on the field.
2.  **Choose a hand card:**
    - If the starting card `F` is a **10, J, Q, or K**: Choose one card `H` from your hand that matches `F` in **rank**.
    - If the starting card `F` is **not a 10, J, Q, or K**: Choose one card `H` from your hand that matches `F` in **suit or rank**.
3.  **Choose a target face-down card:** Select one face-down card `T` that is adjacent (up, down, left, or right) to the chosen face-up card `F`.
4.  **Execute action:**
    - This can be executed if a combination satisfying conditions 1-3 exists.
    - Discard the hand card `H`.
    - Turn the target face-down card `T` **face-up**.
    - Draw one card from the draw pile and add it to your hand (if the draw pile is not empty).

### Action B: Exchange Hand Card (Optional)

- If there are cards remaining in the draw pile, the player can choose one card from their hand, discard it, and draw one card from the draw pile to add to their hand.
- This action can be taken optionally by the player, independent of performing "Action A".

(Note: Action A can only be executed if a combination satisfying the conditions exists. Action B can be executed at any time if the draw pile is not empty.)

## Game End Conditions

The game ends when one of the following conditions is met:

- **Win Condition**: All four landmarks (Aces) are turned face-up.
- **Lose Condition**:
  - **The draw pile runs out.** (Highest priority)
  - (Even if the draw pile remains) Neither a valid **Action A (Reveal)** nor **Action B (Exchange Hand Card)** can be performed.

## Strategy Tips (v1 Rules)

When a **10, J, Q, or K** is revealed, using that card as a starting point requires a hand card of the **same rank**, demanding strategic decisions.
Running out of cards in the draw pile results in a game over, so avoid wasteful hand exchanges and plan your card reveals strategically.

### Which Combination to Reveal?

- **Choosing the Starting Card (F):**
  - Which face-up card will you choose as your starting point? Using 10, J, Q, K cards requires special conditions (rank match), but are they strategically important?
  - Is there a face-down card you want to reveal (e.g., close to a corner) next to it?
  - Does it match a card in your hand? (Rank match for 10, JQK; suit or rank match for others)
- **Choosing the Hand Card (H):**
  - Which hand card will you use? If starting with a 10, J, Q, or K, you'll need a hand card of that rank.
  - Is the suit important (when aiming for a specific undiscovered Ace), or is the rank more critical?
  - Are there any hand cards you want to save for later?
- **Choosing the Target Card (T):**
  - Among the multiple face-down cards around the starting card (F), which one will you reveal?
  - Which one is closest to a landmark (Ace)?
  - **Consider the board state:** Judge based on all currently **face-up** cards. Based on the suits needed for undiscovered Aces or the visible cards around target `T`, which `T` seems most advantageous to choose?
  - Which reveal is more likely to lead to subsequent moves (e.g., becoming adjacent to other face-up cards)?

### Balancing Considerations

- **Information Gathering vs. Goal Achievement:** In the early game, revealing various locations to **understand the board state** might be effective, but your hand is finite. You need to switch to targeting landmarks (corners) at the right time.
- **Hand Management:** Carefully decide when to use powerful hand cards (those matching many starting points, or ranks matching 10, JQK) or whether to probe the board with lower-risk hand cards.
- **Utilizing Hand Exchange:** Strategically use hand exchange (Action B) when no reveal actions are possible or when seeking better hand cards. However, be mindful that the draw pile is limited, and **running out leads to defeat**.

## Hints and Tips

- The more face-up cards on the field, the more opportunities you have to utilize your hand.
- Always be aware of which Aces are still undiscovered and consider the value of hand cards with corresponding suits.
- When multiple options are available, think one or two steps ahead to choose the most advantageous move.
