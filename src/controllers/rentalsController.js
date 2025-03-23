import rentalsService from "../services/rentalsService.js";

async function getRentals(req, res) {
  const rentals = await rentalsService.getRentals();
  res.send(rentals);
}

async function postRental(req, res) {
  const rentalData = req.body;
  await rentalsService.postRental(rentalData);
  res.sendStatus(201);
}

const rentalsController = {
  getRentals,
  postRental
}

export default rentalsController;