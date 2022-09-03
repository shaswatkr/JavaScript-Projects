let currentPlayer = 1;

function createBoard() {
    const gridDiv = document.getElementById("grid");

    for (let i = 0; i < 49; i++) {
        const squareNewDiv = document.createElement("div");
        squareNewDiv.setAttribute("square-id", i);
        squareNewDiv.addEventListener("click", addPlayerPiece);

        if (i >= 42) {
            squareNewDiv.classList = "taken hidden";
        }

        gridDiv.appendChild(squareNewDiv);
    }
}
createBoard();

const squaresDiv = document.querySelectorAll("#grid div");

function addPlayerPiece(e) {
    let result = null;
    let squareId = parseInt(e.srcElement.getAttribute("square-id"));

    const currentPlayerSpan = document.getElementById("current_player");

    if (squaresDiv[squareId + 7].classList.contains("taken")) {
        squaresDiv[squareId].classList.add("taken");

        if (currentPlayer === 1) {
            squaresDiv[squareId].classList.add("player_one");
        }
        else {
            squaresDiv[squareId].classList.add("player_two");
        }

        result = gameWinLogic(squareId, currentPlayer);

        squaresDiv[squareId].removeEventListener("click", addPlayerPiece);

        if (result === false) {
            currentPlayer = currentPlayer === 1 ? 2 : 1;
            currentPlayerSpan.innerText = currentPlayer;
        }
        else if (result === "No more moves left!") {
            squaresDiv.forEach(each => each.removeEventListener("click", addPlayerPiece));
            document.getElementById("result").innerText = result;
        }
        else {
            squaresDiv.forEach(each => each.removeEventListener("click", addPlayerPiece));
            document.getElementById("result").innerText = `Player ${currentPlayer} WINS!!`;
        }
    }
    else {
        console.warn("Can't put here");
    }
}

function gameWinLogic(squareId, player) {
    // ! - Check for Player 1, if any of the logic is satisifed or not
    if (player === 1) {
        const clasListToCheck = ["taken", "player_one"];

        //  ! - Check Downward direction
        if (
            squareId < 21 &&
            clasListToCheck.every(e => squaresDiv[squareId + 7].classList.contains(e)) &&
            clasListToCheck.every(e => squaresDiv[squareId + 14].classList.contains(e)) &&
            clasListToCheck.every(e => squaresDiv[squareId + 21].classList.contains(e))
        ) {
            return "1";
        }
        // ! - Check Down-Right direction
        else if (
            ((squareId >= 0 && squareId < 4) || (squareId >= 7 && squareId < 11) || (squareId >= 14 && squareId < 18)) &&
            clasListToCheck.every(e => squaresDiv[squareId + 8].classList.contains(e)) &&
            clasListToCheck.every(e => squaresDiv[squareId + 16].classList.contains(e)) &&
            clasListToCheck.every(e => squaresDiv[squareId + 24].classList.contains(e))
        ) {
            return "2";
        }
        // ! - Check Down-Left direction
        else if (
            ((squareId >= 3 && squareId < 7) || (squareId >= 10 && squareId < 14) || (squareId >= 17 && squareId < 21)) &&
            clasListToCheck.every(e => squaresDiv[squareId + 6].classList.contains(e)) &&
            clasListToCheck.every(e => squaresDiv[squareId + 12].classList.contains(e)) &&
            clasListToCheck.every(e => squaresDiv[squareId + 18].classList.contains(e))
        ) {
            return "3";
        }
        // ! - Check Right direction
        else if (
            ((squareId >= 0 && squareId < 4) || (squareId >= 7 && squareId < 11) || (squareId >= 14 && squareId < 18) ||
                (squareId >= 21 && squareId < 25) || (squareId >= 28 && squareId < 31) || (squareId >= 35 && squareId < 39)) &&
            clasListToCheck.every(e => squaresDiv[squareId + 1].classList.contains(e)) &&
            clasListToCheck.every(e => squaresDiv[squareId + 2].classList.contains(e)) &&
            clasListToCheck.every(e => squaresDiv[squareId + 3].classList.contains(e))
        ) {
            return "4";
        }
        // ! - Check Left direction
        else if (
            ((squareId >= 3 && squareId < 7) || (squareId >= 10 && squareId < 14) || (squareId >= 17 && squareId < 21) ||
                (squareId >= 24 && squareId < 28) || (squareId >= 31 && squareId < 35) || (squareId >= 38 && squareId < 42)) &&
            clasListToCheck.every(e => squaresDiv[squareId - 1].classList.contains(e)) &&
            clasListToCheck.every(e => squaresDiv[squareId - 2].classList.contains(e)) &&
            clasListToCheck.every(e => squaresDiv[squareId - 3].classList.contains(e))
        ) {
            return "5";
        }
    }

    // ! - Check for Player 2, if any of the logic is satisifed or not
    else if (player === 2) {
        const clasListToCheck = ["taken", "player_two"];

        //  ! - Check Downward direction
        if (
            squareId < 21 &&
            clasListToCheck.every(e => squaresDiv[squareId + 7].classList.contains(e)) &&
            clasListToCheck.every(e => squaresDiv[squareId + 14].classList.contains(e)) &&
            clasListToCheck.every(e => squaresDiv[squareId + 21].classList.contains(e))
        ) {
            return "1";
        }
        // ! - Check Down-Right direction
        else if (
            ((squareId >= 0 && squareId < 4) || (squareId >= 7 && squareId < 11) || (squareId >= 14 && squareId < 18)) &&
            clasListToCheck.every(e => squaresDiv[squareId + 8].classList.contains(e)) &&
            clasListToCheck.every(e => squaresDiv[squareId + 16].classList.contains(e)) &&
            clasListToCheck.every(e => squaresDiv[squareId + 24].classList.contains(e))
        ) {
            return "2";
        }
        // ! - Check Down-Left direction
        else if (
            ((squareId >= 3 && squareId < 7) || (squareId >= 10 && squareId < 14) || (squareId >= 17 && squareId < 21)) &&
            clasListToCheck.every(e => squaresDiv[squareId + 6].classList.contains(e)) &&
            clasListToCheck.every(e => squaresDiv[squareId + 12].classList.contains(e)) &&
            clasListToCheck.every(e => squaresDiv[squareId + 18].classList.contains(e))
        ) {
            return "3";
        }
        // ! - Check Right direction
        else if (
            ((squareId >= 0 && squareId < 4) || (squareId >= 7 && squareId < 11) || (squareId >= 14 && squareId < 18) ||
                (squareId >= 21 && squareId < 25) || (squareId >= 28 && squareId < 31) || (squareId >= 35 && squareId < 39)) &&
            clasListToCheck.every(e => squaresDiv[squareId + 1].classList.contains(e)) &&
            clasListToCheck.every(e => squaresDiv[squareId + 2].classList.contains(e)) &&
            clasListToCheck.every(e => squaresDiv[squareId + 3].classList.contains(e))
        ) {
            return "4";
        }
        // ! - Check Left direction
        else if (
            ((squareId >= 3 && squareId < 7) || (squareId >= 10 && squareId < 14) || (squareId >= 17 && squareId < 21) ||
                (squareId >= 24 && squareId < 28) || (squareId >= 31 && squareId < 35) || (squareId >= 38 && squareId < 42)) &&
            clasListToCheck.every(e => squaresDiv[squareId - 1].classList.contains(e)) &&
            clasListToCheck.every(e => squaresDiv[squareId - 2].classList.contains(e)) &&
            clasListToCheck.every(e => squaresDiv[squareId - 3].classList.contains(e))
        ) {
            return "5";
        }
    }

    let count = 0;
    for (let i = 0; i < 42; i++) {
        if (squaresDiv[i].classList.contains("taken")) {
            count++;
        }
    }
    if (count === 41) {
        return "No more moves left!";
    }
    // if (squaresDiv.every(each => each.classList.contains("taken"))) {
    //     return "No more moves left!";
    // }

    return false;
}
