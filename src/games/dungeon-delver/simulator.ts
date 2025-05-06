import {
  GameDefinition,
  BaseGameState,
  BaseAction,
  PlayerAI,
} from "../../types.ts"; // Adjusted path
import { createRng } from "../../utils/rng.ts"; // Adjusted path

// --- !!! TEMPLATE INSTRUCTIONS !!! ---
// 1. RENAME this file to `src/games/[your-game-name]/simulator.ts` (DONE: dungeon-delver/simulator.ts)
// 2. UNCOMMENT and EDIT the following import lines for your game:
// /* // Already done for Dungeon Delver below
import DungeonDelverDefinition from "./definition.ts"; // Use default import
import { GameState, GameAction } from "./types.ts"; // Add .ts extension
// No separate AI file needed for basicAI initially
import { DungeonDelverBasicAI } from "./ai.ts"; // Import the new AI
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
const RandomAI: PlayerAI<GameState, GameAction> = {
  // Specify types
  chooseAction: (
    state: GameState,
    availableActions: GameAction[],
    history?: GameAction[],
    actionSeed?: string
  ): GameAction => {
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
      // Game might end here due to no actions, checkGameEnd should catch this before AI choice
      // If checkGameEnd didn't catch it, it implies a logic error or potentially just a state where no moves are possible but game isn't over yet.
      console.warn(
        `DEBUG: No actions available mid-game (should be caught by checkGameEnd). Move ${moveCount}, Seed: ${simulationSeed}`
      );
      // Force loss based on simulator rule rather than game rule potentially missed
      return {
        status: "LOSE",
        reason: "SIMULATOR - No available actions mid-game",
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
      // Adjusted check to handle payload or params, and be more type-safe
      const actionMatches = (a: Act, chosen: Act) => {
        if (a.type !== chosen.type) return false;
        // Dungeon Delver uses params, fallback to payload if needed
        const actualPayloadA = (a as any).params ?? (a as any).payload ?? {};
        const actualPayloadChosen =
          (chosen as any).params ?? (chosen as any).payload ?? {};
        return (
          JSON.stringify(actualPayloadA) === JSON.stringify(actualPayloadChosen)
        );
      };
      if (!availableActions.some((a) => actionMatches(a, chosenAction))) {
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
      (ai as any).name || ai.constructor?.name || "Unknown AI"
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
const MAX_MOVES_PER_GAME = 500; // Adjust if needed
const simulationSeedPrefix = "dungeon-delver"; // Set game name prefix
const simulationSeedRandom = `${simulationSeedPrefix}-rand-v1`;
const simulationSeedBasic = `${simulationSeedPrefix}-basic-v1`;

async function main() {
  console.log(
    `Starting simulations for ${DungeonDelverDefinition.gameName}...` // Use imported definition
  );
  console.log(`Number of trials per AI: ${NUM_TRIALS}`);
  console.log(`Max moves per game: ${MAX_MOVES_PER_GAME}`);
  console.log("-----------------------------------------");

  // --- Run simulations for Random AI ---
  console.log("\n[Random AI]");
  const randomSummary = runSimulations(
    DungeonDelverDefinition, // Use imported definition
    RandomAI,
    NUM_TRIALS,
    simulationSeedRandom,
    MAX_MOVES_PER_GAME
  );
  printSummary(randomSummary, "RandomAI");
  console.log("-----------------------------------------");

  // --- Run simulations for Basic AI (from definition) ---
  console.log("\n[Basic AI (External File)]");
  const basicSummary = runSimulations<GameState, GameAction>( // Specify types
    DungeonDelverDefinition, // Use imported definition
    DungeonDelverBasicAI, // Use imported AI from ai.ts
    NUM_TRIALS,
    simulationSeedBasic,
    MAX_MOVES_PER_GAME
  );
  printSummary(basicSummary, "BasicAI (External)"); // Updated AI name

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
