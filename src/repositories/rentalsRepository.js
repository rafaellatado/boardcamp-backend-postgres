import { db } from "../config/database.connection.js";

async function getRentals() {
  const result = await db.query(`
    SELECT 
      rentals.*, 
      customers.id AS "customerId",
      customers.name AS "customerName",
      games.id AS "gameId",
      games.name AS "gameName"
    FROM rentals
    JOIN customers ON rentals."customerId" = customers.id
    JOIN games ON rentals."gameId" = games.id;
  `);

  return result.rows.map(row => ({
    id: row.id,
    customerId: row.customerId,
    gameId: row.gameId,
    rentDate: row.rentDate,
    daysRented: row.daysRented,
    returnDate: row.returnDate,
    originalPrice: row.originalPrice,
    delayFee: row.delayFee,
    customer: {
      id: row.customerId,
      name: row.customerName
    },
    game: {
      id: row.gameId,
      name: row.gameName
    }
  }));
}
  
async function getGameById(gameId) {
  const result = await db.query(`SELECT * FROM games WHERE id = $1;`, [gameId]);
  return result.rows[0];
}

async function insertRental(rentalData) {
  const { customerId, gameId, rentDate, daysRented, returnDate, originalPrice, delayFee } = rentalData;
  await db.query(
    `INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee") 
     VALUES ($1, $2, $3, $4, $5, $6, $7);`,
    [customerId, gameId, rentDate, daysRented, returnDate, originalPrice, delayFee]
  );
}

async function getActiveRentalsByGameId(gameId) {
  const result = await db.query(
    `SELECT * FROM rentals WHERE "gameId" = $1 AND "returnDate" IS NULL;`,
    [gameId]
  );
  return result.rows;
}

async function getRentalById(rentalId) {
  const result = await db.query(
    `SELECT * FROM rentals WHERE id = $1;`, 
    [rentalId]
  );
  return result.rows[0];
}

async function returnRental(rentalId, returnDate, delayFee) {
  await db.query(
    `UPDATE rentals 
     SET "returnDate" = $1, "delayFee" = $2 
     WHERE id = $3;`,
    [returnDate, delayFee, rentalId]
  );
}

async function updateRental(id, returnDate, delayFee) {
  await db.query(
    `UPDATE rentals
     SET "returnDate" = $1, "delayFee" = $2
     WHERE id = $3`,
    [returnDate, delayFee, id]
  );
}

async function deleteRental(rentalId) {
  // Verificar se o aluguel existe
  const rentalResult = await db.query("SELECT * FROM rentals WHERE id = $1", [rentalId]);

  if (rentalResult.rows.length === 0) {
    throw { type: "notFound", message: "Aluguel não encontrado" }; // Aluguel não existe
  }

  const rental = rentalResult.rows[0];

  // Verificar se o aluguel foi finalizado
  if (!rental.returnDate) {
    throw { type: "badRequest", message: "Aluguel não finalizado. Não pode ser excluído." }; // Aluguel não finalizado
  }

  // Excluir o aluguel, caso tenha sido finalizado
  await db.query("DELETE FROM rentals WHERE id = $1", [rentalId]);
}

const rentalsRepository = {
  getRentals,
  getGameById,
  insertRental,
  getActiveRentalsByGameId,
  getRentalById,
  returnRental,
  updateRental,
  deleteRental
}

export default rentalsRepository;
