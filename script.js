// Game variables
let cards = [];
let openCards = [];
let moves = 0;
let level = 1;
let boardSize;

// Game board elements
const gameBoard = document.getElementById('game-board');
const levelDisplay = document.getElementById('level');
const movesDisplay = document.getElementById('moves');
const restartButton = document.getElementById('restart-btn');
const gameMessage = document.getElementById('game-message');

// Initialize the game
function initGame() {
    gameMessage.textContent = '';
    moves = 0;
    movesDisplay.textContent = moves;
    levelDisplay.textContent = level;

    switch (level) {
        case 1:
            boardSize = 8;
            break;
        case 2:
            boardSize = 12;
            break;
        case 3:
            boardSize = 16;
            break;
    }

    cards = createCards(boardSize);
    shuffleCards(cards);
    renderCards();
}

// Create card elements
function createCards(numCards) {
    const cardValues = [];
    const cardElements = [];

    for (let i = 1; i <= numCards / 2; i++) {
        cardValues.push({ value: i }, { value: i });
    }

    for (const card of cardValues) {
        cardElements.push(card);
    }

    return cardElements;
}

// Shuffle cards
function shuffleCards(cards) {
    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
    }
}

// Render cards on the game board
function renderCards() {
    gameBoard.innerHTML = '';
    cards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.value = card.value;
        cardElement.addEventListener('click', flipCard);

        const frontFace = document.createElement('div');
        frontFace.classList.add('front');

        const backFace = document.createElement('img');
        backFace.classList.add('back');
        backFace.src = `images/level${level}/${card.value}.png`;
        backFace.alt = `Card ${card.value}`;

        cardElement.appendChild(frontFace);
        cardElement.appendChild(backFace);
        gameBoard.appendChild(cardElement);
    });
}

// Flip a card
function flipCard(event) {
    const card = event.currentTarget;

    if (!card.classList.contains('flipped') && !card.classList.contains('matched') && openCards.length < 2) {
        card.classList.add('flipped');
        openCards.push(card);

        if (openCards.length === 2) {
            moves++;
            movesDisplay.textContent = moves;
            checkMatch();
        }
    }
}

// Check for a match
function checkMatch() {
    const [card1, card2] = openCards;

    if (card1.dataset.value === card2.dataset.value) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        openCards = [];

        if (document.querySelectorAll('.matched').length === cards.length) {
            if (level < 3) {
                setTimeout(() => {
                    level++;
                    initGame();
                }, 1000);
            } else {
                gameMessage.textContent = 'Congratulations! You have completed the game!';
            }
        }
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            openCards = [];
        }, 1000);
    }
}

// Restart the game
restartButton.addEventListener('click', () => {
    level = 1;
    initGame();
});

// Start the game
initGame();