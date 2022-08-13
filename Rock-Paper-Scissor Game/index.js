let userChoice = null;
let computerChoice = null;
let result = null;

const buttons = document.querySelectorAll("button");

buttons.forEach(eachBtn => eachBtn.addEventListener("click", (e) => {
    userChoice = e.target.id.toUpperCase();
    document.getElementById("user-choice").innerText = userChoice;
    getComputerSelection();
    getResult();
}));

function getComputerSelection() {
    const random = Math.floor(Math.random() * buttons.length) + 1;

    switch (random) {
        case 1: {
            computerChoice = "ROCK";
            break;
        }
        case 2: {
            computerChoice = "PAPER";
            break;
        }
        case 3: {
            computerChoice = "SCISSOR";
            break;
        }
        default: {
            console.log("The choice selection wasn't in acceptable limits.");
        }
    }

    document.getElementById("computer-choice").innerText = computerChoice;
}

function getResult() {
    const resultDiv = document.getElementById("result");

    if (computerChoice === null) {
        console.log("Some Error Occured in Computer Selection!!");
    }
    else {
        if (userChoice === computerChoice) {
            result = "Game Draw!!";
        }
        else if (userChoice === "ROCK" && computerChoice === "SCISSOR") {
            result = "You Won!!";
        }
        else if (userChoice === "ROCK" && computerChoice === "PAPER") {
            result = "You Lost!!";
        }
        else if (userChoice === "PAPER" && computerChoice === "ROCK") {
            result = "You Won!!";
        }
        else if (userChoice === "PAPER" && computerChoice === "SCISSOR") {
            result = "You Lost!!";
        }
        else if (userChoice === "SCISSOR" && computerChoice === "PAPER") {
            result = "You Won!!";
        }
        else if (userChoice === "SCISSOR" && computerChoice === "ROCK") {
            result = "You Lost!!";
        }

        resultDiv.innerText = result;
    }
}