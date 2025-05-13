# Catalyst Reaction

**Theme:** Alchemist's Workshop
**Core Mechanics:** Catalyst Reaction - v10 Rules / 3-Card Hand / Field 8 (Init Replenish) / 3-Match Auto-React

## Game Objective

Remove (completely "transmute") all cards present on the Field.

## Preparation

1.  Shuffle a standard 52-card deck to form the Deck.
2.  Draw **8 cards** from the Deck face-up and arrange them in a single row on the Field.
3.  **[Initial Auto-Reaction & Replenish Loop]**
    a. Perform an auto-reaction check (v9: 3-card match rule) on the current cards on the Field.
    b. If cards are removed from the Field due to a reaction:
    i. Draw cards from the Deck and **replenish the Field until it has 8 cards** (if the Deck runs out, replenishment may not be possible).
    ii. **Return to step 3a** and perform an auto-reaction check again on the replenished Field.
    c. If no auto-reactions occur, end this loop.
4.  Once the Field is stable (no more auto-reactions occur), draw 3 cards from the Deck to form your Hand.

## Play

On each turn, the player must perform the following "Play Catalyst" action (as long as they have cards in hand). The hand size is always a maximum of 3 cards.

1.  **Play Catalyst:**
    - Select 1 card from your hand to use as a catalyst and **specify a placement position on the Field**. Possible positions are between existing cards on the Field (index `1` to `number of cards on Field - 1`) **or** at the left end (index `0`) or right end (index `number of cards on Field`) of the Field.
    - **[Player Reaction Check]**
      - If the chosen catalyst card is placed in the specified position, determine if it reacts with **both** its left and right adjacent cards.
      - **Reaction Condition:** All three cards (left neighbor, catalyst card, right neighbor) are of the same rank **OR** all three cards are of the same suit.
      - **Note:** If placed at the left end (`0`) or right end (`number of cards on Field`) of the Field, only one adjacent card exists, so this player reaction condition cannot be met.
    - **[Action Execution]**
      - **If a player reaction occurs (only when placed between cards):**
        - Remove the catalyst (from hand), the left neighbor (from Field), and the right neighbor (from Field) – a total of 3 cards.
      - **If no player reaction occurs (when placed at an end, or placed between cards but conditions not met):**
        - Place the catalyst (from hand) onto the Field as a card in the specified position.
    - **[Auto-Reaction Check]** After the action is executed (cards are removed or placed), perform an auto-reaction check on the cards on the Field.
    - **[Hand Replenishment]** After all reactions (player reaction + auto-reactions) are complete, if the Deck has cards remaining, draw 1 card and add it to your hand.

## Auto-Reaction Check Details

This check is performed after the initial setup and after any player action changes the state of the Field.

1.  Scan the current row of cards on the Field from left to right.
2.  For the `i`-th card on the Field (1 <= `i` < `index of the last card on Field`), check if its left (`i-1`) and right (`i+1`) neighbors exist.
3.  If the three cards `[card(i-1), card(i), card(i+1)]` exist, check **either** of the following conditions:
    - All three cards are of the **same rank**.
    - **OR** all three cards are of the **same suit**.
4.  If the first `i` satisfying the above conditions is found:
    - Remove the three cards (`i-1`, `i`, `i+1`) from the Field.
    - Since the Field has changed, **return to step 1 and rescan from the beginning of the Field**.
5.  If the scan completes without finding any triplet satisfying the conditions, end the auto-reaction check.

## Game End

- **Victory:** When all cards on the Field have been removed.
- **Defeat:** If the player has no cards in hand at the start of their turn (as they cannot perform an action).

## Potential Strategies

- **Setup Focused:** Utilize player reactions to arrange the Field and aim for auto-reactions (3-card matches).
- **Strategic Placement:** Since auto-reactions are less likely, focus primarily on player reactions.
- **Hand Management:** Choose hand cards and placement positions that maximize the utility of player reactions.
