const MAX = 13;
const MIN = 1;
let sum = 0;
let cards = [];
let gameStarted = false;
const profile = {
    name: "Shaswat",
    chips: 100
};

const cardBlock = document.getElementById("cards");
const sumBlock = document.getElementById("sum");
const displayMsgBlock = document.getElementById("displayMsg");
const btnStart = document.getElementById("btnStart");
const btnNewCard = document.getElementById("btnNewCard");
document.getElementById("profile").innerText = `${profile.name}: $${profile.chips}`;

btnStart.addEventListener("click", startGame);
btnNewCard.addEventListener("click", nextCard);

function getNewCard() {
    const card = Math.floor(Math.random() * (MAX - MIN + 1) + MIN);

    if (card >= 10) {
        return 10
    }
    else if (card == 1) {
        return 11;
    }
    else {
        return card;
    }
}

function checkScore() {
    if (sum === 21) {
        displayMsgBlock.innerText = "YEAH!! You won Blackjack.";
        btnNewCard.disabled = true;
    }
    else if (sum > 21) {
        displayMsgBlock.innerText = "You're out of the game, as you passes 21 score!";
        btnNewCard.disabled = true;
    }
    else {
        displayMsgBlock.innerText = "Do you want to draw another card?";
    }
}

function startGame() {
    sum = 0;
    btnNewCard.disabled = false;

    const firstCard = getNewCard();
    const secondCard = getNewCard();

    cards.push(firstCard);
    cards.push(secondCard);
    sum = firstCard + secondCard;

    cardBlock.innerText = `${firstCard} - ${secondCard}`;
    sumBlock.innerText = sum;
    checkScore();
}

function nextCard() {
    const newCard = getNewCard();

    cards.push(newCard);
    sum += newCard;

    cardBlock.innerText += ` - ${newCard}`;
    sumBlock.innerText = sum;
    checkScore();
}
