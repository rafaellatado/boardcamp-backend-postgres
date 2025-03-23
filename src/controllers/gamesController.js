import gamesService from "../services/gamesService.js";

async function getGames(req, res) {
    const games = await gamesService.getGames();
    res.send(games);
}

async function postGame(req, res) {
    const gameData = req.body;
    await gamesService.postGame(gameData);
    res.sendStatus(201);
}

const gamesController = {
  getGames,
  postGame
}

export default gamesController;
