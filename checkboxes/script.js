const fast = document.getElementById("fast");
const cheap = document.getElementById("cheap");
const good = document.getElementById("good");
let lastClicked = "";

fast.addEventListener("click", (event) => {
  if (cheap.checked === true && good.checked === true) {
    switch (true) {
      case lastClicked === "cheap":
        cheap.checked = false;
        good.checked = true;
        break;
      case lastClicked === "good":
        good.checked = false;
        cheap.checked = true;
        break;
    }
  }
  lastClicked = "fast";
});

cheap.addEventListener("click", (event) => {
  if (fast.checked === true && good.checked === true) {
    switch (true) {
      case lastClicked === "fast":
        fast.checked = false;
        good.checked = true;
        break;
      case lastClicked === "good":
        good.checked = false;
        fast.checked = true;
        break;
    }
  }
  lastClicked = "cheap";
});

good.addEventListener("click", (event) => {
  if (cheap.checked === true && fast.checked === true) {
    console.log("good geht in die if-Schleife");
    switch (true) {
      case lastClicked === "cheap":
        cheap.checked = false;
        fast.checked = true;
        break;
      case lastClicked === "fast":
        fast.checked = false;
        cheap.checked = true;
        break;
    }
  }
  lastClicked = "good";
});
