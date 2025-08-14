import Ship from "./ship.js";
import Player from "./player.js";

export default class Game {
  constructor() {
    this.player = new Player();
    this.enemy = new Player(true);
    this.gameOver = false;
  }

  checkWon() {
    if (this.player.allShipSunk()) {
      this.gameOver = true;
      alert("All of your ship has been sunk Computer Win!");
    } else if (this.enemy.allShipSunk()) {
      this.gameOver = true;
      alert("All of enemy ship has been sunk You Win!");
    }
  }
}
