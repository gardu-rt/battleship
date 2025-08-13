import Gameboard from "./gameboard.js";
import Ship from "./ship.js";

export default class Player {
  constructor(isComputer = false) {
    this.board = new Gameboard();
    this.isComputer = isComputer;
  }

  attack(opponentBoard, [x, y]) {
    return opponentBoard.board.recieveAttack([x, y]);
  }
}
