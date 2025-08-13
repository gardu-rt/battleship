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

  placeShip(ship = new Ship(3), [row, col], horizontal) {
    if (this.isOutBound([row, col], ship.length, horizontal)) {
      throw new Error("invalid placement");
    }
    if (this.isOverlap([row, col], ship.length.horizontal)) {
      throw new Error("invalid placement");
    }

    for (let i = 0; i < ship.length; i++) {
      const r = horizontal ? row : row + i;
      const c = horizontal ? col + i : col;
      this.board[r][c] = ship;
    }
    this.ships++;
  }

  isOutBound([row, col], length, horizontal) {
    for (let i = 0; i < length; i++) {
      const r = horizontal ? row : row + i;
      const c = horizontal ? col + i : col;

      if (horizontal && c + length >= this.size) return true;
      if (!horizontal && r + length >= this.size) return true;
    }

    return false;
  }

  isOverlap([row, col], length, horizontal) {
    for (let i = 0; i < length; i++) {
      const r = horizontal ? row : row + i;
      const c = horizontal ? col + i : col;

      if (this.board[r][c] !== null) return true;
    }

    return false;
  }

  recieveAttack([row, col]) {
    if (this.attackedCoord.has([row, col].toString())) return null;
    if (this.isMiss([row, col])) {
      this.attackedCoord.add([row, col].toString());
      return "miss";
    }
    if (this.isHit([row, col])) {
      this.attackedCoord.add([row, col].toString());
      return "hit";
    }
  }

  isMiss([row, col]) {
    return this.board[row][col] === null;
  }

  isHit([row, col]) {
    return this.board[row][col] !== null;
  }

  allShipSunk() {
    return this.ships === 0;
  }
}
