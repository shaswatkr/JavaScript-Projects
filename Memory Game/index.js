let result = 0;
let noOfTries = 0;
let cardData = [];
let cardPair = [];
let currentCardPair = [];

const resultSpan = document.getElementById("result");
const noOfTriesSpan = document.getElementById("no-of-tries");

resultSpan.innerText = 0;
noOfTriesSpan.innerText = 0;

document.getElementById("refresh").addEventListener("click", refreshBoard);

fetch("./data.json")
    .then(res => res.json())
    .then(data => {
        cardData = [...data.sort(() => 0.5 - Math.random()), ...data.sort(() => 0.5 - Math.random())];

        setBoard();
    })
    .catch(err => console.log(err));

function refreshBoard() {
    setBoard();

    resultSpan.innerText = 0;
    noOfTriesSpan.innerText = 0;
}

function setBoard() {
    const grid = document.getElementById("grid");

    grid.innerHTML = "";

    for (let i = 0; i < 12; i++) {
        const imageCard = document.createElement("img");
        imageCard.setAttribute("src", "./assets/blank.png");
        imageCard.setAttribute("data-id", i);
        imageCard.className = "card";
        imageCard.addEventListener("click", flipCard);

        grid.appendChild(imageCard);
    }
}

function flipCard() {
    const id = this.getAttribute("data-id");
    this.setAttribute("src", cardData[id].img);

    cardPair.push(cardData[id].name);
    currentCardPair.push(id);

    if (cardPair.length === 2) {
        if (cardPair[0] === cardPair[1]) {
            result++;
            resultSpan.innerText = result;
            noOfTries++;
            noOfTriesSpan.innerText = noOfTries;

            cardPair = [];
            currentCardPair = []
        }
        else {
            noOfTries++;
            noOfTriesSpan.innerText = noOfTries;

            setTimeout(() => {
                const cards = document.querySelectorAll(".card");

                currentCardPair.forEach(each => {
                    cards[each].setAttribute("src", "./assets/blank.png");
                });

                cardPair = [];
                currentCardPair = [];
            }, 1000);
        }
    }
}