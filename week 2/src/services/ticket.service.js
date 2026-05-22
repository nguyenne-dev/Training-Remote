const repository = require("../repositories/ticket.repository");

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
  return repository.save(ticket);
}

function listTickets() {
  return repository.findAll();
}

function completeTicket(id) {
  const ticket = repository.findById(id);
  if (!ticket) {
    throw new Error("Ticket not found");
  }
  return repository.update(id, { completed: true });
}

function deleteTicket(id) {
  const result = repository.remove(id);
  if (!result) {
    throw new Error("Ticket not found");
  }
  return true;
}

module.exports = {
  addTicket,
  listTickets,
  completeTicket,
  deleteTicket,
};
