const fs = require("fs");
const path = require("path");

const STORAGE_PATH = path.join(__dirname, "../storage/todos.json");

function readTodos() {
  try {
    const rawData = fs.readFileSync(STORAGE_PATH, "utf-8");
    return rawData.trim() ? JSON.parse(rawData) : [];
  } catch (error) {
    fs.writeFileSync(STORAGE_PATH, JSON.stringify([]));
    return [];
  }
}

function writeTodos(todos) {
  fs.writeFileSync(STORAGE_PATH, JSON.stringify(todos, null, 2));
}

function save(todo) {
  const todos = readTodos();

  todos.push(todo);

  writeTodos(todos);

  return todo;
}

function findAll() {
  return readTodos();
}

function findById(todoId) {
  const todos = readTodos();

  return todos.find((todo) => todo.id === Number(todoId));
}

function update(todoId, updatedData) {
  const todos = readTodos();

  const index = todos.findIndex(
    (todo) => todo.id === Number(todoId)
  );

  if (index === -1) return null;

  todos[index] = {
    ...todos[index],
    ...updatedData,
    updatedAt: new Date().toISOString(),
  };

  writeTodos(todos);

  return todos[index];
}

function remove(todoId) {
  const todos = readTodos();

  const filteredTodos = todos.filter(
    (todo) => todo.id !== Number(todoId)
  );

  if (filteredTodos.length === todos.length) {
    return null;
  }

  writeTodos(filteredTodos);

  return true;
}

module.exports = {
  save,
  findAll,
  findById,
  update,
  remove,
};