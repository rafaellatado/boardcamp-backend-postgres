import { db } from "../config/database.connection.js";

async function getRentals() {
  const result = await db.query(`SELECT * FROM rentals;`);
  return result.rows; 
}

async function getGameById(gameId) {
  const result = await db.query(`SELECT * FROM games WHERE id = $1;`, [gameId]);
  return result.rows[0];
}

async function insertRental(rentalData) {
  const { customerId, gameId, rentDate, daysRented, returnDate, originalPrice, delayFee } = rentalData;
  await db.query(
    `INSERT INTO rentals (customerId, gameId, rentDate, daysRented, returnDate, originalPrice, delayFee) 
     VALUES ($1, $2, $3, $4, $5, $6, $7);`,
    [customerId, gameId, rentDate, daysRented, returnDate, originalPrice, delayFee]
  );
}

const rentalsRepository = {
  getRentals,
  getGameById,
  insertRental
}

export default rentalsRepository;
