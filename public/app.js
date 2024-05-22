const todos = [];
const todoForm = document.querySelector(".todo-form");
const todoInput = document.querySelector(".todo-form .input-box");
const todoList = document.querySelector(".todo-list");
todoForm.addEventListener("submit", addNewTodo);

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

  let result = "";
  todos.forEach((todo) => {
    result += `<li class="todo bg-gray-100 rounded-lg flex flex-wrap p-3 mb-2">
    <p class="todo-title w-2/5">${todo.title}</p>
    <span class="todo-createdAt w-1/5">${new Date(todo.createdAt).toLocaleDateString("fa-IR")}</span>
    <button data-todo-id=${todo.id} class="w-1/5">
      <i class="todo-check fa fa-check"></i>
    </button>
    <button data-todo-id=${todo.id} class="w-1/5">
      <i class="todo-remove fa fa-trash"></i>
    </button>
  </li>`;
  });
  todoList.innerHTML = result;
  todoInput.value = "";
}
