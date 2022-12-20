const incompleteTasks = document.getElementById("incomplete-tasks");
const completedTasks = document.getElementById("completed-tasks");

const editButton = document.createElement("button");
editButton.classList.add("edit");
editButton.innerText = "Edit";

const createNewTask = (newTaskName, isCompleted) => {
  const newElement = document.createElement("li");

  const checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  checkbox.addEventListener("click", () => {
    const list = checkbox.parentNode.parentNode;
    const listItem = checkbox.parentNode;
    const isIncompleted = list.id === "completed-tasks";
    if (isIncompleted) {
      listItem.appendChild(editButton);
      incompleteTasks.appendChild(listItem);
    } else {
      listItem.querySelector(".edit").remove();
      completedTasks.appendChild(listItem);
    }
  });

  const label = document.createElement("label");
  label.innerText = newTaskName;

  const text = document.createElement("input");
  text.setAttribute("type", "text");

  const editButton = document.createElement("button");
  editButton.setAttribute("class", "edit");
  editButton.innerText = "Edit";
  editButton.addEventListener("click", () => {
    const label = editButton.parentElement.querySelector("label");
    const input = editButton.parentElement.querySelector("input[type=text]");
    if (editButton.parentElement.hasAttribute("class", "editMode")) {
      editButton.parentElement.removeAttribute("class", "editMode");
      label.innerText = input.value;
    } else {
      editButton.parentElement.setAttribute("class", "editMode");
      input.value = label.innerText;
    }
  });

  const deleteButton = document.createElement("button");
  deleteButton.setAttribute("class", "delete");
  deleteButton.innerText = "Delete";
  deleteButton.addEventListener("click", () => {
    deleteButton.parentElement.remove();
  });

  newElement.appendChild(checkbox);
  newElement.appendChild(label);
  newElement.appendChild(text);
  newElement.appendChild(editButton);
  newElement.appendChild(deleteButton);

  //console.log(newElement);
  if (isCompleted) {
    completedTasks.appendChild(newElement);
  } else {
    incompleteTasks.appendChild(newElement);
  }
};

const addButton = document.getElementById("add-button");
const addInput = document.getElementById("new-task");

const todoItems = [
  {
    name: "Learn React",
    isCompleted: false,
  },
  {
    name: "Go shopping",
    isCompleted: false,
  },
];

function updateList() {
  localStorage.setItem("todoItems", JSON.stringify(todoItems));
  completedTasks.innerHTML = "";
  incompleteTasks.innerHTML = "";
  const list = JSON.parse(localStorage.getItem("todoItems"));
  list.forEach((element) => {
    createNewTask(element.name, element.isCompleted);
  });
} //zamienić kolejność zeby pierwszego elementu nie tracić

addButton.addEventListener("click", () => {
  const newTaskName = document.getElementById("new-task").value;
  if (newTaskName != "" && !newTaskName.match(/^\s+$/g)) {
    const newElement = { name: newTaskName, isCompleted: false };
    todoItems.push(newElement);
    updateList();
  }
  addInput.value = "";
});

updateList();
