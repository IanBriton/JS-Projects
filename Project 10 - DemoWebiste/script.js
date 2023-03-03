// const sectionOne = document.querySelector(".section-1");
// const sectionTwo = document.querySelector(".section-2");
// const btnScrollto = document.getElementById("section--2");

// btnScrollto.addEventListener("click", () => {
//   console.log("Hello World");
//   sectionTwo.scrollIntoView({
//     behavior: "smooth",
//     block: "end",
//     inline: "nearest",
//   });
// });

// //Setting the date to appear dynamically in the footer section
// const date = document.querySelector(".date");
// date.innerHTML = new Date().getFullYear();

//JavaScript practise from CodeWars
// const listDifference = (a, b) => {
//   let difference = a.filter((x) => !b.includes(x));
//   return difference;
// };

// const list1 = [1, 2, 3, 9, 7];
// const list2 = [3, 4, 5];
// const answer = listDifference(list1, list2);
// console.log(answer);

// const myFriends = ["Sam", "Jack", "Moses", "Jonte", "Fait"];
// let newFriends = myFriends.filter((name) => name.length === 4);
// console.log(newFriends);

// const allFriends = (friend) => {
//   let newOnes = friend.filter((name) => name.length === 4);
//   return newOnes;
// };

// console.log(allFriends(myFriends));

const word = "sam";
let position;
let length;
const newWord = word.split("");
if (word.length % 2 === 1) {
  let middleChar = word.length / 2;
  console.log(word[middleChar]);
} else {
  let middleChar = word.length / 2 - 1;
  console.log(word[middleChar]);
}
// for (char of newWord) {
// console.log(char);
// }
// console.log(word.length);
