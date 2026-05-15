const repository = require("../repositories/todo.repository");

function addTodo(title) {
  console.log("Title:"+ title + "test");
  if (!title?.toString().trim()) {
    throw new Error("Title is required");
  }
  if (typeof title !== "string" && typeof title !== "number") {
    throw new Error("Title must be a string or number");
  }
console.log("Title:"+ title + "test");
  const todo = {
    id: Date.now(),
    title: title?.toString().trim(),
    completed: false,
    createdAt: new Date().toISOString(),
  };

  return repository.save(todo);
}

function listTodos() {
  return repository.findAll();
}

function completeTodo(todoId) {
  const todo = repository.findById(todoId);

  if (!todo) {
    throw new Error("Todo not found");
  }

  return repository.update(todoId, {
    completed: true,
  });
}

function deleteTodo(todoId) {
  const deleted = repository.remove(todoId);

  if (!deleted) {
    throw new Error("Todo not found");
  }

  return true;
}

module.exports = {
  addTodo,
  listTodos,
  completeTodo,
  deleteTodo,
};
