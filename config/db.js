import knex from "knex";
import "dotenv/config";
export const db = knex({
  client: "pg",
  connection: {
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
  },
});
