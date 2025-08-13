import Ship from "../src/module/ship.js";
import Player from "../src/module/player.js";

describe("Player class", () => {
  let ship;
  let player;

  beforeEach(() => {
    ship = new Ship(3);
    player = new Player();
    opponent = new Player();
  });

  test("shot at [0, 0] return hit", () => {
    opponent.board.placeShip(ship, [0, 0], true);
    expect(player.attack(opponent, [0, 0])).toBe("hit");
  });
});
