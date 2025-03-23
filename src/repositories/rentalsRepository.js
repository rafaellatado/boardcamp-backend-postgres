import { db } from "../config/database.connection.js";

async function getRentals() {
  const result = await db.query(`SELECT * FROM rentals;`);
  return result.rows; 
}

const rentalsRepository = {
  getRentals
}

export default rentalsRepository;
