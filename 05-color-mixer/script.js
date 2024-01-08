const red = document.getElementById("red");
const green = document.getElementById("green");
const blue = document.getElementById("blue");
const main = document.getElementById("main");
const displayedRgbCode = document.getElementById("rgbCode");
const btn = document.getElementById("btn");

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

btn.addEventListener("click", () => {
  const apiRgb = fetch("https://dummy-apis.netlify.app/api/color");
  apiRgb
    .then((response) => {
      if (response.ok === true) {
        return response.json();
      }
    })
    .then((data) => {
      console.log(data);
      displayedRgbCode.innerText =
        "RGB-Code: " + data.rgb.r + ", " + data.rgb.g + ", " + data.rgb.b;
      main.style.backgroundColor =
        "rgb(" + data.rgb.r + ", " + data.rgb.g + ", " + data.rgb.b + ")";
      red.value = data.rgb.r;
      green.value = data.rgb.g;
      blue.value = data.rgb.b;
    });
});
