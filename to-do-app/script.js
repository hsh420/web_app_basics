let data = [];

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

renderToDos();

function renderToDos(arr) {
  if (arr === undefined) {
    arr = JSON.parse(localStorage.getItem("data"));
  }
  list.innerHTML = "";
  if (arr === undefined || arr.length === 0) {
    const li = document.createElement("li");
    const placeholder = document.createTextNode("Noch keine To-Dos...");
    li.appendChild(placeholder);
    list.appendChild(li);
  } else {
    arr.forEach((element) => {
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
    filterOpenToDos(data);
  } else if (value === "done") {
    filterDoneToDos(data);
  } else {
    renderToDos();
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
  console.log(event.target.previousSibling.data);
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
  renderToDos();
});

function resetDone() {
  const newData = data.filter((element) => {
    return element.done === false;
  });
  localStorage.setItem("data", JSON.stringify(newData));
  renderToDos(newData);
}
