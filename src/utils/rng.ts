import seedrandom from "seedrandom";

/**
 * Creates a seeded pseudo-random number generator (PRNG) function.
 * This function, when called, returns a number between 0 (inclusive) and 1 (exclusive),
 * just like Math.random(), but its sequence is deterministic based on the provided seed.
 *
 * @param seed The seed string to initialize the PRNG. Can be undefined for non-deterministic behavior.
 * @returns A function that generates the next random number in the sequence.
 */
export const createRng = (seed: string | undefined): (() => number) => {
  // If seed is undefined, use Math.random directly (or seedrandom without args)
  return seed ? seedrandom(seed) : Math.random;
};
