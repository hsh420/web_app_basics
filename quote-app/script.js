// Seitenelemente

const quoteContainer = document.getElementById("quoteContainer");
const quote = document.getElementById("quote");
const author = document.getElementById("author");
const btn = document.getElementById("quoteBtn");

// Model

const model = {
  quote: "",
  author: "",
};

// Initialwerte

let newQuote = {};

// Funktionen

function getQuote() {
  const apiQuote = fetch("https://dummy-apis.netlify.app/api/quote");
  apiQuote
    .then((response) => {
      if (response.ok === true) {
        return response.json();
      }
    })
    .then((data) => {
      renderQuote(data);
    });
}

function renderQuote(data) {
  quoteContainer.innerHTML = "";
  const newQ = document.createElement("q");
  const qText = document.createTextNode(data.quote);
  newQ.classList.add("quote");
  const newP = document.createElement("p");
  const pText = document.createTextNode("- " + data.author);
  newP.classList.add("author");
  newQ.appendChild(qText);
  newP.appendChild(pText);
  quoteContainer.appendChild(newQ);
  quoteContainer.appendChild(newP);
}
