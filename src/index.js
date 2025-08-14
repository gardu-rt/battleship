import "./styles/styles.css";
import Player from "./module/player.js";
import Ship from "./module/ship.js";

const humanGrid = document.querySelector(".grid.human-player");
const computerGrid = document.querySelector(".grid.computer-player");
const startGameBtn = document.getElementById("start-game");
const shipList = document.querySelectorAll("#roster-sidebar li");

const human = new Player(false);
const computer = new Player(true);

let selectedShipLength = null;
let selectedShipName = null;
let placementHorizontal = true;
let placedShips = 0;
let previewCells = [];

// Create grids
function createGrid(gridElement, isComputer) {
  for (let r = 0; r < 10; r++) {
    for (let c = 0; c < 10; c++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.row = r;
      cell.dataset.col = c;

      if (!isComputer) {
        // Hover preview
        cell.addEventListener("mouseenter", () => showPreview(r, c));
        cell.addEventListener("mouseleave", clearPreview);

        // Place ship on click
        cell.addEventListener("click", () => {
          if (selectedShipLength) {
            try {
              human.placeShip(
                new Ship(selectedShipLength),
                [r, c],
                placementHorizontal
              );
              markShipOnGrid(
                humanGrid,
                [r, c],
                selectedShipLength,
                placementHorizontal
              );
              placedShips++;
              markShipAsPlaced(selectedShipName);
              selectedShipLength = null;
              selectedShipName = null;
              clearPreview();
              if (placedShips === 5) {
                startGameBtn.disabled = false;
              }
            } catch (err) {
              alert("Invalid placement: " + err.message);
            }
          }
        });
      } else {
        cell.addEventListener("click", () => {
          if (gameStarted) handleAttack(r, c);
        });
      }

      gridElement.appendChild(cell);
    }
  }
}

createGrid(humanGrid, false);
createGrid(computerGrid, true);

// Preview highlight function
function showPreview(r, c) {
  if (!selectedShipLength) return;
  clearPreview();

  let valid = true;
  previewCells = [];

  for (let i = 0; i < selectedShipLength; i++) {
    const rr = placementHorizontal ? r : r + i;
    const cc = placementHorizontal ? c + i : c;

    const cell = humanGrid.querySelector(
      `.cell[data-row="${rr}"][data-col="${cc}"]`
    );
    if (!cell || human.board[rr]?.[cc] !== null) {
      valid = false;
    }
    if (cell) {
      previewCells.push(cell);
    }
  }

  previewCells.forEach((cell) => {
    cell.classList.add(valid ? "preview-valid" : "preview-invalid");
  });
}

function clearPreview() {
  previewCells.forEach((cell) => {
    cell.classList.remove("preview-valid", "preview-invalid");
  });
  previewCells = [];
}

// Select ship from roster
shipList.forEach((item) => {
  item.addEventListener("click", () => {
    if (item.classList.contains("placed")) return;
    selectedShipName = item.id;
    selectedShipLength = getShipLength(item.id);
  });
});

function getShipLength(name) {
  switch (name) {
    case "carrier":
      return 5;
    case "battleship":
      return 4;
    case "destroyer":
      return 3;
    case "submarine":
      return 3;
    case "patrolboat":
      return 2;
  }
}

function markShipAsPlaced(name) {
  const li = document.getElementById(name);
  li.classList.add("placed");
  li.style.backgroundColor = "gray";
}

function markShipOnGrid(grid, [r, c], length, horizontal) {
  for (let i = 0; i < length; i++) {
    const rr = horizontal ? r : r + i;
    const cc = horizontal ? c + i : c;
    const cell = grid.querySelector(
      `.cell[data-row="${rr}"][data-col="${cc}"]`
    );
    if (cell) cell.classList.add("grid-ship");
  }
}

// Rotate placement with R key
document.addEventListener("keydown", (e) => {
  if (e.key.toLowerCase() === "r") {
    placementHorizontal = !placementHorizontal;
    clearPreview();
  }
});

// Computer ship placement
function placeShipsRandomly(player) {
  const shipsToPlace = [5, 4, 3, 3, 2];
  shipsToPlace.forEach((length) => {
    let placed = false;
    while (!placed) {
      const coord = player.generateRandomCoord();
      const horizontal = Math.random() < 0.5;
      try {
        player.placeShip(new Ship(length), coord, horizontal);
        placed = true;
      } catch {}
    }
  });
}

let gameStarted = false;

startGameBtn.addEventListener("click", () => {
  if (startGameBtn.textContent === "Reset Game") {
    resetGame();
    return;
  }

  placeShipsRandomly(computer);
  gameStarted = true;
  playerTurn = true; // Player always starts
  updateTurnIndicator();
  startGameBtn.disabled = true; // Disable after starting
  alert("Game started! Click on the enemy grid to attack.");
});

let playerTurn = true;
const turnIndicator = document.getElementById("turn-indicator");

function updateTurnIndicator() {
  if (playerTurn) {
    turnIndicator.textContent = "Your Turn";
    turnIndicator.classList.add("player");
    turnIndicator.classList.remove("computer");

    // Unlock enemy grid
    computerGrid.classList.remove("locked");
  } else {
    turnIndicator.textContent = "Computer's Turn";
    turnIndicator.classList.add("computer");
    turnIndicator.classList.remove("player");

    // Lock enemy grid
    computerGrid.classList.add("locked");
  }
}

function endGame(winner) {
  alert(winner + " wins!");
  gameStarted = false;
  startGameBtn.textContent = "Reset Game";
  startGameBtn.disabled = false;
}

function handleAttack(row, col) {
  if (!playerTurn) return;

  const targetShip = computer.board[row][col];
  const result = human.attack(computer, [row, col]);
  if (!result) return;

  const cell = document.querySelector(
    `.grid.computer-player .cell[data-row="${row}"][data-col="${col}"]`
  );
  cell.style.backgroundColor = result === "hit" ? "red" : "white";

  if (result === "hit" && targetShip.isSunk()) {
    markSunkShip(targetShip, computer, "enemy");
  }

  if (computer.allShipSunk()) {
    endGame("🎉 You");
    return;
  }

  if (result === "miss") {
    playerTurn = false;
    updateTurnIndicator();
    setTimeout(computerTurn, 500);
  }
}

function computerTurn() {
  let coord, result;
  do {
    coord = computer.generateRandomCoord();
    result = computer.attack(human, coord);
  } while (!result);

  const [row, col] = coord;
  const targetShip = human.board[row][col];

  const cell = document.querySelector(
    `.grid.human-player .cell[data-row="${row}"][data-col="${col}"]`
  );
  cell.style.backgroundColor = result === "hit" ? "red" : "white";

  if (result === "hit" && targetShip.isSunk()) {
    markSunkShip(targetShip, human, "player");
  }

  if (human.allShipSunk()) {
    endGame("💻 Computer");
    return;
  }

  if (result === "miss") {
    setTimeout(() => {
      playerTurn = true;
      updateTurnIndicator();
    }, 800);
  } else {
    setTimeout(computerTurn, 500);
  }
}

function markSunkShip(ship, boardOwner, ownerType) {
  for (let r = 0; r < boardOwner.size; r++) {
    for (let c = 0; c < boardOwner.size; c++) {
      if (boardOwner.board[r][c] === ship) {
        const selector =
          ownerType === "enemy"
            ? `.grid.computer-player .cell[data-row="${r}"][data-col="${c}"]`
            : `.grid.human-player .cell[data-row="${r}"][data-col="${c}"]`;

        const cell = document.querySelector(selector);
        if (cell) {
          cell.classList.add(
            ownerType === "enemy" ? "ship-sunk-enemy" : "ship-sunk-player"
          );
        }
      }
    }
  }
}

function resetGame() {
  // Clear boards in DOM
  humanGrid.innerHTML = "";
  computerGrid.innerHTML = "";

  // Reset players
  human.board = Array.from({ length: 10 }, () => Array(10).fill(null));
  human.ships = 0;
  human.attackedCoord.clear();

  computer.board = Array.from({ length: 10 }, () => Array(10).fill(null));
  computer.ships = 0;
  computer.attackedCoord.clear();

  // Reset roster
  document.querySelectorAll("#roster-sidebar li").forEach((li) => {
    li.classList.remove("placed");
    li.style.backgroundColor = "";
  });

  placedShips = 0;
  selectedShipLength = null;
  selectedShipName = null;
  playerTurn = true;
  gameStarted = false;

  createGrid(humanGrid, false);
  createGrid(computerGrid, true);
  updateTurnIndicator();

  // Button back to Start Game
  startGameBtn.textContent = "Start Game";
  startGameBtn.disabled = true;
}
