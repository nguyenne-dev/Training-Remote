const {
  addTodo,
  listTodos,
  completeTodo,
  deleteTodo,
} = require("./services/todo.service");

const command = process.argv[2];
const value = process.argv[3];

try {
  switch (command) {
    case "add": {
      const todo = addTodo(value);
      console.log("Todo added:", todo);
      break;
    }

    case "list": {
      const todos = listTodos();

      if (todos.length === 0) {
        console.log("No todos found");
        break;
      }

      todos.forEach((todo) => {
        console.log(
          `[${todo.completed ? "x" : " "}] ${todo.id}. ${todo.title}`
        );
      });

      break;
    }

    case "complete": {
      const todo = completeTodo(value);

      console.log("Todo completed:", todo);
      break;
    }

    case "delete": {
      deleteTodo(value);

      console.log("Todo deleted");
      break;
    }

    default:
      console.log("Invalid command");
      console.log("Commands:");
      console.log('node src/cli.js add "Todo title"');
      console.log("node src/cli.js list");
      console.log("node src/cli.js complete 1");
      console.log("node src/cli.js delete 1");
  }
} catch (error) {
  console.log("Error:", error.message);
}