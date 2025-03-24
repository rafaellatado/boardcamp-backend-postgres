import { db } from "../config/database.connection.js";

async function getGames() {
  const result = await db.query(`SELECT * FROM games;`);
  return result.rows;
}

async function findGameByName(name) {
  const result = await db.query(`SELECT * FROM games WHERE name = $1;`, [name]);
  return result.rows[0];
}

async function postGame(gameData) {

  const result = await db.query(
    `INSERT INTO games ("name", "image", "stockTotal", "pricePerDay") VALUES($1, $2, $3, $4)`, 
    [gameData.name, gameData.image, gameData.stockTotal, gameData.pricePerDay]
  );
}

async function getGameById(gameId) {
  const result = await db.query(`SELECT * FROM games WHERE id = $1;`, [gameId]);
  return result.rows[0]; // Returns the game if found, otherwise undefined
}

const gamesRepository = {
  getGames,
  findGameByName,
  postGame,
  getGameById
}

export default gamesRepository;
