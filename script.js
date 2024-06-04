const totalCards = 12;
const availableImages = [
    'imagenes/escoba.png',
    'imagenes/image2.png',
    'imagenes/image3.png',
    'imagenes/image4.png'
];
const availableLetters = ['A', 'K', 'Q', 'J'];
let cards = [];
let selectedCards = [];
let valuesUsed = [];
let currentMove = 0;
let currentAttempts = 0;
const maxAttempts = 7;

let cardTemplate = '<div class="card"><div class="back"></div><div class="face"></div></div>';

function activate(e) {
    if (currentMove < 2 && !e.target.classList.contains('active')) {
        e.target.classList.add('active');
        selectedCards.push(e.target);

        if (++currentMove == 2) {
            currentAttempts++;
            document.querySelector('#stats').innerHTML = currentAttempts + ' intentos';

            if (selectedCards[0].querySelector('.face').innerHTML === selectedCards[1].querySelector('.face').innerHTML) {
                selectedCards = [];
                currentMove = 0;
            } else {
                setTimeout(() => {
                    selectedCards[0].classList.remove('active');
                    selectedCards[1].classList.remove('active');
                    selectedCards = [];
                    currentMove = 0;
                }, 600);
            }

            if (currentAttempts >= maxAttempts) {
                alert('Juego terminado! Has alcanzado el máximo de intentos.');
                resetGame();
            }
        }
    }
}

function randomValue() {
    let rnd = Math.floor(Math.random() * (availableImages.length + availableLetters.length));
    let values = valuesUsed.filter(value => value === rnd);
    if (values.length < 2) {
        valuesUsed.push(rnd);
    } else {
        randomValue();
    }
}

function getFaceContent(value) {
    if (value < availableImages.length) {
        return `<img src="${availableImages[value]}" alt="Card Image">`;
    } else {
        return availableLetters[value - availableImages.length];
    }
}

function resetGame() {
    document.querySelector('#game').innerHTML = '';
    cards = [];
    selectedCards = [];
    valuesUsed = [];
    currentMove = 0;
    currentAttempts = 0;
    document.querySelector('#stats').innerHTML = '0 intentos';
    initGame();
}

function initGame() {
    for (let i = 0; i < totalCards; i++) {
        let div = document.createElement('div');
        div.innerHTML = cardTemplate;
        cards.push(div);
        document.querySelector('#game').append(cards[i]);
        randomValue();
        let faceContent = getFaceContent(valuesUsed[i]);
        cards[i].querySelector('.face').innerHTML = faceContent;
        cards[i].querySelector('.card').addEventListener('click', activate);
    }
}

document.getElementById('resetButton').addEventListener('click', resetGame);

initGame();
