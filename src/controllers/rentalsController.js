import rentalsService from "../services/rentalsService.js";

async function getRentals(req, res) {
  const rentals = await rentalsService.getRentals();
  res.status(201).send(rentals);
}

async function postRental(req, res) {
  const rentalData = req.body;
  await rentalsService.postRental(rentalData);
  res.sendStatus(201);
}

async function returnRental(req, res, next) {
  const rentalId = parseInt(req.params.id);

  const result = await rentalsService.returnRental(rentalId); 

  res.status(200).send(result); 
}

async function deleteRental(req, res, next) {
  const rentalId = parseInt(req.params.id);

  await rentalsService.deleteRental(rentalId);

  res.sendStatus(200);
}


const rentalsController = {
  getRentals,
  postRental,
  returnRental,
  deleteRental
}

export default rentalsController;