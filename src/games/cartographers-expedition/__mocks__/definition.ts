import { jest } from "@jest/globals"; // Import jest globals

export const __esModule = true; // ES Moduleとしてマーク

export const CartographersExpedition = {
  setupGame: jest.fn(),
  applyAction: jest.fn(),
  checkGameEnd: jest.fn().mockReturnValue({ status: "ONGOING" }),
  getAvailableActions: jest.fn().mockReturnValue([]),
};

export const OBSTACLE_RANKS = ["J", "Q", "K", "10"];
