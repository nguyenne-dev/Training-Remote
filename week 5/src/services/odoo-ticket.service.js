import { env } from "../config/env.js";

export async function getTickets() {
  const response = await fetch(
    `${env.odooUrl}/json/2/helpdesk.ticket/search_read`,
    {
      method: "POST",
      headers: {
        Authorization: `bearer ${env.odooApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        domain: [
          ["stage_id", "in", [1, 2]]
        ],
        fields: [
          "id",
          "name",
          "description",
          "partner_email",
          "priority",
          "stage_id",
          "tag_ids",
          "message_ids",
          "partner_email"
        ],
        order: "id desc",
      }),
    }
  );
  return response.json();
}