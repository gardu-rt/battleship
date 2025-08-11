import Ship from "../src/module/ship.js";

test("ship length should be 3", () => {
  const ship = new Ship(3);
  expect(ship.length).toBe(3);
});

test("ship.hit() should increase ship.hits by 1", () => {
  const ship = new Ship(3);
  ship.hit();
  expect(ship.hits).toBe(1);
});

test("ship.isSunk() return false if ship.hits not equal ship.length", () => {
  const ship = new Ship(3);
  ship.hit();
  expect(ship.isSunk()).toBe(false);
});

test("ship.isSunk() return true if ship.hits equal ship.length", () => {
  const ship = new Ship(2);
  ship.hit();
  ship.hit();
  expect(ship.isSunk()).toBe(true);
});
