let todos = [];
let filterValue = "all";
const todoForm = document.querySelector(".todo-form");
const todoInput = document.querySelector(".todo-form .input-box");
const todoList = document.querySelector(".todo-list");
const selectTodos = document.querySelector(".filter-todos");
todoForm.addEventListener("submit", addNewTodo);
selectTodos.addEventListener("change", (e) => {
  filterValue = e.target.value;
  filterTodos();
});

function showTodos(todos) {
  let result = "";
  todos.forEach((todo) => {
    result += `<li class="todo bg-gray-100 rounded-lg flex flex-wrap p-3 mb-2">
    <p class="todo-title ${todo.isCompleted && "completed"} w-2/5">${
      todo.title
    }</p>
    <span class="todo-createdAt w-1/5">${new Date(
      todo.createdAt
    ).toLocaleDateString("fa-IR")}</span>
    <button data-todo-id=${todo.id} class="todo-check w-1/5">
      <i class="fa fa-check"></i>
    </button>
    <button data-todo-id=${todo.id} class="todo-remove w-1/5">
      <i class="fa fa-trash"></i>
    </button>
  </li>`;
  });
  todoList.innerHTML = result;
  todoInput.value = "";

  const removeBtns = [...document.querySelectorAll(".todo-remove")];
  removeBtns.forEach((btn) => btn.addEventListener("click", removeTodo));
  const checkBtns = [...document.querySelectorAll(".todo-check")];
  checkBtns.forEach((btn) => btn.addEventListener("click", checkTodos));
}

function addNewTodo(e) {
  e.preventDefault();
  if (!todoInput.value) return null;
  const newTodo = {
    id: Date.now(),
    createdAt: new Date().toISOString(),
    title: todoInput.value,
    isCompleted: false,
  };
  todos.push(newTodo);
  filterTodos();
}
function filterTodos() {
  switch (filterValue) {
    case "all": {
      showTodos(todos);
      break;
    }
    case "completed": {
      const filteredtodos = todos.filter((todo) => todo.isCompleted);
      showTodos(filteredtodos);
      break;
    }
    case "uncompeted": {
      const filteredtodos = todos.filter((todo) => !todo.isCompleted);
      showTodos(filteredtodos);
      break;
    }
    default: {
      showTodos(todos);
    }
  }
}
function removeTodo(e) {
  const dataId = Number(e.target.dataset.todoId);
  todos = todos.filter((todo) => todo.id != dataId);
  filterTodos();
}
function checkTodos(e) {
  const dataId = Number(e.target.dataset.todoId);
  const completedTodo = todos.find((todo) => todo.id == dataId);
  console.log(todos);
  completedTodo.isCompleted = !completedTodo.isCompleted;
  filterTodos();
}
