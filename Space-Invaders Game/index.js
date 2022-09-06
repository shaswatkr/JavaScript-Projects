const WIDTH = 15;

let spaceInvadersArray = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
    15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
    30, 31, 32, 33, 34, 35, 36, 37, 38, 39
];
const spaceInvadersArrayLength = spaceInvadersArray.length;

let direction = 1;
let gameLostFlag = false;
let squaresDiv = null;
let moveSpaceInvadersTimer = null;

let currentPlayerShooterPosition = 202;

function drawSpaceInvaders() {
    spaceInvadersArray.forEach(each => squaresDiv[each].classList.add("invader"));
}

function deleteSpaceInvaders() {
    spaceInvadersArray.forEach(each => squaresDiv[each].classList.remove("invader"));
}

function leftBorderReachedFor(element) {
    return element % WIDTH === 0;
}

function rightBorderReachedFor(element) {
    return element % WIDTH === WIDTH - 1;
}

function drawBoard() {
    const gridDiv = document.querySelector(".grid");

    // ! - Create empty squares
    for (let i = 0; i < 225; i++) {
        const div = document.createElement("div");
        div.className = "square";
        gridDiv.appendChild(div);
    }
    squaresDiv = document.querySelectorAll(".square");

    // ! - Create Invaders
    drawSpaceInvaders();

    //  ! - Create Player's Shooter
    squaresDiv[currentPlayerShooterPosition].classList.add("playerShooter");

    // ! - Add Event Listener move Player's Shooter
    document.addEventListener("keydown", movePlayerShooter);
}
drawBoard();

function movePlayerShooter(e) {
    squaresDiv[currentPlayerShooterPosition].classList.remove("playerShooter");

    switch (e.key) {
        case "ArrowLeft": {
            leftBorderReachedFor(currentPlayerShooterPosition) ? null : currentPlayerShooterPosition--;
            break;
        }
        case "ArrowRight": {
            rightBorderReachedFor(currentPlayerShooterPosition) ? null : currentPlayerShooterPosition++;
            break;
        }
    }
    squaresDiv[currentPlayerShooterPosition].classList.add("playerShooter");
}

function moveSpaceInvaders() {
    const leftReached = leftBorderReachedFor(spaceInvadersArray[0]);
    const rightReached = rightBorderReachedFor(spaceInvadersArray[spaceInvadersArrayLength - 1]);

    deleteSpaceInvaders();

    for (let i = 0; i < spaceInvadersArrayLength; i++) {
        if (spaceInvadersArray[i] === currentPlayerShooterPosition) {
            gameLostFlag = true;
            clearInterval(moveSpaceInvadersTimer);
        }
    }

    if (!gameLostFlag) {
        if (rightReached && direction > 0) {
            direction = -direction;
            spaceInvadersArray = spaceInvadersArray.map(each => each + WIDTH);
        }
        else if (leftReached && direction < 0) {
            direction = -direction;
            spaceInvadersArray = spaceInvadersArray.map(each => each + WIDTH);
        }
        else {
            spaceInvadersArray = spaceInvadersArray.map(each => each + direction);
        }
    }

    drawSpaceInvaders();
}
moveSpaceInvadersTimer = setInterval(moveSpaceInvaders, 500);