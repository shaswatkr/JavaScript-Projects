const BOARD_HEIGHT = 300;
const BOARD_WIDTH = 560;
const BRICK_HEIGHT = 20;
const BRICK_WIDTH = 100;
const GUTTER = 10;
const NO_OF_BRICKS = 15;

let score = 0;
let bricksArray = [];
const grid = document.getElementById("grid");
const scoreSpan = document.getElementById("score");

document.getElementById("reset_board").addEventListener("click", designBoard);

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
        newBrick.style.height = BRICK_HEIGHT + "px";
        newBrick.style.width = BRICK_WIDTH + "px";
        newBrick.style.left = posX + "px";
        newBrick.style.bottom = posY + "px";
        grid.appendChild(newBrick);

        posX += BRICK_WIDTH + GUTTER;
    }

    // ! - Draw User's Tile
    let startPos = {
        x: BOARD_WIDTH / 2 - BRICK_WIDTH / 2,
        y: GUTTER
    };

    const userTile = document.createElement("div");
    userTile.className = "user_tile";
    userTile.style.height = BRICK_HEIGHT + "px";
    userTile.style.width = BRICK_WIDTH + "px";
    userTile.style.left = startPos.x + "px";
    userTile.style.bottom = startPos.y + "px";
    grid.appendChild(userTile);
}
designBoard();


