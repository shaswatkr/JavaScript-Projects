let result = 0;
let noOfTries = 0;
let cardData = [];
let cardPair = [];
let currentCardPairId = [];

const resultSpan = document.getElementById("result");
const noOfTriesSpan = document.getElementById("no-of-tries");

document.getElementById("refresh").addEventListener("click", refreshBoard);

fetch("./data.json")
    .then(res => res.json())
    .then(data => {
        cardData = [...data, ...data];

        refreshBoard();
    })
    .catch(err => {
        console.warn(err);

        const data = [
            {
                "name": "cheeseburger",
                "img": "assets/cheeseburger.png"
            },
            {
                "name": "fries",
                "img": "assets/fries.png"
            },
            {
                "name": "hotdog",
                "img": "assets/hotdog.png"
            },
            {
                "name": "ice-cream",
                "img": "assets/ice-cream.png"
            },
            {
                "name": "milkshake",
                "img": "assets/milkshake.png"
            },
            {
                "name": "pizza",
                "img": "assets/pizza.png"
            }
        ];
        cardData = [...data.sort(() => 0.5 - Math.random()), ...data.sort(() => 0.5 - Math.random())].sort(() => 0.5 - Math.random());

        refreshBoard();
    });

function refreshBoard() {
    setBoard();

    cardData.sort(() => 0.5 - Math.random());
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
    currentCardPairId.push(id);

    if (cardPair.length === 2) {
        checkFlippedPair();
    }
}

function checkFlippedPair() {
    const cards = document.querySelectorAll(".card");

    if (cardPair[0] === cardPair[1]) {
        resultSpan.innerText = ++result;

        currentCardPairId.forEach(eachId => {
            cards[eachId].removeEventListener("click", flipCard);
        });

        currentCardPairId = [];

        if (result === 6) {
            resultSpan.innerText = "Yo Ho! You won the game.";
        }
    }
    else {
        setTimeout(() => {
            currentCardPairId.forEach(eachId => {
                cards[eachId].setAttribute("src", "./assets/blank.png");
            });

            currentCardPairId = [];
        }, 1000);
    }

    cardPair = [];
    noOfTriesSpan.innerText = ++noOfTries;
}