const GRID_SIZE = 9;    // ! - 3 * 3

let result = 0;
let timeLeft = 10;
let chooseRandomSquareTimer = null;
let countdownTimer = null;

const gridDiv = document.getElementById("grid");
const resultSpan = document.getElementById("result");

for (let i = 0; i < GRID_SIZE; i++) {
    const square = document.createElement("div");
    square.className = "square";
    square.setAttribute("data-id", i);

    gridDiv.appendChild(square);
}

document.getElementById("startGame").addEventListener("click", startNewGame);

function startNewGame() {
    result = 0;
    timeLeft = 10;
    resultSpan.innerText = result;

    chooseRandomSquareTimer = setInterval(chooseRandomSquare, 700);
    countdownTimer = setInterval(countdown, 1000);
}

function chooseRandomSquare() {
    const squares = document.querySelectorAll(".square");

    squares.forEach(square => {
        square.classList.remove("mole");
        square.removeEventListener("click", moleHit);
    });

    let randomNo = Math.floor(Math.random() * GRID_SIZE);

    squares[randomNo].addEventListener("click", moleHit);
    squares[randomNo].classList.add("mole");
}

function countdown() {
    document.getElementById("time-left").innerText = --timeLeft;

    if (timeLeft === 0) {
        clearInterval(chooseRandomSquareTimer);
        clearInterval(countdownTimer);
    }
}

function moleHit() {
    resultSpan.innerText = ++result;
    this.removeEventListener("click", moleHit);
}