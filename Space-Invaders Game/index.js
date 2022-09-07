const WIDTH = 15;

let spaceInvadersArray = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
    15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
    30, 31, 32, 33, 34, 35, 36, 37, 38, 39
];
const spaceInvadersArrayLength = spaceInvadersArray.length;

let destroyedSpaceInvadersArray = [];

let direction = 1;
let gameOverFlag = false;
let squaresDiv = null;
let moveSpaceInvadersTimer = null;

let currentPlayerShooterPosition = 202;

function drawSpaceInvaders() {
    spaceInvadersArray.forEach((each, index) => destroyedSpaceInvadersArray.includes(index) ? null : squaresDiv[each].classList.add("invader"));
}

function deleteSpaceInvaders() {
    spaceInvadersArray.forEach(each => squaresDiv[each].classList.remove("invader"));
}

function leftBorderReached(element) {
    return element % WIDTH === 0;
}

function rightBorderReached(element) {
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

function shoot(e) {
    let drawLaserTimer = null;
    let currentLaserPosition = null;

    function drawLaser() {
        squaresDiv[currentLaserPosition].classList.remove("laser");
        currentLaserPosition -= WIDTH;

        if (currentLaserPosition <= 0) {
            clearInterval(drawLaserTimer);
        }
        else if (squaresDiv[currentLaserPosition].classList.contains("invader")) {
            destroyedSpaceInvadersArray.push(spaceInvadersArray.indexOf(currentLaserPosition));

            squaresDiv[currentLaserPosition].classList.remove("invader");
            squaresDiv[currentLaserPosition].classList.add("boom");

            setTimeout(() => squaresDiv[currentLaserPosition].classList.remove("boom"), 200);
            clearInterval(drawLaserTimer);
        }
        else {
            squaresDiv[currentLaserPosition].classList.add("laser");
        }
    }

    if (e.key === "ArrowUp") {
        currentLaserPosition = currentPlayerShooterPosition;
        drawLaserTimer = setInterval(drawLaser, 30);
    }

}
document.addEventListener("keydown", shoot);

function movePlayerShooter(e) {
    squaresDiv[currentPlayerShooterPosition].classList.remove("playerShooter");

    switch (e.key) {
        case "ArrowLeft": {
            leftBorderReached(currentPlayerShooterPosition) ? null : currentPlayerShooterPosition--;
            break;
        }
        case "ArrowRight": {
            rightBorderReached(currentPlayerShooterPosition) ? null : currentPlayerShooterPosition++;
            break;
        }
    }
    squaresDiv[currentPlayerShooterPosition].classList.add("playerShooter");
}

function moveSpaceInvaders() {
    if (destroyedSpaceInvadersArray.length === spaceInvadersArrayLength) {
        gameOverFlag = true;
        clearInterval(moveSpaceInvadersTimer);
        document.querySelector("h1").innerText = "YOU WON!!";
        document.removeEventListener("keydown", movePlayerShooter);
    }

    deleteSpaceInvaders();

    spaceInvadersArray.forEach(each => {
        if (each === currentPlayerShooterPosition) {
            gameOverFlag = true;
            clearInterval(moveSpaceInvadersTimer);
            document.querySelector("h1").innerText = "GAME OVER!";
            document.removeEventListener("keydown", movePlayerShooter);
        }
    });

    if (!gameOverFlag) {
        const leftReached = leftBorderReached(spaceInvadersArray[0]);
        const rightReached = rightBorderReached(spaceInvadersArray[spaceInvadersArray.length - 1]);

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
