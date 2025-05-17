# Solitaire Forge

English | [日本語](./README_ja.md)

Framework for designing, implementing, and evaluating new single-player card games (solitaire) using a standard 52-card deck.

## Overview

The core goal of this project is to facilitate the creation of novel solitaire experiences. It defines a structured game design process (see [`knowledge/new-solitaire-creation-steps.md`](./knowledge/new-solitaire-creation-steps.md)) that guides developers through:

1.  **Concept Definition:** Establishing the theme and core mechanics.
2.  **Rule Definition:** Detailing game rules and generating a TypeScript game definition based on [`knowledge/library.md`](./knowledge/library.md) specifications.
3.  **Design Review:** Critically evaluating the rules for consistency, strategic depth, and engagement.
4.  **Simulation & Evaluation:** Running simulations (based on [`knowledge/simulation.md`](./knowledge/simulation.md)) to analyze game balance, difficulty, and identify potential issues.
5.  **Refinement:** Iteratively improving the rules and game definition based on review and simulation feedback.

The process also includes dedicated guides for implementation and testing:

1.  **Rule Implementation:** Implementing the game logic using the guidance provided in [`knowledge/crisp-game-lib-card-game-guide.md`](./knowledge/crisp-game-lib-card-game-guide.md).
2.  **Testing:** Thoroughly testing the game implementation as outlined in [`knowledge/crisp-game-lib-testing-guide.md`](./knowledge/crisp-game-lib-testing-guide.md).

## Included Games

### Catalyst Reaction

- **Description:** An alchemist-themed solitaire game where the goal is to clear all cards from the field. Players play cards from their hand onto the field. If a played card creates a 3-card set (same rank or same suit) with its new neighbors, those three cards are removed. Automatic reactions can also occur if three adjacent cards on the field form a set.
- **Rules:** [./src/games/catalyst-reaction/README.md](./src/games/catalyst-reaction/README.md)

https://github.com/user-attachments/assets/5ff430d3-8e96-4997-8501-dd4f39cc4998

### Cartographer's Expedition

- **Description:** A solitaire game where the player explores a 5x5 grid of cards to find four hidden aces (landmarks). Players use cards from their hand that match the suit or rank of face-up cards on the field to reveal adjacent face-down cards.
- **Rules:** [./src/games/cartographers-expedition/README.md](./src/games/cartographers-expedition/README.md)

https://github.com/user-attachments/assets/1979a037-8aca-46ff-963c-6b651d8b2c2f
