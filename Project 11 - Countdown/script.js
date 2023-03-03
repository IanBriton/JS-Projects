"use strict";

//Selection of divs
const dayCounter = document.querySelector("#day-count");
const hourCounter = document.querySelector("#hour-count");
const minCounter = document.querySelector("#min-count");
const secCounter = document.querySelector("#sec-count");
const expiry = document.querySelector(".divs");

//Displaying of current time and date
const currentDate = document.querySelector(".date-time");

// Setting the time we're counting to
let countDown = new Date("Oct 15, 2022 19:05:00").getTime();

//Updating the timer after every 1 second
const time = setInterval(() => {
  let now = new Date().getTime();
  //   console.log(now);
  // Finding the distance between now and the count down date
  let distance = countDown - now;

  //Time calculations for days, hours, days, and minutes
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.trunc(
    Math.floor(distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.trunc(
    Math.floor(distance % (1000 * 60 * 60)) / (1000 * 60)
  );
  const seconds = Math.trunc(Math.floor(distance % (1000 * 60)) / 1000);

  dayCounter.innerHTML = days;
  hourCounter.innerHTML = hours;
  minCounter.innerHTML = minutes;
  secCounter.innerHTML = seconds;

  if (distance < 0) {
    clearInterval(time);
    expiry.innerHTML = "Expired";
  }
}, 1000);
const dateOptions = {
  timeZone: "GMT",
  month: "long",
  day: "numeric",
  year: "numeric",
};
const dateFormatter = Intl.DateTimeFormat("en-US", dateOptions);
const dateAsFormattedToString = dateFormatter.format(new Date(countDown));

const date = new Date();
const hour = date.getHours();
const min = date.getMinutes();

currentDate.innerHTML = dateAsFormattedToString + " " + "" + hour + ":" + min;
