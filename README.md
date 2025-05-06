# Solitaire Forge

Framework for designing, implementing, and evaluating new single-player card games (solitaire) using a standard 52-card deck.

## Overview

The core goal of this project is to facilitate the creation of novel solitaire experiences. It defines a structured game design process (see `knowledge/prompt.md`) that guides developers through:

1.  **Concept Definition:** Establishing the theme and core mechanics.
2.  **Rule Definition:** Detailing game rules and generating a TypeScript game definition based on `knowledge/library.md` specifications.
3.  **Design Review:** Critically evaluating the rules for consistency, strategic depth, and engagement.
4.  **Simulation & Evaluation:** Running simulations (based on `knowledge/simulation.md`) to analyze game balance, difficulty, and identify potential issues.
5.  **Refinement:** Iteratively improving the rules and game definition based on review and simulation feedback.

## Features

- **Structured Design Process:** A defined methodology for creating new solitaire games.
- **TypeScript Game Definition Library:** A specification (`knowledge/library.md`) for defining game logic in a reusable format.
- **Simulation Framework:** Tools and guidelines (`knowledge/simulation.md`) for automated game testing and analysis.
- **Example Game:** Includes "Cartographers Expedition" (`src/games/cartographers-expedition`) as a concrete implementation example built using this framework.

## Target Audience

This project is intended for developers and game designers interested in exploring new solitaire game ideas or creating their own unique single-player card games.
