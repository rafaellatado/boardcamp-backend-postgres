import rentalsRepository from "../repositories/rentalsRepository.js";

async function getRentals() {
  const result = await rentalsRepository.getRentals();
  return result;
}

async function postRental(customerData) {
  const currentDate = new Date().toISOString().split('T')[0];

  const game = await gamesRepository.getGameById(customerData.gameId);
  if (!game) throw new Error("Game not found");

  const originalPrice = customerData.daysRented * game.pricePerDay;

  const rentalData = {
    ...customerData,
    rentDate: currentDate,
    originalPrice,
    returnDate: null,
    delayFee: null
  };

  return await rentalsRepository.insertRental(rentalData);
} 

const rentalsService = {
  getRentals,
  postRental
}

export default rentalsService;