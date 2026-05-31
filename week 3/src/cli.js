const { addTicket, listTickets, completeTicket, deleteTicket } = require("./services/ticket.service");

const command = process.argv[2];
const value = process.argv[3];

try {
  switch (command) {
    case "add": {
      const ticket = addTicket(value);
      console.log("Ticket added:", ticket);
      break;
    }

    case "list": {
      const tickets = listTickets();

      if (tickets.length === 0) {
        console.log("No tickets found");
        break;
      }

      tickets.forEach((ticket) => {
        console.log(
          `[${ticket.completed ? "x" : " "}] ${ticket.id}. ${ticket.title}`
        );
      });

      break;
    }

    case "complete": {
      const ticket = completeTicket(value);

      console.log("Ticket completed:", ticket);
      break;
    }

    case "delete": {
      deleteTicket(value);

      console.log("Ticket deleted");
      break;
    }

    default:
      console.log("Invalid command");
      console.log("Commands:");
      console.log('node src/cli.js add "Ticket title"');
      console.log("node src/cli.js list");
      console.log("node src/cli.js complete 1");
      console.log("node src/cli.js delete 1");
  }
} catch (error) {
  console.log("Error:", error.message);
}