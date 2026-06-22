import fs from "fs/promises";

const DATA_FILE = "src/data/data.json";

export async function saveTickets(newTickets) {
  let existingData = { updatedAt: null, tickets: [] };

  const fileContent = await fs.readFile(DATA_FILE, "utf-8");
  existingData = JSON.parse(fileContent);

  const ticketMap = {};
  for (const t of existingData.tickets) {
    ticketMap[t.id] = t;
  }
  
  for (const newT of newTickets) {
    ticketMap[newT.id] = {
      ...ticketMap[newT.id],
      ...newT,
    };
  }

  const mergedTickets = Object.values(ticketMap);

  // Ghi file
  await fs.writeFile(
    DATA_FILE,
    JSON.stringify(
      {
        updatedAt: new Date().toISOString(),
        tickets: mergedTickets,
      },
      null,
      2,
    ),
  );
}

export async function readTickets() {
  try {
    const fileContent = await fs.readFile(DATA_FILE, "utf-8");
    return JSON.parse(fileContent);
  } catch (error) {
    return {
      updatedAt: null,
      tickets: [],
    };
  }
}