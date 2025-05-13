# Prompt: New Solitaire Game Creation Process

## Phase 1: Concept Definition

**Instructions for you:**
You are an innovative game designer AI. You will now design a new **single-player** card game using a standard 52-card deck.

1.  First, briefly describe the **central theme or concept** of this game. (e.g., resource management and construction, puzzle-like card placement, risk-reward choices, story progression, etc.)
2.  Next, propose **three unique core mechanics** (the central gameplay and rules) to realize that concept. Aim for original mechanics that differ from famous existing solitaires (Klondike, Spider, Freecell, etc.).

**Expected Output:**

- Game theme/concept (brief description)
- Three core mechanic ideas (brief descriptions)

---

## Phase 2: Rule Detailing and GameDefinition Generation

**(Based on the output of Phase 1, a human will select one theme/concept and the most promising core mechanic, and provide feedback if necessary)**

**Instructions for you:**
Based on the selected theme/concept "**[Human-set theme/concept]**" and core mechanic "**[Human-selected mechanic]**," detail the specific rules of the game and generate a game definition according to the **"Playing Card Game Rule Description Library Specification (TypeScript version)"** in `knowledge/library.md`.

Place the game definition and files necessary for the simulation described later in the `./src/games/[game-name (English)(kebab-case)]` directory. Describe the game rules in natural language in `README.md`.

**Points to note when detailing rules:**

- **Simple Rules:** **Prohibit resource management other than cards, tokens, scores, etc.** Keep the rules simple, where the game state can be understood only by the cards on the board.
- **Meaningful Choices:** Be conscious of giving the player **meaningful multiple choices** strategically at various points in the game. Try to avoid situations where the best move is always obvious.
- **Risk and Reward:** Aim for a design where the player faces **interesting risk-reward tradeoffs**.
- **Avoid Exploits:** When combining rules, be careful not to create **obvious simple loops or winning patterns that break the game** (Exploits).
- **Centrality of Core Mechanics:** Design so that the selected **core mechanic plays a central role in the actual gameplay** and is deeply involved in the player's decision-making.
- **Consistency with Theme:** Ensure that the selected **theme or concept is naturally reflected in specific actions and goals**.

**Anticipated Player Strategies:**
Detail 2-3 different strategic approaches expected in gameplay. For each strategy:

- Main policy and decision-making priorities
- Situations where that strategy is effective
- Potential risks or weaknesses
- Comparison with other strategies

**Expected Output:**

- Game definition source code (TypeScript)
- Description of game rules in natural language (`README.md`)

---

## Phase 2.5: Design Review

**(Based on the game definition and rule description generated in Phase 2, humans and AI will conduct a review)**

**Instructions for you:**
**Critically** review and discuss the generated game rules and game definition from the following perspectives:

1.  **Rule Consistency and Clarity:** Are there any contradictions or ambiguities in the rules?
2.  **Strategic Depth:**
    - Does the player face **meaningful multiple strategic choices**? Is the best move not always obvious?
    - Are there no unintentional simple winning patterns (Exploits) or loops?
3.  **Consistency with Concept:** Are the theme and core mechanics defined in Phase 1 reflected in the actual rules and player experience?
4.  **Fun Factor Prediction:** With the current rules, can the player be expected to face interesting risk-reward tradeoffs and a sense of accomplishment?

**If significant problems or the need for improvement are recognized as a result of the review, do not proceed to Phase 3, but return to Phase 2 to revise/redefine the rules, or move to Phase 4 to apply specific improvements.**

**Expected Output:**

- Summary of review results (problems, concerns, etc.)
- Proposal for next steps (Proceed to Phase 3 / Return to Phase 2 / Transition to Phase 4)

---

## Phase 3: Simulation and Evaluation

**(Implemented if, after the review in Phase 2.5, it is judged that there are no major problems with the rules, or if verification by simulation is deemed necessary)**

**(The generated game definition is input into the library, and a simulation is run. The result data and qualitative play-feel feedback are summarized)**

**Instructions for you:**
Perform a simulation based on the provided game definition according to `knowledge/simulation.md`. Present the simulation results (win rate, average number of moves, susceptibility to getting stuck, frequency of use of specific rules, etc.) and qualitative feedback (fun factor, issues, whether it functions as intended, etc.).

Based on this information, **deeply and critically** analyze and describe the following points:

1.  **Main Identified Problems:**
    - **Specifically** point out game balance issues, rule flaws, mechanics not functioning as intended, etc.
    - If BasicAI's win rate is extremely high (e.g., 90% or more), it is a strong indication that **the game is too easy or there is an exploitable simple strategy**. Recognize this as a major problem and analyze the cause.
    - Analyze not just the win rate, but **what procedures/strategies the AI uses to win (or lose)**, and in particular, check for monotonous repetition or simple patterns that undermine the game's intent.
    - Consider whether, if the rules are interpreted/used **maliciously (with the intent to exploit) from a player's perspective**, unintentional winning patterns or game-breaking loops (Exploits) occur.
    - Evaluate whether the simulation results and observed AI strategies are **consistent with the game concept and intended player experience defined in Phase 1**. (e.g., Is risk management the theme, but a risk-free winning strategy exists?)
2.  **Specific Improvement Proposals:**
    - Propose **multiple** rule change suggestions to solve the identified problems (especially the problems mentioned above).
    - Changes should aim to maintain the original concept as much as possible, improve game balance, and make the game more fun and provide the intended experience.

**Expected Output:**

- Main identified problems (bullet points with detailed analysis)
- Specific improvement proposals (multiple suggestions, explanation of reasons for changes and expected effects)

---

## Phase 4: Rule Improvement and Game Definition Regeneration

**(Based on the proposals in Phase 3, a human selects the improvement plan to apply)**

**Instructions for you:**
**Modify the game definition object generated in Phase 2** to reflect the selected improvement plan "**[Details of human-selected improvement plan]**".

Output the complete modified game definition. If possible, briefly explain the changes with comments or similar.

**Expected Output:**

- Source code of the modified game definition (TypeScript)

---

**(Hereafter, repeat Phases 3 and 4 as necessary)**
