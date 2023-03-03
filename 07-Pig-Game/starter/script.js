'use strict';

const player0Element = document.querySelector('.player--0');
const player1Element = document.querySelector('.player--1');
const score0Element = document.getElementById('score--0');
let current0Element = document.getElementById('current--0');
const score1Element = document.getElementById('score--1');
let current1Element = document.getElementById('current--1');
const diceElement = document.querySelector('.dice');

let scores, currentScore, activePlayer, playing;

const init = function() {
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    score0Element.textContent = 0;
    score1Element.textContent = 0;
    current0Element.textContent = 0;
    current1Element.textContent = 0;

    diceElement.classList.add('hidden');
    player0Element.classList.remove('player--winner');
    player1Element.classList.remove('player--winner');
    player0Element.classList.add('player--active');
    player1Element.classList.remove('player--active');
};

init();

const switchPlayer = function() {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0Element.classList.toggle('player--active');
    player1Element.classList.toggle('player--active');
};

const player = document.querySelector('.player');
// let currentScore = document.querySelector('.current');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const newScore = 0;
const newCurrent = 0;
btnRoll.addEventListener('click', function() {
    if (playing) {
        //1. Gerenating the random dice
        const dice = Math.trunc(Math.random() * 6) + 1;
        //2.Display the dice
        diceElement.classList.remove('hidden');
        diceElement.src = `dice-${dice}.png`;
        if (dice !== 1) {
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent =
                currentScore;
            // current0Element.textContent = currentScore;
        }
        //Switching the player
        else {
            switchPlayer();
        }
    }
});

btnHold.addEventListener('click', function() {
    if (playing) {
        //1. Add current score to the active player's score
        scores[activePlayer] += currentScore;

        document.getElementById(`score--${activePlayer}`).textContent =
            scores[activePlayer];
        //Check if the player's score >= 100
        if (scores[activePlayer] >= 100) {
            diceElement.classList.add('hidden');
            playing = false;
            document
                .querySelector(`.player--${activePlayer}`)
                .classList.add('player--winner');
            document
                .querySelector(`.player--${activePlayer}`)
                .classList.remove('player--active');
            //Finish the game
        } else {
            switchPlayer();

            //Switch the next player
        }
    }
});
btnNew.addEventListener('click', init);