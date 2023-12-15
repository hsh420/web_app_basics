const analogHours = document.querySelector(".clock__hours");
const analogMinutes = document.querySelector(".clock__minutes");
const analogSeconds = document.querySelector(".clock__seconds");

const digiHours = document.querySelector(".digi-clock__hours");
const digiMinuts = document.querySelector(".digi-clock__minutes");
const digiSeconds = document.querySelector(".digi-clock__seconds");
const digiDots = document.querySelectorAll(".digi-clock__dots");

setInterval(logTime, 1000);

function logTime() {
  const now = new Date();
  let hours = now.getHours();
  if (hours < 10) {
    hours = "0" + hours;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  let seconds = now.getSeconds();
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  analogHours.setAttribute("style", "--hours: " + hours * 30 + "deg");
  analogMinutes.setAttribute("style", "--minutes: " + minutes * 6 + "deg");
  analogSeconds.setAttribute("style", "--seconds: " + seconds * 6 + "deg");
  digiHours.innerHTML = hours;
  digiMinuts.innerHTML = minutes;
  digiSeconds.innerHTML = seconds;
  digiDots.forEach((element) =>
    element.classList.toggle("digi-clock__dots--hidden")
  );
}
