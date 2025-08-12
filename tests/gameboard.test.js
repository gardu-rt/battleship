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
    expect(game.ships).toEqual(1);
  });

  test("game.attackedCoord.has('0,0') equal true", () => {
    game.recieveAttack([0, 0]);
    expect(game.attackedCoord.has("0,0")).toBe(true);
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

  test("attacked same coordinat equal null", () => {
    game.recieveAttack([0, 0]);
    expect(game.recieveAttack([0, 0])).toBe(null);
  });

  test("attack empty coord return 'miss'", () => {
    game.placeShip(ship, [0, 0], true);
    expect(game.recieveAttack([1, 0])).toBe("miss");
  });

  test("attack ship coord return 'hit'", () => {
    game.placeShip(ship, [0, 0], true);
    expect(game.recieveAttack([0, 0])).toBe("hit");
  });

  test("if all ship is sunk return true", () => {
    expect(game.allShipSunk()).toBe(true);
  });

  test("if all ship not sunk return false", () => {
    game.placeShip(ship, [0, 0], true);
    expect(game.allShipSunk()).toBe(false);
  });
});
