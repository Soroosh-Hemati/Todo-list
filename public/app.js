// let todos = [];
let filterValue = "all";
const todoForm = document.querySelector(".todo-form");
const todoInput = document.querySelector(".todo-form .input-box");
const todoList = document.querySelector(".todo-list");
const selectTodos = document.querySelector(".filter-todos");
const modal = document.querySelector(".modal");
const modalCloseBtn = document.querySelector(".modal-close-btn");
const modalForm = document.querySelector(".modal-form");
const modalInput = document.querySelector(".hidden-input-box");
const editBtn = document.querySelector("#edit-btn");

editBtn.addEventListener("click", editTodoItem);

todoForm.addEventListener("submit", addNewTodo);

selectTodos.addEventListener("change", (e) => {
  filterValue = e.target.value;
  filterTodos();
});

document.addEventListener("DOMContentLoaded", () => {
  const todos = getAllTodos();
  showTodos(todos);
});

modalCloseBtn.addEventListener("click", () =>
  modal.classList.remove("show-modal")
);

function showTodos(todos) {
  let result = "";
  todos.forEach((todo) => {
    result += `<li class="todo bg-gray-100 rounded-lg flex flex-wrap p-3 mb-2">
    <p class="todo-title ${todo.isCompleted && "completed"} w-2/6">${
      todo.title
    }</p>
    <span class="todo-createdAt w-1/6">${new Date(
      todo.createdAt
    ).toLocaleDateString("fa-IR")}</span>
    <button data-todo-id=${todo.id} class="todo-check w-1/6">
      <i class="fa fa-check"></i>
    </button>
    <button data-todo-id=${todo.id} class="todo-remove w-1/6">
      <i class="fa fa-trash"></i>
    </button>
    <button data-todo-id=${todo.id} class="todo-edit w-1/6">
      <i class="fa fa-pencil"></i>
    </button>
  </li>`;
  });
  todoList.innerHTML = result;
  todoInput.value = "";

  const removeBtns = [...document.querySelectorAll(".todo-remove")];
  removeBtns.forEach((btn) => btn.addEventListener("click", removeTodo));
  const checkBtns = [...document.querySelectorAll(".todo-check")];
  checkBtns.forEach((btn) => btn.addEventListener("click", checkTodos));
  const editBtns = [...document.querySelectorAll(".todo-edit")];
  editBtns.forEach((btn) => btn.addEventListener("click", editTodo));
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
  // todos.push(newTodo);
  saveTodo(newTodo);
  filterTodos();
}

function filterTodos() {
  const todos = getAllTodos();
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
    case "uncompleted": {
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
  let todos = getAllTodos();
  const dataId = Number(e.target.dataset.todoId);
  todos = todos.filter((todo) => todo.id != dataId);
  saveAllTodos(todos);
  filterTodos();
}

function checkTodos(e) {
  const todos = getAllTodos();
  const dataId = Number(e.target.dataset.todoId);
  const completedTodo = todos.find((todo) => todo.id == dataId);
  completedTodo.isCompleted = !completedTodo.isCompleted;
  saveAllTodos(todos);
  filterTodos();
}

const showModal = () => {
  modal.classList.add("show-modal");
};

function editTodo(e) {
  let todos = getAllTodos();
  const dataId = Number(e.target.dataset.todoId);
  const editedTodo = todos.find((todo) => todo.id == dataId);
  modalInput.value = editedTodo.title;
  localStorage.setItem("toEditTodo", JSON.stringify(editedTodo));
  showModal();
}

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

function editTodoItem() {
  const savedTodo = localStorage.getItem("toEditTodo");
  const parsedTodo = JSON.parse(savedTodo) || undefined;
  let todos = getAllTodos();
  const inputModalValue = modalInput.value;

  if (inputModalValue.length === 0) {
    alert("cant be empty!");
    return;
  }

  if (parsedTodo) {
    todos = todos.map((item) => {
      if (item.id === parsedTodo.id) {
        return { ...item, title: inputModalValue };
      }
      return item;
    });
  }

  saveAllTodos(todos);
  filterTodos();
  modal.classList.remove("show-modal");
}
