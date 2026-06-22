import dotenv from "dotenv";

dotenv.config();

export const env = {
  odooUrl: process.env.ODOO_URL,
  odooApiKey: process.env.ODOO_API_KEY,
};
