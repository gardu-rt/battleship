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

  placeShip(ship = new Ship(3), [x, y], horizontal) {
    if (this.isOutBound([x, y], ship.length, horizontal)) {
      throw new Error("invalid placement");
    }
    if (this.isOverlap([x, y], ship.length.horizontal)) {
      throw new Error("invalid placement");
    }

    for (let i = 0; i < ship.length; i++) {
      const r = horizontal ? x : x + i;
      const c = horizontal ? y + i : y;
      this.board[r][c] = ship;
    }
    this.ships++;
  }

  isOutBound([x, y], length, horizontal) {
    for (let i = 0; i < length; i++) {
      const r = horizontal ? x : x + i;
      const c = horizontal ? y + i : y;

      if (horizontal && c + length >= this.size) return true;
      if (!horizontal && r + length >= this.size) return true;
    }

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
    if (this.attackedCoord.has([x, y].toString())) return null;
    if (this.isMiss([x, y])) {
      this.attackedCoord.add([x, y].toString());
      return "miss";
    }
    if (this.isHit([x, y])) {
      this.attackedCoord.add([x, y].toString());
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
