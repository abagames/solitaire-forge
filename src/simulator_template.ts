import {
  GameDefinition,
  BaseGameState,
  BaseAction,
  Card,
  Suit,
  PlayerAI,
} from "./types.ts";
import { createRng } from "./utils/rng.ts";

// --- !!! TEMPLATE INSTRUCTIONS !!! ---
// 1. RENAME this file to `src/games/[your-game-name]/simulator.ts` (use kebab-case for game name)
// 2. UNCOMMENT and EDIT the following import lines for your game:
/*
import { YourGameDefinition } from "./games/[your-game-name]/definition.ts"; // Or index.ts if definition is there
import { YourGameBasicAI } from "./games/[your-game-name]/ai.ts"; // Assuming AI is in ai.ts
*/
// 3. EDIT the `main` function below:
//    - Replace `YourGameDefinition` and `YourGameBasicAI` placeholders in `runSimulations` calls.
//    - Update `simulationSeedPrefix` with your game name (kebab-case recommended).
//    - Update AI names (the second argument) in `printSummary` calls if desired.
// --- END TEMPLATE INSTRUCTIONS ---

/*
// Import the new game and AI
import { Definition } from "./games/[your-game-name-kebab-case]/definition.ts";
// Import the AI from its new file
import { Ai } from "./games/[your-game-name-kebab-case]/ai.ts";
*/
// Remove placeholder declarations once imports are added
declare const YourGameDefinition: GameDefinition<any, any>;
declare const YourGameBasicAI: PlayerAI<any, any>;

// --- Random AI Implementation (Generic, should work) ---
const RandomAI: PlayerAI<any, any> = {
  chooseAction: <State extends BaseGameState, Act extends BaseAction>(
    state: State,
    availableActions: Act[],
    history?: Act[],
    actionSeed?: string
  ): Act => {
    if (availableActions.length === 0) {
      throw new Error(
        "RandomAI cannot choose an action: No actions available."
      );
    }
    const rng = actionSeed ? createRng(actionSeed) : Math.random;
    const randomIndex = Math.floor(rng() * availableActions.length);
    return availableActions[randomIndex];
  },
};

// --- Basic AI  ---

// --- Simulation Runner ---

interface GameResult<State extends BaseGameState, Act extends BaseAction> {
  status: "WIN" | "LOSE";
  reason?: string;
  moveCount: number;
  finalState: State;
  history: Act[];
}

// --- Simulation Summary ---

interface MovesStats {
  min: number;
  max: number;
  average: number;
}

interface SimulationSummary {
  totalGames: number;
  wins: number;
  losses: number;
  winRate: number; // Percentage (0-100)
  lossRateByReason: { [reason: string]: { count: number; rate: number } };
  movesOverall: MovesStats | null; // Null if no games finished
  movesWins: MovesStats | null; // Null if no wins
  movesLosses: MovesStats | null; // Null if no losses
  // TODO: Add AI action usage frequency if needed later
}

/**
 * Calculates move statistics (min, max, average) from a list of move counts.
 */
const calculateMovesStats = (moveCounts: number[]): MovesStats | null => {
  if (moveCounts.length === 0) return null;
  const sum = moveCounts.reduce((a, b) => a + b, 0);
  const min = Math.min(...moveCounts);
  const max = Math.max(...moveCounts);
  const average = sum / moveCounts.length;
  return { min, max, average };
};

/**
 * Runs a single playthrough of a game using a given AI.
 * @param gameDefinition The definition of the game to play.
 * @param ai The AI to use for playing the game.
 * @param simulationSeed Optional seed for deterministic game setup and AI decisions. Each AI action will use a seed derived from this.
 * @param maxMoves Maximum number of moves allowed before declaring a loss (prevents infinite loops).
 * @returns The result of the game playthrough.
 */
const runSingleGame = <State extends BaseGameState, Act extends BaseAction>(
  gameDefinition: GameDefinition<State, Act>,
  ai: PlayerAI<State, Act>,
  simulationSeed?: string,
  maxMoves: number = 1000
): GameResult<State, Act> => {
  let state: State;
  try {
    state = gameDefinition.setupGame(simulationSeed);
  } catch (error) {
    console.error(`DEBUG: ERROR in setupGame. Seed: ${simulationSeed}`);
    throw new Error(
      `setupGame failed: ${error instanceof Error ? error.message : error}`
    );
  }

  const history: Act[] = [];
  let moveCount = 0;

  while (moveCount < maxMoves) {
    let endCheck;
    try {
      endCheck = gameDefinition.checkGameEnd(state, history);
      if (endCheck.status !== "ONGOING") {
        return {
          status: endCheck.status,
          reason: endCheck.reason,
          moveCount,
          finalState: state,
          history,
        };
      }
    } catch (error) {
      console.error(
        `DEBUG: ERROR in checkGameEnd. Move ${moveCount}, Seed: ${simulationSeed}`
      );
      throw error;
    }

    let availableActions: Act[] = [];
    try {
      availableActions = gameDefinition.getAvailableActions(state);
    } catch (error) {
      console.error(
        `DEBUG: ERROR in getAvailableActions. Move ${moveCount}, Seed: ${simulationSeed}`
      );
      throw error;
    }

    if (availableActions.length === 0) {
      console.warn(
        `DEBUG: No actions available, forcing LOSS. Move ${moveCount}, Seed: ${simulationSeed}`
      );
      return {
        status: "LOSE",
        reason: "STUCK - No available actions",
        moveCount,
        finalState: state,
        history,
      };
    }

    let chosenAction: Act;
    try {
      const actionSeed = simulationSeed
        ? `${simulationSeed}-turn-${moveCount}`
        : undefined;
      chosenAction = ai.chooseAction(
        state,
        availableActions,
        history,
        actionSeed
      );
      if (
        !availableActions.some(
          (a) =>
            a.type === chosenAction.type &&
            JSON.stringify(a.payload) === JSON.stringify(chosenAction.payload)
        )
      ) {
        console.error("AI chose an action not in the available list!", {
          chosenAction,
          availableActions,
        });
        throw new Error("AI chose an invalid action.");
      }
    } catch (error) {
      console.error(
        `DEBUG: ERROR in ai.chooseAction. Move ${moveCount}, Seed: ${simulationSeed}`
      );
      throw error;
    }

    history.push(chosenAction);

    try {
      state = gameDefinition.applyAction(state, chosenAction);
    } catch (error) {
      console.error(
        `DEBUG: ERROR in applyAction. Move ${moveCount}, Action: ${JSON.stringify(
          chosenAction
        )}, Seed: ${simulationSeed}`
      );
      throw error;
    }

    moveCount++;
  }

  console.warn(
    `DEBUG: Max moves (${maxMoves}) reached. Seed: ${simulationSeed}`
  );
  return {
    status: "LOSE",
    reason: `MAX_MOVES_REACHED (${maxMoves})`,
    moveCount,
    finalState: state,
    history,
  };
};

// --- Main Simulation Function (runSimulations) ---
// Keep this function generic as well
const runSimulations = <State extends BaseGameState, Act extends BaseAction>(
  gameDefinition: GameDefinition<State, Act>,
  ai: PlayerAI<State, Act>,
  numTrials: number,
  baseSeed?: string, // Seed for the entire batch of trials
  maxMoves: number = 1000 // Default max moves, aligned with single game
): SimulationSummary => {
  const results: GameResult<State, Act>[] = [];
  const startTime = Date.now();
  console.log(
    `Running ${numTrials} simulations with AI: ${
      ai.constructor.name || "Unknown AI"
    } using base seed: ${baseSeed || "random"}`
  );

  for (let i = 0; i < numTrials; i++) {
    const trialSeed = baseSeed ? `${baseSeed}-trial-${i}` : undefined;
    if (i > 0 && i % (numTrials / 10 || 1) === 0) {
      console.log(
        `...completed ${i} simulations (${((i / numTrials) * 100).toFixed(0)}%)`
      );
    }
    try {
      const result = runSingleGame(gameDefinition, ai, trialSeed, maxMoves);
      results.push(result);
    } catch (error) {
      console.error(
        `Error in simulation trial ${i} with seed ${trialSeed}:`,
        error
      );
      results.push({
        status: "LOSE",
        reason: "SIMULATION_ERROR",
        moveCount: -1,
        finalState: {} as State,
        history: [],
      });
    }
  }
  console.log(`...completed ${numTrials} simulations (100%)`);

  // Aggregate results into SimulationSummary
  const wins = results.filter((r) => r.status === "WIN").length;
  const losses = results.filter((r) => r.status === "LOSE").length;
  const totalGames = results.length;

  const lossReasons: { [reason: string]: number } = {};
  results
    .filter((r) => r.status === "LOSE" && r.reason)
    .forEach((r) => {
      lossReasons[r.reason!] = (lossReasons[r.reason!] || 0) + 1;
    });

  const lossRateByReason: {
    [reason: string]: { count: number; rate: number };
  } = {};
  for (const reason in lossReasons) {
    lossRateByReason[reason] = {
      count: lossReasons[reason],
      rate: totalGames > 0 ? (lossReasons[reason] / totalGames) * 100 : 0,
    };
  }

  const allMoveCounts = results.map((r) => r.moveCount).filter((mc) => mc >= 0); // Filter out error counts
  const winMoveCounts = results
    .filter((r) => r.status === "WIN")
    .map((r) => r.moveCount);
  const lossMoveCounts = results
    .filter((r) => r.status === "LOSE")
    .map((r) => r.moveCount)
    .filter((mc) => mc >= 0); // Filter out error counts

  const summary: SimulationSummary = {
    totalGames,
    wins,
    losses,
    winRate: totalGames > 0 ? (wins / totalGames) * 100 : 0,
    lossRateByReason,
    movesOverall: calculateMovesStats(allMoveCounts),
    movesWins: calculateMovesStats(winMoveCounts),
    movesLosses: calculateMovesStats(lossMoveCounts),
  };

  return summary;
};

// --- Main Execution ---

const NUM_TRIALS = 1000;
const MAX_MOVES_PER_GAME = 500; // Adjust if your game needs more/less moves
// 4. EDIT this prefix for your simulation seeds:
const simulationSeedPrefix = "[your-game-name]"; // e.g., "cartographers-expedition"
// Add versioning (e.g., -v1) and increment when game/AI logic changes significantly
const simulationSeedRandom = `${simulationSeedPrefix}-rand-v1`;
const simulationSeedBasic = `${simulationSeedPrefix}-basic-v1`;

async function main() {
  // Ensure Definition and Ai are imported and placeholders are replaced before running
  /* // UNCOMMENT AND EDIT SECTION BELOW AFTER IMPORTS
  console.log(
    `Starting simulations for ${YourGameDefinition.gameName}...` // Uses gameName from definition
  );
  console.log(`Number of trials per AI: ${NUM_TRIALS}`);
  console.log(`Max moves per game: ${MAX_MOVES_PER_GAME}`);
  console.log("-----------------------------------------");

  // --- UNCOMMENTED: Run simulations for Random AI ---
  console.log("\n[Random AI]");
  const randomSummary = runSimulations(
    YourGameDefinition, // Replace placeholder
    RandomAI,
    NUM_TRIALS,
    simulationSeedRandom,
    MAX_MOVES_PER_GAME
  );
  printSummary(randomSummary, "RandomAI");
  console.log("-----------------------------------------");
  // --- END UNCOMMENT ---

  // Run simulations for Basic AI
  // --- Adjust the AI name displayed in the console if needed ---
  console.log('\n[Basic AI]'); // Adjust AI description if needed
  const basicSummary = runSimulations(
    YourGameDefinition, // Replace placeholder
    YourGameBasicAI, // Replace placeholder
    NUM_TRIALS,
    simulationSeedBasic,
    MAX_MOVES_PER_GAME
  );
  // --- Replace placeholder for AI name in summary output ---
  printSummary(basicSummary, "[Your Basic AI Name]"); // Replace placeholder, e.g., "SimpleStrategyAI"

  console.log("-----------------------------------------");
  console.log("Simulations complete.");
  */
  // END UNCOMMENT AND EDIT SECTION
}

// --- Output Formatting (Generic) ---
const printSummary = (summary: SimulationSummary, aiName: string) => {
  console.log(`\n--- ${aiName} Simulation Summary ---`);
  console.log(`Total Games: ${summary.totalGames}`);
  console.log(`Wins: ${summary.wins} (${summary.winRate.toFixed(2)}%)`);
  console.log(`Losses: ${summary.losses}`);
  if (summary.losses > 0) {
    console.log(`Loss Breakdown:`);
    Object.entries(summary.lossRateByReason).forEach(([reason, data]) => {
      console.log(
        `  - ${reason}: ${data.count} (${data.rate.toFixed(2)}% of total)`
      );
    });
  }

  const formatStats = (stats: MovesStats | null) =>
    stats
      ? `Avg: ${stats.average.toFixed(2)}, Min: ${stats.min}, Max: ${stats.max}`
      : "N/A";

  console.log(`Move Counts (Overall): ${formatStats(summary.movesOverall)}`);
  console.log(`Move Counts (Wins):    ${formatStats(summary.movesWins)}`);
  console.log(`Move Counts (Losses):  ${formatStats(summary.movesLosses)}`);
};

main().catch((error) => {
  console.error("Simulation failed:", error);
  process.exit(1);
});
