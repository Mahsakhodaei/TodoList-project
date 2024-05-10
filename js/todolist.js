// let todos = [];
let filterValue = "all";
//selecting :
const cardForm = document.querySelector(".card__form");
const cardInput = document.querySelector(".card__input");
const todoList = document.querySelector(".todolist");
const selectfilters = document.querySelector(".filter-todos");
const backdrop = document.querySelector(".backdrop");
const modal = document.querySelector(".modal");
const closeModalBtn = document.querySelector(".close-modal");

// add event :

cardForm.addEventListener("submit", addNewTodo);
selectfilters.addEventListener("change", (e) => {
  filterValue = e.target.value;
  filterTodos();
});
closeModalBtn.addEventListener("click", closeModal);
document.addEventListener("DOMContentLoaded", (e) => {
  const todos = getAllTodos();
  createdTodos(todos);
});

//functions :

function addNewTodo(e) {
  e.preventDefault();

  if (!cardInput.value) return null;

  const newTodo = {
    id: Date.now(),
    createdAt: new Date().toISOString(),
    title: cardInput.value,
    isComplated: false,
  };

  // todos.push(newTodo);
  saveTodo(newTodo);
  filterTodos();
}

function createdTodos(todos) {
  //create todo on DOM
  let result = "";
  todos.forEach((todo) => {
    result += `<li class="todo">
    <p class="todo__title">${todo.title}</p>
    <span class="todo__createdAt">${new Date(todo.createdAt).toLocaleDateString(
      "fa-IR"
    )}</span>
    <div class="btn-wrapper">
    <button data-todo-id=${
      todo.id
    } class="btn todo__edit"><i class="fa fa-edit"></i></button>
    <button data-todo-id=${todo.id} class="btn todo__check"><i class="fa ${
      todo.isComplated ? "fa-check-square" : "fa-square"
    }"></i></button>
    <button data-todo-id=${
      todo.id
    } class="btn todo__remove"><i class="fa fa-trash-alt"></i></button>
    
    </div>
  </li>`;
  });
  todoList.innerHTML = result;
  cardInput.value = "";

  const removeBtn = [...document.querySelectorAll(".todo__remove")];
  const checkBtn = [...document.querySelectorAll(".todo__check")];
  const editBtn = [...document.querySelectorAll(".todo__edit")];
  removeBtn.forEach((btn) => btn.addEventListener("click", removeTodo));
  checkBtn.forEach((btn) => btn.addEventListener("click", checkTodo));
  editBtn.forEach((btn) => btn.addEventListener("click", editTodo));
}

function filterTodos() {
  const todos = getAllTodos();
  switch (filterValue) {
    case "all": {
      createdTodos(todos);
      break;
    }
    case "completed": {
      const filterdTodos = todos.filter((t) => t.isComplated);
      createdTodos(filterdTodos);
      break;
    }
    case "uncompleted": {
      const filterdTodos = todos.filter((t) => !t.isComplated);
      createdTodos(filterdTodos);
      break;
    }
    default:
      break;
  }
}

function removeTodo(e) {
  const todos = getAllTodos();
  const todoId = Number(e.target.dataset.todoId);
  todos = todos.filter((t) => t.id != todoId);
  // createdTodos(todos);
  saveAllTodos(todos);
  filterTodos();
}

function checkTodo(e) {
  const todos = getAllTodos();
  const todoId = Number(e.target.dataset.todoId);
  const todo = todos.find((t) => t.id === todoId);
  todo.isComplated = !todo.isComplated;
  // createdTodos(todos);
  saveAllTodos(todos);
  filterTodos();
}

function editTodo(e) {
  const todoId = Number(e.target.dataset.todoId);
  showModal();
}
function closeModal() {
  backdrop.classList.add("hidden");
  modal.classList.add("hidden");
}
function showModal() {
  //backdrop , modal ==> remove hidden class
  backdrop.classList.remove("hidden");
  modal.classList.remove("hidden");
}

//Local storage => Web API
function getAllTodos() {
  const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
  return savedTodos;
}

function saveTodo(todo) {
  const savedTodos = getAllTodos();
  savedTodos.push(todo);
  localStorage.setItem("todos", JSON.stringify(savedTodos));
  return savedTodos;
}
function saveAllTodos(todos) {
  localStorage.setItem("todos", JSON.stringify(todos));
}
