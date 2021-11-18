const body = document.querySelector("body");
const oneCard = document.getElementById("oneCard");

let deck = {};

async function getDeck() {
    const res = await fetch(
        "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
    const data = await res.json();

    deck = data;
    console.log(deck);
}

getDeck();

const startGameButton = document.getElementById("startGame");
startGameButton.addEventListener("click", startGame);

let cardsValue = [];

alert("Welcome to Higher or Lower Card Game!\nType 'h' for higher or 'l' for lower.\nYou win at 10 points. Press Cancel to quit. \nGOOD LUCK!");


async function startGame() {
    const res = await fetch(`https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=1`);
    const data = await res.json();

    oneCard.children[0].innerText = data.cards[0].value + " OF " + data.cards[0].suit;
    oneCard.children[1].setAttribute("src", data.cards[0].image);

    let cardValue = data.cards[0].value;
    switch (cardValue) {
        case "JACK":
            cardValue = 11;
            break;
        case "QUEEN":
            cardValue = 12;
            break;
        case "KING":
            cardValue = 13;
            break;
        case "ACE":
            cardValue = 14;
            break;
    }

    cardsValue.push(cardValue);

    return data;
};

let highlowButton = document.getElementById("highlowButton");
highlowButton.addEventListener("click", play);

async function play() {
    let score = 0;

    let scoreLog = document.createElement("p");
    body.appendChild(scoreLog);

    while (score < 10) {
        const data = await startGame();
        let cardsValueNum = cardsValue.map(Number);

        let prevCard = cardsValueNum[cardsValueNum.length - 2];
        let newCard = cardsValueNum[cardsValueNum.length - 1];

        let guess = prompt(`Higher or lower than ${prevCard}?`);
        if ((newCard > prevCard && guess === "h") || (newCard < prevCard && guess === "l")) {
            score++;
            alert(`Yess! That is correct! \nThe card is:${newCard} \nCurrent score is ` + score);
        } else if (guess === null) {
            alert("Ok, it's time to say goodbye...");
            break;
        } else {
            alert("Nope. Better luck next time." + `\nThe number was:${newCard}`);
        }

        scoreLog.innerText = "Score = " + score;
    };

    alert(`Your score was: ${score}`);
};