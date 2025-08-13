import Gameboard from "./gameboard.js";

export default class Player extends Gameboard {
  constructor(isComputer = false) {
    super();
    this.isComputer = isComputer;
  }

  attack(opponentBoard, [x, y]) {
    return opponentBoard.recieveAttack([x, y]);
  }

  generateRandomCoord() {
    const x = Math.floor(Math.random() * 10);
    const y = Math.floor(Math.random() * 10);
    return [x, y];
  }
}
