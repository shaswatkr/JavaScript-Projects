const HEIGHT = 9;
const WIDTH = 9;

let timeLeft = 20;
let stateOfGame = null;
let currentFrogSquareIndex = 76;
let autoMoveElementsTimer = null;
let gameWinLoseLogicTimer = null;

const squaresDiv = document.querySelectorAll(".grid div");
const stateOfGameSpan = document.getElementById("state_of_game_span");

document.getElementById("reset_button").addEventListener("click", resetBoard);
document.getElementById("start_pause_button").addEventListener("click", startPauseGame);

function moveFrog(e) {
    squaresDiv[currentFrogSquareIndex].classList.remove("frog");

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

    squaresDiv[currentFrogSquareIndex].classList.add("frog");
}

function autoMoveElements() {
    const logsLeftDiv = document.querySelectorAll(".log_left_div");
    const logsRightDiv = document.querySelectorAll(".log_right_div");
    const carsLeftDiv = document.querySelectorAll(".car_left_div");
    const carRightDiv = document.querySelectorAll(".car_right_div");

    logsLeftDiv.forEach(logLeft => moveLogs(logLeft, "left"));
    logsRightDiv.forEach(logRight => moveLogs(logRight, "right"));

    carsLeftDiv.forEach(carLeft => moveCars(carLeft, "left"));
    carRightDiv.forEach(carRight => moveCars(carRight, "right"));

    document.getElementById("time_left_span").innerText = --timeLeft;
}

function moveLogs(log, direction) {
    if (direction === "left") {
        switch (true) {
            case log.classList.contains("l1"): {
                log.classList.remove("l1");
                log.classList.add("l2");
                break;
            }
            case log.classList.contains("l2"): {
                log.classList.remove("l2");
                log.classList.add("l3");
                break;
            }
            case log.classList.contains("l3"): {
                log.classList.remove("l3");
                log.classList.add("l4");
                break;
            }
            case log.classList.contains("l4"): {
                log.classList.remove("l4");
                log.classList.add("l5");
                break;
            }
            case log.classList.contains("l5"): {
                log.classList.remove("l5");
                log.classList.add("l1");
                break;
            }
        }
    }
    else {
        switch (true) {
            case log.classList.contains("l1"): {
                log.classList.remove("l1");
                log.classList.add("l5");
                break;
            }
            case log.classList.contains("l2"): {
                log.classList.remove("l2");
                log.classList.add("l1");
                break;
            }
            case log.classList.contains("l3"): {
                log.classList.remove("l3");
                log.classList.add("l2");
                break;
            }
            case log.classList.contains("l4"): {
                log.classList.remove("l4");
                log.classList.add("l3");
                break;
            }
            case log.classList.contains("l5"): {
                log.classList.remove("l5");
                log.classList.add("l4");
                break;
            }
        }
    }
}

function moveCars(car, direction) {
    if (direction === "left") {
        switch (true) {
            case car.classList.contains("c1"): {
                car.classList.remove("c1");
                car.classList.add("c2");
                break;
            }
            case car.classList.contains("c2"): {
                car.classList.remove("c2");
                car.classList.add("c3");
                break;
            }
            case car.classList.contains("c3"): {
                car.classList.remove("c3");
                car.classList.add("c4");
                break;
            }
            case car.classList.contains("c4"): {
                car.classList.remove("c4");
                car.classList.add("c1");
                break;
            }
        }
    }
    else {
        switch (true) {
            case car.classList.contains("c1"): {
                car.classList.remove("c1");
                car.classList.add("c4");
                break;
            }
            case car.classList.contains("c2"): {
                car.classList.remove("c2");
                car.classList.add("c1");
                break;
            }
            case car.classList.contains("c3"): {
                car.classList.remove("c3");
                car.classList.add("c2");
                break;
            }
            case car.classList.contains("c4"): {
                car.classList.remove("c4");
                car.classList.add("c3");
                break;
            }
        }
    }
}

function resetBoard() {
    clearInterval(autoMoveElementsTimer);
    clearInterval(gameWinLoseLogicTimer);
    autoMoveElementsTimer = null;

    timeLeft = 20;
    document.getElementById("time_left_span").innerText = timeLeft;
    stateOfGameSpan.innerText = "NOT STARTED";

    squaresDiv[currentFrogSquareIndex].classList.remove("frog");
    currentFrogSquareIndex = 76;
    squaresDiv[currentFrogSquareIndex].classList.add("frog");
}

function startPauseGame() {
    if (autoMoveElementsTimer) {
        clearInterval(autoMoveElementsTimer);
        clearInterval(gameWinLoseLogicTimer);
        autoMoveElementsTimer = null;
        document.removeEventListener("keydown", moveFrog);
        stateOfGameSpan.innerText = "PAUSED";
    }
    else {
        autoMoveElementsTimer = setInterval(autoMoveElements, 1000);
        gameWinLoseLogicTimer = setInterval(gameWinLoseLogic, 100);
        document.addEventListener("keydown", moveFrog);
        stateOfGameSpan.innerText = "RUNNING";
    }
}

function gameWinLoseLogic() {
    // ! - Conditions when User will LOSE the Game
    if (
        timeLeft <= 0 ||
        squaresDiv[currentFrogSquareIndex].classList.contains("l4") ||
        squaresDiv[currentFrogSquareIndex].classList.contains("l5") ||
        squaresDiv[currentFrogSquareIndex].classList.contains("c1") ||
        squaresDiv[currentFrogSquareIndex].classList.contains("c2")
    ) {
        clearInterval(autoMoveElementsTimer);
        clearInterval(gameWinLoseLogicTimer);
        autoMoveElementsTimer = null;
        document.removeEventListener("keydown", moveFrog);
        stateOfGameSpan.innerText = "YOU LOST";
    }

    // ! - Condition when User will WIN the Game
    if (squaresDiv[currentFrogSquareIndex].classList.contains("end_game_div")) {
        clearInterval(autoMoveElementsTimer);
        clearInterval(gameWinLoseLogicTimer);
        autoMoveElementsTimer = null;
        document.removeEventListener("keydown", moveFrog);
        stateOfGameSpan.innerText = "YOU WON!!";
    }
}
