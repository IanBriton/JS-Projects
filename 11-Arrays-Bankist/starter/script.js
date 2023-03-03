'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';

  const moveSort = sort ? movements.slice().sort((a, b) => a - b) : movements;

  moveSort.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = ` 
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type} deposit</div>
        <div class="movements__value">${mov}€</div>
      </div>
  `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDispalayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance}€`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, cur) => acc + cur, 0);
  labelSumIn.textContent = `${incomes} €`;

  const outGoing = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, cur) => acc + cur, 0);
  labelSumOut.textContent = `${Math.abs(outGoing)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, array) => {
      return int >= 1;
    })
    .reduce((acc, inte) => acc + inte, 0);
  labelSumInterest.textContent = `${interest}€`;
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name.at(0))
      .join('');
  });
};
createUsernames(accounts);

//FUNCTION FOR UPDATING UI
const updateUI = function (acc) {
  //Display Movements
  displayMovements(acc.movements);
  //Display Balance
  calcDispalayBalance(acc);
  //Display Suammry
  calcDisplaySummary(acc);
};

//EVENT HANDLERS
let currentAccount;

btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  // console.log(currentAccount);
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //DISPLAY UI
    labelWelcome.textContent = `Welcome back,  ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;
  }

  //Resseting the input fields
  inputLoginPin.value = inputLoginUsername.value = '';
  inputLoginPin.blur();

  //UPDATE UI
  updateUI(currentAccount);
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);
  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    //Add the movement
    currentAccount.movements.push(amount);
    // UPDATE THE UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  //RESETTING THE BUTTONS
  inputTransferTo.value = inputTransferAmount.value = '';
  inputLoginPin.blur();

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    //UPDATE UI
    updateUI(currentAccount);
  }
});

//DELETING A USER ACCOUNT
btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    // console.log(index);

    accounts.splice(index, 1);

    //HIDE UI FROM THE USER WITH THE DELETED ACCOUNT
    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
//SLICE
//Exatracting elements of an array basing on the specific start and end index.
//Can also be used to create a shallow copy of an array
const array = ['a', 'b', 'c', 'd', 'e', 'g', 'h'];
// console.log(array.slice(1, -2));
// console.log(array.slice()); //Creating a shallow copy of the array

//SPLICE
// console.log(array.splice(2)); //Mutates the original array, extracts the spliced elements and returns them, deletes them in return
// console.log(array);

//REVERSE
//Reverses the order of the original array as well mutating the original array.
const arr = [6, 4, 3, 3, 2];
const str = ['a', 'b', 'g', 'j', 'w'];
// console.log(arr.reverse());
// console.log(str.reverse());
// console.log(arr);

//CONCAT
//Used to concatenate two arrays
//Can be used in placees of spread operator because they do the same thing
const letters = array.concat(arr);
// console.log(letters);
// console.log([...array, ...arr]);

//JOIN
//Joins all the elements of the array using the specified parameter

// console.log(letters.join('+'));

//forEach AND forOf Loops, differences
//USING THE FOR LOOP
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// for (const [i, ele] of movements.entries()) {
//   if (ele > 0) {
//     console.log(`Movement ${i + 1}: You deposited Kshs. ${ele}`);
//   } else {
//     console.log(`Movement ${i + 1}: You withdrew Kshs. ${Math.abs(ele)}`);
//   }
// }
// console.log('\n');
// console.log('----USING FOR EACH LOOP---- \n');
// console.log('\n');
//USING THE FOR EACH LOOP
// movements.forEach(function (mov, i, arr) {
// if (mov > 0) {
//   console.log(`Movement ${i + 1}: You deposited Kshs. ${mov}`);
// } else {
//   console.log(`Movement ${i + 1}: You withdrew Kshs. ${Math.abs(mov)}`);
// }
// });

//Maps
// console.log('\n');
// console.log('The use of forEach loop on maps and sets');
// console.log('\n');
// //forEach on Maps and Sets
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);
currencies.forEach(function (value, key, entries) {
  // console.log(`${key}: ${value}`);
});

//Sets
const uniqueCurrencies = new Set([
  'USD',
  'GBP',
  'USD',
  'KSHS',
  'TSH',
  'EURO',
  'USD',
  'USD',
]);
// console.log(uniqueCurrencies);
uniqueCurrencies.forEach(function (value, key, map) {
  // console.log(`${key}: ${value}`);
});

//WORKING WITH ARRAYS
//CODING CHALLENGE #1
const julie1 = [3, 5, 2, 12, 7];
const kate1 = [4, 1, 15, 8, 3];

const julie2 = [9, 16, 6, 8, 3];
const kate2 = [10, 5, 6, 1, 4];
// const newArray = [...arrayJulie, ...arrayKate];

const checkDogs = function (array1, array2) {
  const arrayJulie = array1.slice();
  // console.log(arrayJulie);
  arrayJulie.splice(0, 1);
  arrayJulie.splice(-2, 2);
  // console.log(arrayJulie);
  const arrayKate = array2;
  const newArray = [...arrayJulie, ...arrayKate];
  // console.log(newArray);
  newArray.forEach(function (value, i) {
    // if (value >= 3) {
    //   console.log(`Dog number ${i + 1} is an adult, and is ${value} years old`);
    // } else {
    //   console.log(`Dog number ${i + 1} is still a puppy 🐶`);
    // }
  });
};

checkDogs(julie1, kate1);
// console.log('\n');
checkDogs(julie2, kate2);

const euroToUsd = 1.1;
const movementToUsd1 = movements.map(mov => Math.trunc(mov * euroToUsd));
const movementToUsd = movements.map(function (mov) {
  return Math.trunc(mov * euroToUsd);
});

// console.log(movements);
// console.log(movementToUsd);
// console.log('\n');
// console.log(movementToUsd1);

const moveDescri = movements.map(
  (move, i) =>
    `Movement ${i + 1}: You ${move > 0 ? 'depodited' : 'withdrew'} ${Math.abs(
      move
    )}`
);

// console.log(moveDescri);

// const user = 'Dancan Tsuma Akutuya';

// console.log(username);

//FILTER METHOD
const deposits = movements.filter(function (mov) {
  return mov > 0;
});
// console.log(movements);
// console.log(deposits);

const withdrawal = movements.filter(function (mov) {
  return mov < 0;
});
// console.log(withdrawal);

//REDUCE METHOD
const balance1 = movements.reduce(function (acc, cur, i, arr) {
  return acc + cur;
}, 0);

// console.log(balance1);

//IT CAN ALSO BE USED TO RETURN THE MAXIMUM VALUE IN AN ARRAY
const max = movements.reduce((acc, mov) => (acc > mov ? acc : mov));
// console.log(max);

//CODING CHALLENGE #2
const calcAverageHumanAge = function (ages) {
  const dogsHumans = ages
    .map(function (cur) {
      let humanAge = 0;
      if (cur <= 2) {
        humanAge = 2 * cur;
      } else {
        humanAge = 16 + cur * 4;
      }
      // console.log(humanAge);
      return humanAge;
    })
    .filter(function (acc) {
      if (acc >= 18) {
        // console.log(acc);
        return acc;
      }
    })
    .reduce(function (acc, age, i, cur) {
      return acc + age / cur.length;
    }, 0);
  // console.log(dogsHumans);
  return dogsHumans;
};

calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);

//THE MAGIC OF CHAINING METHOD OF ARRAY METHODS
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// const euroToUsd = 1.1;
const totalDepositInUsd = movements
  .filter(mov => mov > 0)
  .map(mov => mov * euroToUsd)
  .reduce((acc, cur) => acc + cur, 0);
// console.log(totalDepositInUsd);
const calcAverageHumanAge2 = ages =>
  ages
    .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
    .filter(age => age >= 18)
    .reduce((acc, age, i, cur) => acc + age / cur.length, 0);

const avg1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
const avg2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
// console.log(avg1, avg2);

//THE FIND METHOD
//Has the same functionality as filter only that it doesn't return a new array, but only the first element in the array that satisfies the set
// condition.
//It also accepts the callback function
const firstDeposit = movements.find(mov => mov > 0);
// console.log(firstDeposit);

const account = accounts.find(owner => owner.owner === 'Jonas Schmedtmann');
// console.log(accounts);
// console.log(account);

const accountName = accounts.forEach(owner => {
  owner.owner === 'Jessica Davis' ? 'Jessica Davis' : 'No user with such found';
  // console.log(accountName);
});
// console.log(accountName);

//SOME AND EVERY ARRAY METHODS
const deposit = movements.some(mov => mov > 0);
console.log(movements);
console.log(deposit);
const depositAny = movements.every(mov => mov > 0);
console.log(depositAny);

//FLAT AND FLATMAP METHODS ON ARRAY
const arr1 = [[1, 2, 3], [4, 5, 6, 7], 8, 9];
// console.log(arr1.flat());
// for (const [disArray] of arr1.flat()) console.log(disArray);

const accountMovements2 = accounts
  .map(mov => mov.movements)
  .flat()
  .reduce((acc, cur) => acc + cur, 0);
console.log(accountMovements2);
// const allMovements = accountMovements;
// console.log(allMovements);

const accountMovements = accounts
  .flatMap(mov => mov.movements)
  .reduce((acc, cur) => acc + cur, 0);
console.log(accountMovements);

//SORTING
//Basically sorts array in ascending order from the smallet to the largest.
//Incase of integers, it'll sort from zero since integers are zero basec,like from the least to the largest.
//Good method in JavaScript if order is of essence.

const owners = ['Jonas', 'Mark', 'Sam', 'Jeol', 'Mary'];
console.log(owners.sort());
console.log(movements);
console.log(movements.sort());

//ASCENDING ORDER
movements.sort((a, b) => a - b);
console.log(movements);

//DESCENDING ORDER
movements.sort((a, b) => b - a);

console.log(movements);

//MORE WAYS OF CREATING AND FILLING ARRAYS
// CREATE USING THE new Array Method
const numbers = [1, 2, 5.6, 36, 67, 78];
console.log(new Array(1, 2, 5.6, 36, 67, 78));

const x = new Array(7);
console.log(7);
x.fill(1);
console.log(x);

const y = Array.from({ length: 7 }, () => 6);
console.log(y);

const z = Array.from({ length: 100 }, (_, i) =>
  Math.trunc(Math.random() * i + 1)
);
console.log(z);

//PRACTISE ON ARRAY METHODS
//MORE USE CASES OF DIFFERENT ARRAY METHODS
//CHECKING OF THE FLATMAP METHOD
const bankDeposit = accounts
  .flatMap(acc => acc.movements)
  // .flat()
  .filter(dep => dep > 0)
  .reduce((acc, dep) => acc + dep, 0);
console.log(bankDeposit);

//USABILITY OF REDUCE METHOD AS A COUNTER, USE OF PREFIX ++ OPERATOR
const depositMore = accounts
  .flatMap(acc => acc.movements)
  .reduce((count, cur) => (cur >= 1000 ? ++count : count), 0);
console.log(depositMore);

//USE OF REDUCE METHOD TO CREATE OBJECTS BASING OF THE GIVEN ARGUMENTS
//SINCE THE INITIAL POINT OF A REDUCE METHOD IS A ZERO FOR THE CASE OF A NUMBER, FOR THE CASE OF AN ARRAY,
//THE INITIAL POINT OF AN EMPPTY OBJECT OR A YOU CAN PASS IN THE START KEYS AND THE VALUE
const sums = accounts
  .flatMap(acc => acc.movements)
  .reduce(
    (sums, cur) => {
      // cur > 0 ? (sums.deposit += cur) : (sums.withdrawal += cur);
      sums[cur > 0 ? 'deposit' : 'withdrawal'] += cur;
      return sums;
    },
    { deposit: 0, withdrawal: 0 }
  );
console.log(sums);

//WORKING WITH STRINGS USING THE ARRAY METHODS
const convertTitle = function (title) {
  const exeptions = [
    'a',
    'an',
    'the',
    'but',
    'or',
    'on',
    'in',
    'with',
    'and',
    'is',
  ];
  const capitalize = str => str[0].toUpperCase() + str.slice(1);
  const titleCase = title
    .toLowerCase()
    .split(' ')
    .map(word => (exeptions.includes(word) ? word : capitalize(word)))
    .join(' ');
  return capitalize(titleCase);
};

console.log(convertTitle("i'm a fool"));
console.log(convertTitle('this book SHOULD BE nice, GOOD to read it'));
console.log(convertTitle('I just hate the fuck that tomrrow is a Friday'));
console.log(
  convertTitle(
    'get the fuck up on your balls, no ONE IS gonna come and pick you up'
  )
);

//CODING CHALLENGE #4

const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

// const currentFood = dogs.map(mov => mov.curFood);
// console.log(currentFood);

//#1
dogs.forEach(
  dog => (dog.recommendedFood = Math.trunc(dog.weight ** 0.75 * 28))
);
console.log(dogs);

//2
const dogOwner = dogs.find(dog => dog.owners.includes('Sarah'));
console.log(dogOwner);
console.log(
  `Sarah's dog is eating ${
    dogOwner.curFood > dogOwner.recommendedFood ? 'Much' : 'Little'
  }`
);

//3
const ownersEatTooMuch = dogs
  .filter(dog => dog.curFood > dog.recommendedFood)
  .flatMap(dog => dog.owners);
console.log(ownersEatTooMuch);
const ownersEatTooLittle = dogs
  .filter(dog => dog.curFood < dog.recommendedFood)
  .flatMap(dog => dog.owners);
console.log(ownersEatTooLittle);

//4
console.log(`${ownersEatTooMuch.join(' and ')}'s dogs eat too much`);
console.log(`${ownersEatTooLittle.join(' and ')}'s dogs eat too little`);

//5
console.log(`${dogs.some(dog => dog.curFood === dog.recommendedFood)}`);

//6
console.log(
  `${dogs.some(
    dog =>
      dog.curFood > dog.recommendedFood * 0.9 &&
      dog.curFood < dog.recommendedFood * 1.1
  )}`
);

const checkFood = dog =>
  dog.curFood > dog.recommendedFood * 0.9 &&
  dog.curFood < dog.recommendedFood * 1.1;
console.log(dogs.some(checkFood));
// console.log(dogOkayFood);
//7
console.log(dogs.filter(checkFood));

//SORTING THE ARRAY IN ASCENDING ORDER BASING ON THE RECOMMENDED FOOD
const dogSorted = dogs
  .slice()
  .sort((a, b) => a.recommendedFood - b.recommendedFood);
console.log(dogSorted);
