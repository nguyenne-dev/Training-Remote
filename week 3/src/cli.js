require("dotenv").config();
const {
  addTicket,
  listTickets,
  completeTicket,
  deleteTicket,
} = require("./services/ticket.service");

const kbService = require("./services/kb.service");


async function main() {
  try {
    // Ticket commands
    if (process.argv[2]!== "kb") {
      const command = process.argv[2];
      switch (command) {
        case "add": {
          const ticket = addTicket(process.argv[3]);

          console.log("Ticket added:", ticket);
          return;
        }

        case "list": {
          const tickets = listTickets();

          if (tickets.length === 0) {
            console.log("No tickets found");
            return;
          }

          tickets.forEach((ticket) => {
            console.log(
              `[${ticket.completed ? "x" : " "}] ${ticket.id}. ${ticket.title}`,
            );
          });

          return;
        }

        case "complete": {
          const ticket = completeTicket(process.argv[3]);

          console.log("Ticket completed:", ticket);

          return;
        }

        case "delete": {
          deleteTicket(process.argv[3]);

          console.log("Ticket deleted");

          return;
        }
      }
    }

    // KB commands
    if (process.argv[2] === "kb") {
      const command = process.argv[3];
      switch (command) {
        case "search": {
          const keyword = process.argv[4];

          const topK = Number(process.argv[5]) || 5;

          const documents = await kbService.search(keyword, topK);

          if (documents.length === 0) {
            console.log("No documents found");
            return;
          }

          documents.forEach((doc) => console.log(doc));

          return;
        }

        case "list": {
          const nodePath = process.argv[4];

          const limit = Number(process.argv[5]) || 10;

          const documents = await kbService.list(nodePath, limit);

          if (documents.length === 0) {
            console.log("No documents found");
            return;
          }

          documents.forEach((doc) => console.log(doc));

          return;
        }

        case "retrieve": {
          const docId = process.argv[4];

          const document = await kbService.retrieve(docId);

          console.log(document);

          return;
        }

        case "add": {
          const title = process.argv[4];

          const content = process.argv[5];

          const nodePath = process.argv[6];

          const tagsInput = process.argv[7];

          const tags = tagsInput
            ? tagsInput.split(",").map((tag) => tag.trim())
            : [];

          const document = await kbService.add({
            title,
            content,
            nodePath,
            tags,
          });

          console.log("Document added:", document);

          return;
        }
      }
    }

    console.log("Invalid command");
    console.log("Commands:");

    console.log('node src/cli.js add "Ticket title"');
    console.log("node src/cli.js list");
    console.log("node src/cli.js complete 1");
    console.log("node src/cli.js delete 1");

    console.log("node src/cli.js kb search template");
    console.log("node src/cli.js kb list /templates/email");
    console.log("node src/cli.js kb retrieve doc-001");
    console.log('node src/cli.js kb add "title" "content" "/docs" "tag1,tag2"');
  } catch (error) {
    console.log("Error:", error.message);
  }
}

main();
