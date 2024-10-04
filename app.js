const cells = document.querySelectorAll(".cell");
const message = document.getElementById("message");
const resetButton = document.getElementById("reset");
const playerVsPlayerButton = document.getElementById("player-vs-player");
const playerVsComputerButton = document.getElementById("player-vs-computer");

let currentPlayer = "X";
let boardState = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;
let vsComputer = false; // Flag to indicate if playing against the computer

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function handleCellClick(event) {
    const cell = event.target;
    const index = cell.getAttribute("data-index");

    if (boardState[index] !== "" || !gameActive) {
        return;
    }

    boardState[index] = currentPlayer;
    cell.textContent = currentPlayer;

    if (checkWinner()) {
        message.textContent = `${currentPlayer} wins!`;
        gameActive = false;
        return;
    }

    if (boardState.every(cell => cell !== "")) {
        message.textContent = "It's a tie!";
        gameActive = false;
        return;
    }

    if (vsComputer && currentPlayer === "X") {
        currentPlayer = "O";
        message.textContent = `Player ${currentPlayer}'s turn`;
        setTimeout(computerMove, 500); // Add a slight delay before computer moves
    } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        message.textContent = `Player ${currentPlayer}'s turn`;
    }
}

function computerMove() {
    if (!gameActive) return;

    let emptyCells = [];
    boardState.forEach((cell, index) => {
        if (cell === "") {
            emptyCells.push(index);
        }
    });

    const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    boardState[randomIndex] = "O";
    document.querySelector(`.cell[data-index="${randomIndex}"]`).textContent = "O";

    if (checkWinner()) {
        message.textContent = `Computer wins!`;
        gameActive = false;
        return;
    }

    if (boardState.every(cell => cell !== "")) {
        message.textContent = "It's a tie!";
        gameActive = false;
        return;
    }

    currentPlayer = "X";
    message.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWinner() {
    for (const condition of winningConditions) {
        const [a, b, c] = condition;
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            return true;
        }
    }
    return false;
}

function resetGame() {
    currentPlayer = "X";
    boardState = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    cells.forEach(cell => (cell.textContent = ""));
    message.textContent = `Player ${currentPlayer}'s turn`;
}

function setPlayerVsPlayer() {
    vsComputer = false;
    resetGame();
    message.textContent = `Player ${currentPlayer}'s turn (Player vs Player Mode)`;
}

function setPlayerVsComputer() {
    vsComputer = true;
    resetGame();
    message.textContent = `Player ${currentPlayer}'s turn (Player vs Computer Mode)`;
}

cells.forEach(cell => cell.addEventListener("click", handleCellClick));
resetButton.addEventListener("click", resetGame);
playerVsPlayerButton.addEventListener("click", setPlayerVsPlayer);
playerVsComputerButton.addEventListener("click", setPlayerVsComputer);

// Set default mode to Player vs Player
message.textContent = `Player ${currentPlayer}'s turn (Player vs Player Mode)`;
