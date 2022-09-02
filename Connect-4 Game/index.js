let currentPlayer = 1;

function createBoard() {
    const grid = document.getElementById("grid");

    for (let i = 0; i < 49; i++) {
        if (i < 42) {
            const square = document.createElement("div");
            grid.appendChild(square);
        }
        else {
            const square = document.createElement("div");
            square.className = "taken";
            grid.appendChild(square);
        }
    }
}
createBoard();