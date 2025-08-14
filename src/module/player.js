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
    const x = Math.floor(Math.random() * this.size);
    const y = Math.floor(Math.random() * this.size);
    return [x, y];
  }
}
