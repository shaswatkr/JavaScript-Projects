const HEIGHT = 9;
const WIDTH = 9;

let timeLeft = 60;
let stateOfGame = null;
let currentFrogSquareIndex = 76;

const squares = document.querySelectorAll(".grid div");
document.addEventListener("keydown", moveFrog);

function moveFrog(e) {
    squares[currentFrogSquareIndex].classList.remove("frog");

    switch (e.key) {
        case "ArrowUp": {
            currentFrogSquareIndex -= currentFrogSquareIndex > 8 ? WIDTH : 0;
            break;
        }
        case "ArrowDown": {
            currentFrogSquareIndex += currentFrogSquareIndex < 72 ? WIDTH : 0;
            break;
        }
        case "ArrowLeft": {
            currentFrogSquareIndex -= currentFrogSquareIndex % 9 > 0 ? 1 : 0;
            break;
        }
        case "ArrowRight": {
            currentFrogSquareIndex += currentFrogSquareIndex % 9 < 8 ? 1 : 0;
        }
    }

    squares[currentFrogSquareIndex].classList.add("frog");
}