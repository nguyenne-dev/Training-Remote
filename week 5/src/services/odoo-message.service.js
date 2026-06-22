import { env } from "../config/env.js";

export async function getMessages(messageIds) {
  if (!messageIds?.length) {
    return [];
  }

  const response = await fetch(
    `${env.odooUrl}/json/2/mail.message/search_read`,
    {
      method: "POST",
      headers: {
        Authorization: `bearer ${env.odooApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        domain: [["id", "in", messageIds]],
        fields: [
          "id",
          "body",
          "preview",
          "author_id",
          "date",
          "message_type",
          "subtype_id",
        ],
        order: "date desc",
      }),
    },
  );

  return response.json();
}
