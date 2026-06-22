import { env } from "../config/env.js";

export async function composeEmail(
  subject = "Automation test email " + new Date().toLocaleTimeString(),
  body = "Automation test email " + new Date().toLocaleTimeString(),
  email_to,
  author_id = 2,
  res_id,
) {
  // Tạo mail.mail
  const createResponse = await fetch(`${env.odooUrl}/json/2/mail.mail/create`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.odooApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      vals_list: [
        {
          subject,
          body,
          body_html: body,
          email_to,
          author_id,
          model: "helpdesk.ticket",
          res_id,
        },
      ],
    }),
  });

  const createData = await createResponse.json();
  const mailId = createData[0];

  // Ép gửi ngay
  const sendResponse = await fetch(`${env.odooUrl}/json/2/mail.mail/send`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.odooApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ids: [mailId],
      context: {body},
      auto_commit: false,
      raise_exception: false,
      post_send_callback: null,
    }),
  });

  return { createData };
}
