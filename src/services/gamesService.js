import { existingGame } from "../errors/errors.js";
import gamesRepository from "../repositories/gamesRepository.js";

async function getGames() {
    const result = await gamesRepository.getGames();
    return result;
}

async function postGame(gameData) {
    const gameExists = await gamesRepository.findGameByName(gameData.name);

    if (gameExists) throw existingGame();

    await gamesRepository.postGame(gameData);
}

const gamesService = {
  getGames,
  postGame
}

export default gamesService;
