const red = document.getElementById("red");
const green = document.getElementById("green");
const blue = document.getElementById("blue");
const main = document.getElementById("main");
const displayedRgbCode = document.getElementById("rgbCode");

let rgbCode = red + green + blue;

red.addEventListener("change", (event) => {
  displayedRgbCode.innerText =
    "RGB-Code: " +
    event.explicitOriginalTarget.value +
    ", " +
    green.value +
    ", " +
    blue.value;
  main.style.backgroundColor =
    "rgb(" +
    event.explicitOriginalTarget.value +
    ", " +
    green.value +
    ", " +
    blue.value +
    ")";
});

green.addEventListener("change", (event) => {
  displayedRgbCode.innerText =
    "RGB-Code: " +
    red.value +
    ", " +
    event.explicitOriginalTarget.value +
    ", " +
    blue.value;
  main.style.backgroundColor =
    "rgb(" +
    red.value +
    ", " +
    event.explicitOriginalTarget.value +
    ", " +
    blue.value +
    ")";
});

blue.addEventListener("change", (event) => {
  displayedRgbCode.innerText =
    "RGB-Code: " +
    red.value +
    ", " +
    green.value +
    ", " +
    event.explicitOriginalTarget.value;
  main.style.backgroundColor =
    "rgb(" +
    red.value +
    ", " +
    green.value +
    ", " +
    event.explicitOriginalTarget.value +
    ")";
});
