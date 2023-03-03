const videoControls = document.querySelector(".video-container");
const btns = document.querySelectorAll(".btn-controls");
const btnOn = document.getElementById("btn-on");
const btnOff = document.getElementById("btn-off");

btns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const btnClicked = e.currentTarget.classList;
    // console.log(btnClicked);
    if (btnClicked.contains("btn-on")) {
      videoControls.play();
      //   btnOn.classList.add("slide");
    }
    if (btnClicked.contains("btn-off")) {
      videoControls.pause();
      //   btnOff.classList.add("slide");
    }
  });
});
