'use strict';

//Button Selection
const resetGame = document.querySelector('.again');
const playBtn = document.querySelector('.check-score');
const scoreCount = document.querySelector('.score');
const scoreRecord = document.querySelector('.highscore');
const scoreBoard = document.querySelector('.current-score');
const message = document.querySelector('.message');
let input = Number(document.querySelector('.input').value);
const body = document.querySelector('body');

// Score and Highscore
let score = 20;
let highscore = 0;

//Secret Number
let secretNumber = Math.trunc(Math.random() * 20 + 1);
console.log(secretNumber);
scoreCount.textContent = score;
console.log(scoreCount.textContent);

resetGame.addEventListener('click', resetWholeGame);
playBtn.addEventListener('click', function (event) {
  console.log(typeof input);
  if (!input) {
    message.textContent = 'No number';
  }
  if (input > secretNumber) {
    message.textContent = ' Number too High';
    score--;
  } else if (+input < secretNumber) {
    message.textContent = 'Number too Low';
    score--;
  } else {
    message.textContent = 'Congrats!!! You guessed it right';
    scoreBoard.textContent = +input;
    scoreRecord.textContent = +input;
    // input.value = '';
    body.style.background = '#60b347';
  }
});

function resetWholeGame() {
  input = '';
  body.style.background = '#222';
  scoreBoard.textContent = '?';
}
