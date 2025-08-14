import Ship from "./ship.js";

export default class Gameboard {
  constructor() {
    this.size = 10;
    this.board = Array.from({ length: this.size }, () =>
      Array(this.size).fill(null)
    );
    this.ships = 0;
    this.attackedCoord = new Set();
  }

  placeShip(ship = new Ship(3), [x, y], horizontal = true) {
    if (this.isOutBound([x, y], ship.length, horizontal)) {
      throw new Error("invalid placement: out of bounds");
    }
    if (this.isOverlap([x, y], ship.length, horizontal)) {
      throw new Error("invalid placement: overlap");
    }

    for (let i = 0; i < ship.length; i++) {
      const r = horizontal ? x : x + i;
      const c = horizontal ? y + i : y;
      this.board[r][c] = ship;
    }
    this.ships++;
  }

  isOutBound([x, y], length, horizontal) {
    if (horizontal && y + length > this.size) return true;
    if (!horizontal && x + length > this.size) return true;
    return false;
  }

  isOverlap([x, y], length, horizontal) {
    for (let i = 0; i < length; i++) {
      const r = horizontal ? x : x + i;
      const c = horizontal ? y + i : y;
      if (this.board[r][c] !== null) return true;
    }
    return false;
  }

  recieveAttack([x, y]) {
    const coordKey = [x, y].toString();
    if (this.attackedCoord.has(coordKey)) return null;

    this.attackedCoord.add(coordKey);

    if (this.isMiss([x, y])) {
      return "miss";
    }
    if (this.isHit([x, y])) {
      const ship = this.board[x][y];
      ship.hit();
      if (ship.isSunk()) {
        this.ships--;
      }
      return "hit";
    }
  }

  isMiss([x, y]) {
    return this.board[x][y] === null;
  }

  isHit([x, y]) {
    return this.board[x][y] !== null;
  }

  allShipSunk() {
    return this.ships === 0;
  }
}
