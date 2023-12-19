let data = [];
let selected = "all";

checkForData();

function checkForData() {
  if (localStorage.getItem("data") === null || undefined) {
    return (data = []);
  } else {
    data = JSON.parse(localStorage.getItem("data"));
    return data;
  }
}

const select = document.querySelector("#selectContainer");
const list = document.querySelector("#list");
const input = document.querySelector("#add");
const addBtn = document.querySelector("#addBtn");

renderToDos(data);

function renderToDos(data) {
  list.innerHTML = "";
  if (data === undefined || data.length === 0) {
    const li = document.createElement("li");
    const placeholder = document.createTextNode("Noch keine To-Dos...");
    li.appendChild(placeholder);
    list.appendChild(li);
  } else {
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

addBtn.addEventListener("click", (event) => {
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
  if (selected === "done") {
    filterDoneToDos();
  } else if (selected === "open") {
    filterOpenToDos();
  } else {
    renderToDos(data);
  }
});

function resetDone() {
  if (window.confirm("Erledigte To-Dos wirklich löschen?")) {
    const newData = data.filter((element) => {
      return element.done === false;
    });
    localStorage.setItem("data", JSON.stringify(newData));
    renderToDos(newData);
  }
}
