// Initialwerte
let data = [];
let selected = "all";

// Dokumentenelemente
const select = document.querySelector("#selectContainer");
const list = document.querySelector("#list");
const input = document.querySelector("#add");
const addBtn = document.querySelector("#addBtn");

// Initiale Logiken: nach Daten suchen, diese Daten anzeigen (falls keine vorhanden: Platzhalter)
checkForData();
renderToDos(data);

function checkForData() {
  if (localStorage.getItem("data") === null || undefined) {
    return (data = []);
  } else {
    data = JSON.parse(localStorage.getItem("data"));
    return data;
  }
}

function renderToDos(data) {
  // Liste leeren
  list.innerHTML = "";
  if (data === undefined || data.length === 0) {
    // Platzhalter für Liste, falls keine Daten vorhanden sind
    const li = document.createElement("li");
    const placeholder = document.createTextNode("Noch keine To-Dos...");
    li.appendChild(placeholder);
    list.appendChild(li);
  } else {
    // dynamische Erstellung der Liste mit den Daten
    data.forEach((element) => {
      const li = document.createElement("li");
      const text = document.createTextNode(element.description);
      const checkbox = document.createElement("input");
      checkbox.setAttribute("type", "checkbox");
      li.appendChild(text);
      li.appendChild(checkbox);
      list.appendChild(li);
      if (element.done === true) {
        checkbox.setAttribute("checked", "true");
        li.classList.add("linethrough");
      }
    });
  }
}

// Filter-Logiken, inklusive State-Management bzgl. des aktuell ausgewählten Filters
select.addEventListener("input", (event) => {
  event.preventDefault();
  const value = event.target.value;
  if (value === "open") {
    filterOpenToDos();
    selected = "open";
  } else if (value === "done") {
    filterDoneToDos();
    selected = "done";
  } else {
    renderToDos(data);
    selected = "all";
  }
});

function filterDoneToDos() {
  let data = checkForData();
  const filteredData = [];
  data.forEach((element) => {
    if (element.done === true) {
      filteredData.push(element);
    }
  });
  renderToDos(filteredData);
}

function filterOpenToDos() {
  let data = checkForData();
  const filteredData = [];
  data.forEach((element) => {
    if (element.done === false) {
      filteredData.push(element);
    }
  });
  renderToDos(filteredData);
}

// To-Dos hinzufügen
addBtn.addEventListener("click", (event) => {
  // Validation: To-Do existiert bereits oder input-field leer?
  for (let i = 0; i < data.length; i++) {
    if (data[i].description.toLowerCase() === input.value.toLowerCase()) {
      window.alert("To Do existiert bereits!");
      return;
    }
  }
  if (input.value === "") {
    window.alert("Beschreibung fehlt!");
    return;
  }
  // wenn Validierung erfolgreich abgeschlossen, Erstellung eines neuen To-Dos + input zurücksetzen + Daten speichern und neu rendern
  const newToDo = {
    description: input.value,
    id: new Date().getTime(),
    done: false,
  };
  data.push(newToDo);
  input.value = "";
  localStorage.setItem("data", JSON.stringify(data));
  renderToDos(data);
});

// Status der To-Dos ändern und Änderungen erfassen; Daten jeweils aktuell laden
list.addEventListener("change", (event) => {
  data.forEach((element) => {
    if (
      element.description === event.target.previousSibling.data &&
      element.done === false
    ) {
      element.done = true;
    } else if (
      element.description === event.target.previousSibling.data &&
      element.done === true
    ) {
      element.done = false;
    }
  });
  localStorage.setItem("data", JSON.stringify(data));
  // Daten neu rendern ist notwendig, wenn angewendeten Filtern Daten geändert werden
  if (selected === "done") {
    filterDoneToDos();
  } else if (selected === "open") {
    filterOpenToDos();
  } else {
    renderToDos(data);
  }
});

// als erledigt markierte To-Dos endgültig entfernen mit vorheriger Sicherheitsabfrage
function resetDone() {
  if (window.confirm("Erledigte To-Dos wirklich löschen?")) {
    const newData = data.filter((element) => {
      return element.done === false;
    });
    localStorage.setItem("data", JSON.stringify(newData));
    renderToDos(newData);
  }
}
