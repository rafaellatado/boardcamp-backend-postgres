import pg from "pg";
import dotenv from "dotenv";
dotenv.config();

const { Pool } = pg;

const configDatabase = {
  connectionString: process.env.DATABASE_URL,
};

export const db = new Pool(configDatabase);

export function testeDBConnection() {
  db.connect()
    .then(() => console.log('Successful connection with database!'))
    .catch((err) => console.error('Failed to connect'))
}
