let todos = [];
let filterValue = "all";
//selecting :
const cardForm = document.querySelector(".card__form");
const cardInput = document.querySelector(".card__input");
const todoList = document.querySelector(".todolist");
const selectfilters = document.querySelector(".filter-todos");

// add event :

cardForm.addEventListener("submit", addNewTodo);
selectfilters.addEventListener("change", (e) => {
  filterValue = e.target.value;
  filterTodos();
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

  todos.push(newTodo);
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
    <button data-todo-id=${todo.id} class="btn todo__check "><i class="fa ${
      todo.isComplated ? "fa-check-square" : "fa-square"
    }"></i></button>
    <button data-todo-id=${
      todo.id
    } class="btn todo__remove "><i class="fa fa-trash-alt"></i></button>
    </div>
  </li>`;
  });
  todoList.innerHTML = result;
  cardInput.value = "";

  const removeBtn = [...document.querySelectorAll(".todo__remove")];
  const checkBtn = [...document.querySelectorAll(".todo__check")];
  removeBtn.forEach((btn) => btn.addEventListener("click", removeTodo));
  checkBtn.forEach((btn) => btn.addEventListener("click", checkTodo));
}

function filterTodos() {
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
  const todoId = Number(e.target.dataset.todoId);
  todos = todos.filter((t) => t.id != todoId);
  createdTodos(todos);
  filterTodos();
}

function checkTodo(e) {
  const todoId = Number(e.target.dataset.todoId);
  const todo = todos.find((t) => t.id === todoId);
  todo.isComplated = !todo.isComplated;
  createdTodos(todos);
  filterTodos();
}
