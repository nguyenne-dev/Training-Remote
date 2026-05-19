const tickets = [
  {
    id: 1,
    title: "Ticket 1",
    completed: false,
  },
  {
    id: 2,
    title: "Ticket 2",
    completed: false,
  },
];

function addTicket(title) {
  if (!title?.toString().trim()) {
    throw new Error("Title is required");
  }
  if (typeof title !== "string" && typeof title !== "number") {
    throw new Error("Title must be a string or number");
  }
  const ticket = {
    id: Date.now(),
    title: title.toString().trim(),
    completed: false,
  };
  tickets.push(ticket);
  return ticket;
}

function listTickets() {
  return tickets;
}

function completeTicket(id) {
  const ticket = tickets.find((t) => t.id === id);
  if (!ticket) {
    throw new Error("Ticket not found");
  }
  ticket.completed = true;
  return ticket;
}

function deleteTicket(id) {
  const index = tickets.findIndex((t) => t.id === id);
  if (index === -1) {
    throw new Error("Ticket not found");
  }
  tickets.splice(index, 1);
  return true;
}

function clearTickets() {
  tickets.length = 0;

  tickets.push(
    {
      id: 1,
      title: "Ticket 1",
      completed: false,
    },
    {
      id: 2,
      title: "Ticket 2",
      completed: false,
    },
  );
}

module.exports = {
  addTicket,
  listTickets,
  completeTicket,
  deleteTicket,
  clearTickets,
};
