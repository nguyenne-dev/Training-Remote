

// import { env } from "./src/config/env.js";
// import { createEmail } from "./src/services/odoo_sentmail.js";

import { findInfoByEmail } from "./src/services/hrm.js";

// const result1 = await createEmail("test tieeu de", "test body", "haitsfq@gmail.com", 3 ,22);
// console.log(result1)

// const response = await fetch(
//   `${env.odooUrl}/json/2/helpdesk.ticket/read`,
//   {
//     method: "POST",
//     headers: {
//       Authorization: `bearer ${env.odooApiKey}`,
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       ids: [22], // ID ticket
//       fields: ["partner_id"],
//     }),
//   }
// );

// const data = await response.json();
// console.log(data);

const data = await findInfoByEmail("user1@mindx.com")
console.log(data)
console.log(data.email_dang_ky)