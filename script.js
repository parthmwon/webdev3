const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const counter = document.getElementById("counter");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach(function (task, index) {
    const li = document.createElement("li");
    if (task.completed) li.classList.add("completed");

    const span = document.createElement("span");
    span.textContent = task.text;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete-btn";

    // mark task as completed / not completed
    li.addEventListener("click", function () {
      tasks[index].completed = !tasks[index].completed;
      saveTasks();
      renderTasks();
    });

    // delete task
    deleteBtn.addEventListener("click", function (event) {
      event.stopPropagation();
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    });

    li.appendChild(span);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });

  const remaining = tasks.filter(function (t) { return !t.completed; }).length;
  counter.textContent = remaining + (remaining === 1 ? " task remaining" : " tasks remaining");
}

function addTask() {
  const text = taskInput.value.trim();
  if (text === "") {
    alert("Please enter a task!");
    return;
  }
  tasks.push({ text: text, completed: false });
  taskInput.value = "";
  saveTasks();
  renderTasks();
}

addBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") addTask();
});

renderTasks();
