'use strict';
// document.querySelector('.message').textContent = '🎉Correct Number!';
// document.querySelector('.number').textContent = 13;
// document.querySelector('.score').textContent = 10;

let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highscore = 0;
// let guessTimes = 0;

document.querySelector('.check').addEventListener('click', function() {
    // document.querySelector('.guess').value = 30;
    const guess = Number(document.querySelector('.guess').value);
    // console.log(guess, typeof guess);

    if (!guess) {
        document.querySelector('.message').textContent = '⛔No number!';
    } else if (guess === secretNumber) {
        // guessTimes++;
        document.querySelector('.message').textContent = `🎉Correct Guess!`;
        document.querySelector('body').style.backgroundColor = '#60b347';
        document.querySelector('.number').style.width = '30rem';
        document.querySelector('.number').textContent = secretNumber;
        if (score > highscore) {
            highscore = score;
            document.querySelector('.highscore').textContent = highscore;
        }
        // else {
        //     document.querySelector('.highscore').textContent = highscore;
        // }
    } else if (guess > secretNumber) {
        if (score > 1) {
            document.querySelector('.message').textContent = 'Number too high...';
            score--;
            document.querySelector('.score').textContent = score;
        } else {
            document.querySelector('.message').textContent = 'You lost the game...';
            document.querySelector('.score').textContent = 0;
        }
    } else if (guess < secretNumber) {
        if (score > 1) {
            document.querySelector('.message').textContent = 'Number too low...';
            score--;
            document.querySelector('.score').textContent = score;
        } else {
            document.querySelector('.message').textContent = 'You lost the game...';
            document.querySelector('.score').textContent = 0;
        }
    }
});
// let score1 = 20;
const secretNumber1 = Math.trunc(Math.random() * 20) + 1;
let replay = false;

document.querySelector('.again').addEventListener('click', function() {
    score = 20;
    secretNumber = Math.trunc(Math.random() * 20) + 1;
    document.querySelector('.message').textContent = `Start guessing...`;
    document.querySelector('.guess').value = '';
    document.querySelector('.score').textContent = score;
    document.querySelector('.number').textContent = '?';
    document.querySelector('body').style.backgroundColor = '#222';
    document.querySelector('.number').style.width = '15rem';
});