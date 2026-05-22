const fs = require("fs");
const path = require("path");

const STORAGE_PATH = path.join(__dirname, "../storage/ticket.json");

function readTickets() {
  try {
    const rawData = fs.readFileSync(STORAGE_PATH, "utf-8");
    return rawData.trim() ? JSON.parse(rawData) : [];
  } catch (error) {
    fs.writeFileSync(STORAGE_PATH, JSON.stringify([]));
    return [];
  }
}

function writeTickets(tickets) {
  fs.writeFileSync(STORAGE_PATH, JSON.stringify(tickets, null, 2));
}

function save(ticket) {
  const tickets = readTickets();

  tickets.push(ticket);

  writeTickets(tickets);

  return ticket;
}

function findAll() {
  return readTickets();
}

function findById(ticketId) {
  const tickets = readTickets();

  return tickets.find((ticket) => ticket.id === Number(ticketId)) || null;
}

function update(ticketId, updatedData) {
  const tickets = readTickets();

  const index = tickets.findIndex(
    (ticket) => ticket.id === Number(ticketId)
  );

  if (index === -1) return null;

  tickets[index] = {
    ...tickets[index],
    ...updatedData,
    updatedAt: new Date().toISOString(),
  };

  writeTickets(tickets);

  return tickets[index];
}

function remove(ticketId) {
  const tickets = readTickets();

  const filteredTickets = tickets.filter(
    (ticket) => ticket.id !== Number(ticketId)
  );

  if (filteredTickets.length === tickets.length) {
    return null;
  }

  writeTickets(filteredTickets);

  return true;
}

module.exports = {
  save,
  findAll,
  findById,
  update,
  remove,
};