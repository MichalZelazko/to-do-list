const incompleteTasks = document.getElementById("incomplete-tasks");
const completedTasks = document.getElementById("completed-tasks");

const addButton = document.getElementById("add-button");
const addInput = document.getElementById("new-task");

const checkboxes = document.querySelectorAll("input[type=checkbox]");
const checkboxesList = [...checkboxes];
checkboxesList.forEach((checkbox) => {
  checkbox.addEventListener("click", () => {
    checkbox.setAttribute("checked", true);
    checkbox.parentElement.remove();
    if (checkbox.parentElement.hasAttribute("class", "editMode")) {
      checkbox.parentElement.removeAttribute("class", "editMode");
    }
    const editButton = checkbox.parentElement.querySelector(".edit");
    checkbox.parentElement.removeChild(editButton);
    completedTasks.appendChild(checkbox.parentElement);
  }); // finish for uncompleting a task
});

function getButtons() {
  const deleteButtons = document.querySelectorAll(".delete");
  const editButtons = document.querySelectorAll(".edit");

  const deleteButtonsList = [...deleteButtons];
  deleteButtonsList.forEach((deleteButton) => {
    deleteButton.addEventListener("click", () => {
      deleteButton.parentElement.remove();
    });
  });

  const editButtonsList = [...editButtons];
  editButtonsList.forEach((editButton) => {
    editButton.addEventListener("click", () => {
      if (editButton.parentElement.hasAttribute("class", "editMode")) {
        editButton.parentElement.removeAttribute("class", "editMode");
        editButton.previousElementSibling.previousElementSibling.innerText =
          editButton.previousElementSibling.value;
      } else {
        editButton.parentElement.setAttribute("class", "editMode");
        editButton.previousElementSibling.value =
          editButton.previousElementSibling.previousElementSibling.innerText;
      } //wziąć children i przefiltrować?
    });
  });
}

addButton.addEventListener("click", () => {
  const newTaskName = document.getElementById("new-task").value;
  if (newTaskName != "" && !newTaskName.match(/^\s+$/g)) {
    createNewTask(newTaskName);
    getButtons();
  }
  addInput.value = "";
});

const createNewTask = (newTaskName) => {
  const newElement = document.createElement("li");

  const checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");

  const label = document.createElement("label");
  label.innerText = newTaskName;

  const text = document.createElement("input");
  text.setAttribute("type", "text");

  const editButton = document.createElement("button");
  editButton.setAttribute("class", "edit");
  editButton.innerText = "Edit";

  const deleteButton = document.createElement("button");
  deleteButton.setAttribute("class", "delete");
  deleteButton.innerText = "Delete";

  newElement.appendChild(checkbox);
  newElement.appendChild(label);
  newElement.appendChild(text);
  newElement.appendChild(editButton);
  newElement.appendChild(deleteButton);

  incompleteTasks.appendChild(newElement);
};
