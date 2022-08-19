const BOARD_HEIGHT = 300;
const BOARD_WIDTH = 560;
const BRICK_HEIGHT = 20;
const BRICK_WIDTH = 100;
const BALL_HEIGHT = 20;
const BALL_WIDTH = 20;
const GUTTER = 10;
const NO_OF_BRICKS = 15;
const USER_BRICK_MOVEMENT = 15;

let score = 0;
let bricksArray = [];
let ball = null;
let userBrick = null;
const grid = document.getElementById("grid");
const scoreSpan = document.getElementById("score");

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

document.getElementById("reset_board").addEventListener("click", designBoard);
document.addEventListener("keydown", moveUserBrick);

class Brick {
    constructor(x, y) {
        this.leftBottom = { x, y };
        this.rightBottom = { x, y: y + BRICK_WIDTH };
        this.leftTop = { x: x + BOARD_HEIGHT, y };
        this.rightTop = { x: x + BOARD_HEIGHT, y: y + BRICK_WIDTH };
    }
}

function designBoard() {
    // ! - Reset Score
    score = 0;
    scoreSpan.innerText = score;

    // ! - Draw board
    grid.style.height = BOARD_HEIGHT + "px";
    grid.style.width = BOARD_WIDTH + "px";

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

    // ! - Draw User's Tile
    currentUserBrickPos = orgUserBrickPos;

    userBrick = document.createElement("div");
    userBrick.className = "user_tile";
    drawBrick(userBrick, currentUserBrickPos.x, currentUserBrickPos.y);

    // ! - Draw the Ball
    currentBallPos = orgBallPos;

    ball = document.createElement("div");
    ball.className = "ball";
    drawBall();
}
designBoard();

function drawBrick(obj, x, y) {
    obj.style.height = BRICK_HEIGHT + "px";
    obj.style.width = BRICK_WIDTH + "px";
    obj.style.left = x + "px";
    obj.style.bottom = y + "px";

    grid.appendChild(obj);
}

function drawBall() {
    ball.style.height = BALL_HEIGHT + "px";
    ball.style.width = BALL_WIDTH + "px";
    ball.style.left = currentBallPos.x + "px";
    ball.style.bottom = currentBallPos.y + "px";

    grid.appendChild(ball);
}

function moveUserBrick(e) {
    switch (e.key) {
        case "ArrowLeft": {
            if (currentUserBrickPos.x >= 8) {
                currentUserBrickPos.x -= USER_BRICK_MOVEMENT;
                drawBrick(userBrick, currentUserBrickPos.x, currentUserBrickPos.y);
            }
            break;
        }
        case "ArrowRight": {
            if (currentUserBrickPos.x <= BOARD_WIDTH - BRICK_WIDTH - 8)
                currentUserBrickPos.x += USER_BRICK_MOVEMENT;
            drawBrick(userBrick, currentUserBrickPos.x, currentUserBrickPos.y);
        }
    }
}

