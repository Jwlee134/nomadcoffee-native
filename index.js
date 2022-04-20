const TodoForm = document.querySelector("#todo-form");
const TodoInput = document.querySelector("#todo-form input");
const TodoList = document.querySelector("#todo-list");
let Todos = [];

function saveTodo() {
  localStorage.setItem("List", JSON.stringify(Todos));
}

function delateTodo(event) {
  const li = event.target.parentElement;
  li.remove();
}

function paintTodo(newTodo) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  li.appendChild(span);
  li.innerText = newTodo;
  const btn = document.createElement("button");
  li.appendChild(btn);
  btn.innerText = "X";
  TodoList.appendChild(li);
  btn.addEventListener("click", delateTodo);
}

function handleTodo(event) {
  event.preventDefault();
  const newTodo = TodoInput.value;
  TodoInput.value = "";
  Todos.push(newTodo);
  paintTodo(newTodo);
  saveTodo();
}

TodoForm.addEventListener("submit", handleTodo);

const saveTodos = localStorage.getItem("List");

if (saveTodos !== null) {
  const parseTodo = JSON.parse(saveTodos);
  Todos = parseTodo;
  parseTodo.forEach(paintTodo);
}
