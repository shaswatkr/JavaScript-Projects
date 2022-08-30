const HEIGHT = 9;
const WIDTH = 9;

let timeLeft = 60;
let stateOfGame = null;
let currentFrogSquareIndex = 76;
let autoMoveElementsTimer = null;

const squaresDiv = document.querySelectorAll(".grid div");
document.addEventListener("keydown", moveFrog);

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

autoMoveElementsTimer = setInterval(autoMoveElements, 1000);