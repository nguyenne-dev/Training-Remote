import { env } from "../config/env.js";

export async function getStages() {
  const response = await fetch(
    `${env.odooUrl}/json/2/helpdesk.stage/search_read`,
    {
      method: "POST",
      headers: {
        Authorization: `bearer ${env.odooApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fields: ["id", "name"],
      }),
    }
  );

  return response.json();
}