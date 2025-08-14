# 🚢 Battleship Game

A classic Battleship game built with **JavaScript, HTML, CSS** and bundled with **Webpack**.  
Play against the computer — place your ships, take turns attacking, and sink all enemy ships to win.

---

## 🎯 Objective

Sink all **five enemy ships** before the computer sinks yours.

---

## 🕹 How to Play

### 1️⃣ Place Your Ships

- Select a ship from the **"Place Your Ships"** roster on the left.
- Hover over your grid to see a **preview** of the placement:
  - **Green** = valid placement
  - **Red** = invalid placement
- Click to place the ship.
- Press **`R`** to rotate the ship before placing.
- Repeat until all **5 ships** are placed.
- Once all ships are placed, click **"Start Game"**.

---

### 2️⃣ Gameplay Rules

- You start first.
- Click on a cell in the **enemy's grid** to attack.
- If you **hit**, you can attack again immediately.
- If you **miss**, it's the computer's turn.
- The game alternates until one side’s fleet is destroyed.

---

### 3️⃣ Visual Indicators

- **Blue cells** → your placed ships.
- **Red cells** → successful hits.
- **White cells** → misses.
- **Dark red cells** → sunk enemy ships.
- **Dark gray cells** → your ships that were sunk.
- **Turn indicator** at the top shows whose turn it is.
- **Enemy grid dims** during the computer's turn so you can't click.

---
