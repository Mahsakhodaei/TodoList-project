const todos = [];
//selecting :
const cardForm = document.querySelector(".card__form");
const cardInput = document.querySelector(".card__input");
const todoList = document.querySelector(".todolist");

// add event :

cardForm.addEventListener("submit", addNewTodo);
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

  //create todo on DOM
  let result = "";
  todos.forEach((todo) => {
    result += `<li class="todo">
    <p class="todo__title">${todo.title}</p>
    <span class="todo__createdAt">${new Date(todo.createdAt).toLocaleDateString(
      "fa-IR"
    )}</span>
    <button class="btn"><i class="todo__check fa fa-check-square"></i></button>
    <button class="btn"><i class="todo__remove fa fa-trash-alt"></i></button>
  </li>`;
  });
  todoList.innerHTML = result;
}
console.log(todos);
