import { syncTickets } from "./jobs/sync-tickets.job.js";

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function start() {
  console.log("Bot bắt đầu chạy...");

  while (true) {
    await syncTickets();

    console.log("Đợi 60 giây...\n");
    await sleep(60000);
  }
}

start();