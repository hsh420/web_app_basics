const input = document.querySelector(".passwordInput");
const button = document.querySelector(".inputBtn");
let passwordHidden = true;

function togglePassword() {
  if (passwordHidden === true) {
    passwordHidden = false;
    input.setAttribute("type", "text");
    button.innerHTML = "Hide Password";
  } else {
    passwordHidden = true;
    input.setAttribute("type", "password");
    button.innerHTML = "Show Password";
  }
}
