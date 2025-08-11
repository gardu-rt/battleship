import Gameboard from "../src/module/gameboard.js";
import Ship from "../src/module/ship.js";

describe("Gameboard class", () => {
  let game;
  let ship;

  beforeEach(() => {
    game = new Gameboard();
    ship = new Ship(3);
  });

  test("[0, 0] should equal ship", () => {
    game.placeShip(ship, [0, 0], true);
    expect(game.board[0][0]).toBe(ship);
  });

  test("game.ships equal [ship]", () => {
    game.placeShip(ship, [0, 0], true);
    expect(game.ships).toEqual([ship]);
  });

  test("game.attacked.has('0,0') equal true", () => {
    game.recieveAttack([0, 0]);
    expect(game.attacked.has("0,0")).toBe(true);
  });

  test("game.isOutBound equal false", () => {
    expect(game.isOutBound([0, 0], 3, true)).toBe(false);
  });

  test("game.isOutBound equal true", () => {
    expect(game.isOutBound([0, 8], 3, true)).toBe(true);
  });

  test("game.isOutBound equal true", () => {
    expect(game.isOutBound([8, 0], 3, false)).toBe(true);
  });

  test("game.isOverlap equal true", () => {
    game.placeShip(ship, [0, 0], true);
    expect(game.isOverlap([0, 0], 3, true)).toBe(true);
  });
});
