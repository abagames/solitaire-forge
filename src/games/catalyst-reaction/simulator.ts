import {
  GameDefinition,
  BaseGameState,
  BaseAction,
  // Card, // Optional: Uncomment if needed by Basic AI in this file
  // Suit, // Optional: Uncomment if needed by Basic AI in this file
  PlayerAI,
} from "../../types.ts"; // Adjusted path
import { createRng } from "../../utils/rng.ts"; // Adjusted path

// --- !!! TEMPLATE INSTRUCTIONS !!! ---
// 1. RENAME this file to `src/games/[your-game-name]/simulator.ts` (use kebab-case for game name)
// 2. UNCOMMENT and EDIT the following import lines for your game:
// /* // Already done for Catalyst Reaction below
import {
  catalystReactionGameDefinition,
  CatalystReactionState,
  CatalystReactionAction,
} from "./definition.ts"; // Or index.ts if definition is there
import { CatalystReactionBasicAI } from "./ai.ts"; // Assuming AI is in ai.ts
// */
// 3. EDIT the `main` function below:
//    - Replace `YourGameDefinition` and `YourGameBasicAI` placeholders in `runSimulations` calls. (DONE)
//    - Update `simulationSeedPrefix` with your game name (kebab-case recommended). (DONE)
//    - Update AI names (the second argument) in `printSummary` calls if desired. (DONE)
// --- END TEMPLATE INSTRUCTIONS ---

// Remove placeholder declarations once imports are added
// declare const YourGameDefinition: GameDefinition<any, any>; // Removed
// declare const YourGameBasicAI: PlayerAI<any, any>; // Removed

// --- Random AI Implementation (Generic) ---
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

// --- Simulation Runner Logic (Generic) ---
interface GameResult<State extends BaseGameState, Act extends BaseAction> {
  status: "WIN" | "LOSE";
  reason?: string;
  moveCount: number;
  finalState: State;
  history: Act[];
}

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
}

const calculateMovesStats = (moveCounts: number[]): MovesStats | null => {
  if (moveCounts.length === 0) return null;
  const sum = moveCounts.reduce((a, b) => a + b, 0);
  const min = Math.min(...moveCounts);
  const max = Math.max(...moveCounts);
  const average = sum / moveCounts.length;
  return { min, max, average };
};

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

const runSimulations = <State extends BaseGameState, Act extends BaseAction>(
  gameDefinition: GameDefinition<State, Act>,
  ai: PlayerAI<State, Act>,
  numTrials: number,
  baseSeed?: string,
  maxMoves: number = 1000
): SimulationSummary => {
  const results: GameResult<State, Act>[] = [];
  console.log(
    `Running ${numTrials} simulations with AI: ${
      (ai as any).name || ai.constructor?.name || "Unknown AI" // Try to get AI name
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

  const allMoveCounts = results.map((r) => r.moveCount).filter((mc) => mc >= 0);
  const winMoveCounts = results
    .filter((r) => r.status === "WIN")
    .map((r) => r.moveCount);
  const lossMoveCounts = results
    .filter((r) => r.status === "LOSE")
    .map((r) => r.moveCount)
    .filter((mc) => mc >= 0);

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
const simulationSeedPrefix = "catalyst-reaction"; // Set game name prefix
const simulationSeedRandom = `${simulationSeedPrefix}-rand-v1`;
const simulationSeedBasic = `${simulationSeedPrefix}-basic-v1`;

async function main() {
  console.log(
    `Starting simulations for ${catalystReactionGameDefinition.gameName}...` // Uses gameName from definition
  );
  console.log(`Number of trials per AI: ${NUM_TRIALS}`);
  console.log(`Max moves per game: ${MAX_MOVES_PER_GAME}`);
  console.log("-----------------------------------------");

  // --- Run simulations for Random AI ---
  console.log("\n[Random AI]");
  const randomSummary = runSimulations(
    catalystReactionGameDefinition, // Use imported definition
    RandomAI,
    NUM_TRIALS,
    simulationSeedRandom,
    MAX_MOVES_PER_GAME
  );
  printSummary(randomSummary, "RandomAI");
  console.log("-----------------------------------------");

  // --- Run simulations for Basic AI ---
  console.log("\n[Basic AI]");
  const basicSummary = runSimulations(
    catalystReactionGameDefinition, // Use imported definition
    CatalystReactionBasicAI, // Use imported AI
    NUM_TRIALS,
    simulationSeedBasic,
    MAX_MOVES_PER_GAME
  );
  printSummary(basicSummary, "CatalystReactionBasicAI"); // Set AI name

  console.log("-----------------------------------------");
  console.log("Simulations complete.");
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
