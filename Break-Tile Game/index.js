const BOARD_HEIGHT = 300;
const BOARD_WIDTH = 560;
const BRICK_HEIGHT = 20;
const BRICK_WIDTH = 100;
const BALL_HEIGHT = 20;
const BALL_WIDTH = 20;
const GUTTER = 10;
const NO_OF_BRICKS = 15;
const USER_BRICK_MOVEMENT_SPEED = 15;
const BALL_MOVEMENT_SPEED = 3;

let score = 0;
let bricksArray = [];
let ballMovementTimer = null;
let ballDiv = null;
let userBrickDiv = null;
let brickDivs = null;

const gridDiv = document.getElementById("grid");
const scoreSpan = document.getElementById("score");
const stateOfGameSpan = document.getElementById("state_of_game");

let orgUserBrickPos = {
    x: BOARD_WIDTH / 2 - BRICK_WIDTH / 2,
    y: GUTTER
};
let currentUserBrickPos = {};

let orgBallPos = {
    x: BOARD_WIDTH / 2 - BALL_WIDTH / 2,
    y: 3 * GUTTER
}
let currentBallPos = {};

let orgBallMovement = {
    x: BALL_MOVEMENT_SPEED,
    y: BALL_MOVEMENT_SPEED
};
let currentBallMovement = {};

document.getElementById("reset_board").addEventListener("click", () => {
    location.reload();
    designBoard();
});

class Brick {
    constructor(x, y) {
        this.left = x;
        this.right = x + BRICK_WIDTH;
        this.bottom = y;
        this.top = y + BOARD_HEIGHT;
    }
}

function designBoard() {
    // ! - Reset Score
    score = 0;
    scoreSpan.innerText = score;
    stateOfGameSpan.innerText = "PLAYING";

    // ! - Draw board
    gridDiv.style.height = BOARD_HEIGHT + "px";
    gridDiv.style.width = BOARD_WIDTH + "px";

    // ! - Draw Bricks
    let posX = GUTTER;
    let posY = BOARD_HEIGHT - 3 * GUTTER;

    for (let i = 0; i < NO_OF_BRICKS; i++) {
        if ((posX + BRICK_WIDTH + GUTTER) > BOARD_WIDTH) {
            posX = GUTTER;
            posY -= BRICK_HEIGHT + GUTTER;
        }
        bricksArray.push(new Brick(posX, posY));

        const newBrick = document.createElement("div");
        newBrick.className = "brick";
        drawBrick(newBrick, posX, posY);

        posX += BRICK_WIDTH + GUTTER;
    }
    brickDivs = document.querySelectorAll(".brick");

    // ! - Draw User's Tile
    currentUserBrickPos = orgUserBrickPos;

    userBrickDiv = document.createElement("div");
    userBrickDiv.className = "user_tile";
    drawBrick(userBrickDiv, currentUserBrickPos.x, currentUserBrickPos.y);

    // ! - Attach Event Listener to User's Tile
    document.addEventListener("keydown", moveUserBrick);

    // ! - Draw the Ball
    currentBallPos = orgBallPos;

    ballDiv = document.createElement("div");
    ballDiv.className = "ball";
    drawBall();

    // ! - Move The Ball
    currentBallMovement = orgBallMovement;
    ballMovementTimer = setInterval(moveBall, 30);
}
designBoard();

function drawBrick(obj, x, y) {
    obj.style.height = BRICK_HEIGHT + "px";
    obj.style.width = BRICK_WIDTH + "px";
    obj.style.left = x + "px";
    obj.style.bottom = y + "px";

    gridDiv.appendChild(obj);
}

function drawBall() {
    ballDiv.style.height = BALL_HEIGHT + "px";
    ballDiv.style.width = BALL_WIDTH + "px";
    ballDiv.style.left = currentBallPos.x + "px";
    ballDiv.style.bottom = currentBallPos.y + "px";

    gridDiv.appendChild(ballDiv);
}

function moveUserBrick(e) {
    switch (e.key) {
        case "ArrowLeft": {
            if (currentUserBrickPos.x >= 8) {
                currentUserBrickPos.x -= USER_BRICK_MOVEMENT_SPEED;
                drawBrick(userBrickDiv, currentUserBrickPos.x, currentUserBrickPos.y);
            }
            break;
        }
        case "ArrowRight": {
            if (currentUserBrickPos.x <= BOARD_WIDTH - BRICK_WIDTH - 8)
                currentUserBrickPos.x += USER_BRICK_MOVEMENT_SPEED;
            drawBrick(userBrickDiv, currentUserBrickPos.x, currentUserBrickPos.y);
        }
    }
}

function moveBall() {
    currentBallPos.x += currentBallMovement.x;
    currentBallPos.y += currentBallMovement.y;

    checkBallCollision();

    drawBall();
}

function checkBallCollision() {
    // ! Check if Brick is Hit
    for (let i = 0; i < bricksArray.length; i++) {
        if (bricksArray[i] &&
            ((currentBallPos.x + BALL_WIDTH / 2) >= bricksArray[i].left && (currentBallPos.x + BALL_WIDTH / 2) <= bricksArray[i].right) &&
            ((currentBallPos.y + BALL_HEIGHT) >= bricksArray[i].bottom && (currentBallPos.y + BALL_HEIGHT) <= bricksArray[i].top)
        ) {
            brickDivs[i].classList.remove("brick");
            currentBallMovement.y = -currentBallMovement.y;
            bricksArray[i] = undefined;
            scoreSpan.innerText = ++score;
            break;
        }
    }
    if (score === NO_OF_BRICKS) {
        clearInterval(ballMovementTimer);
        document.removeEventListener("keydown", moveUserBrick);
        stateOfGameSpan.innerText = "YOU WON!!";
    }

    // ! Check if User's Tile is Hit
    if (
        ((currentBallPos.x + BALL_WIDTH / 2) >= currentUserBrickPos.x && (currentBallPos.x + BALL_WIDTH / 2) <= currentUserBrickPos.x + BRICK_WIDTH) &&
        (currentBallPos.y >= currentUserBrickPos.y && currentBallPos.y <= (currentUserBrickPos.y + BRICK_HEIGHT))
    ) {
        currentBallMovement.y = -currentBallMovement.y;
    }

    // ! - Check left & right boundry of the board is Hit
    if (currentBallPos.x <= 0 || (currentBallPos.x + BALL_WIDTH) >= BOARD_WIDTH) {
        currentBallMovement.x = -currentBallMovement.x;
        for (let i = 0; i < 1000; i++) { }
    }

    // ! - Check top boundary of the board is Hit
    if ((currentBallPos.y + BALL_HEIGHT) >= BOARD_HEIGHT) {
        currentBallMovement.y = -currentBallMovement.y;
    }

    // ! - Check bottom boundary of the board is Hit
    if (currentBallPos.y <= 0) {
        currentBallPos.y = 0;
        clearInterval(ballMovementTimer);
        document.removeEventListener("keydown", moveUserBrick);
        stateOfGameSpan.innerText = "GAME OVER";
    }
}
