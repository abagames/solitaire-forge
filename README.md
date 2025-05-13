# Solitaire Forge

Framework for designing, implementing, and evaluating new single-player card games (solitaire) using a standard 52-card deck.

## Overview

The core goal of this project is to facilitate the creation of novel solitaire experiences. It defines a structured game design process (see [`knowledge/prompt.md`](./knowledge/prompt.md)) that guides developers through:

1.  **Concept Definition:** Establishing the theme and core mechanics.
2.  **Rule Definition:** Detailing game rules and generating a TypeScript game definition based on [`knowledge/library.md`](./knowledge/library.md) specifications.
3.  **Design Review:** Critically evaluating the rules for consistency, strategic depth, and engagement.
4.  **Simulation & Evaluation:** Running simulations (based on [`knowledge/simulation.md`](./knowledge/simulation.md)) to analyze game balance, difficulty, and identify potential issues.
5.  **Refinement:** Iteratively improving the rules and game definition based on review and simulation feedback.

## Features

- **Structured Design Process:** A defined methodology for creating new solitaire games.
- **TypeScript Game Definition Library:** A specification ([`knowledge/library.md`](./knowledge/library.md)) for defining game logic in a reusable format.
- **Simulation Framework:** Tools and guidelines ([`knowledge/simulation.md`](./knowledge/simulation.md)) for automated game testing and analysis.
- **Example Game:** Includes "Cartographers Expedition" ([`src/games/cartographers-expedition`](./src/games/cartographers-expedition)) as a concrete implementation example built using this framework.

## Included Games

### Catalyst Reaction

- **Description:** An alchemist-themed solitaire game where the goal is to clear all cards from the field. Players play cards from their hand onto the field. If a played card creates a 3-card set (same rank or same suit) with its new neighbors, those three cards are removed. Automatic reactions can also occur if three adjacent cards on the field form a set.
- **Rules:** [./src/games/catalyst-reaction/README.md](./src/games/catalyst-reaction/README.md)

### Cartographer's Expedition

- **Description:** A solitaire game where the player explores a 5x5 grid of cards to find four hidden aces (landmarks). Players use cards from their hand that match the suit or rank of face-up cards on the field to reveal adjacent face-down cards.
- **Rules:** [./src/games/cartographers-expedition/README.md](./src/games/cartographers-expedition/README.md)
