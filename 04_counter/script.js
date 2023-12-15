const counter = document.getElementById("counter");
const main = document.getElementById("main");
const background = document.getElementById("background");

let count = 0;
let backgroundCount = 0;

main.addEventListener("click", () => {
  count++;
  backgroundCount++;
  counter.innerHTML = count;
  if (backgroundCount === 100) {
    backgroundCount = 0;
  }
  background.style.width = backgroundCount + "vw";
});

document.addEventListener("keypress", (event) => {
  if (event.code === "Space" || event.code === "Enter") {
    count++;
    backgroundCount++;
    counter.innerHTML = count;
    if (backgroundCount === 100) {
      backgroundCount = 0;
    }
    background.style.width = backgroundCount + "vw";
  }
});

function reset() {
  count = 0;
  backgroundCount = 0;
  counter.innerHTML = count;
  background.style.width = "0vw";
}
