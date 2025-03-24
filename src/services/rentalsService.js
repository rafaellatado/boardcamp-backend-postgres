import customersRepository from "../repositories/customersRepository.js";
import gamesRepository from "../repositories/gamesRepository.js";
import rentalsRepository from "../repositories/rentalsRepository.js";

async function getRentals() {
  const result = await rentalsRepository.getRentals();
  return result;
}

async function postRental(rentalData) {
  const { customerId, gameId, daysRented } = rentalData;

  // Validações de entrada (400 - BAD REQUEST)
  if (!customerId || !gameId || !daysRented || daysRented <= 0) {
    throw { type: 'badRequest', message: "Invalid rental data" };
  }

  // Verifica se o jogo existe (404 - NOT FOUND)
  const game = await gamesRepository.getGameById(gameId);
  if (!game) {
    throw { type: 'notFound', message: "Game not found" };
  }

  // Verifica se o cliente existe (404 - NOT FOUND)
  const customer = await customersRepository.getCustomerById(customerId);
  if (!customer) {
    throw { type: 'notFound', message: "Customer not found" };
  }

  // Verifica se há jogos disponíveis (422 - UNPROCESSABLE ENTITY)
  const rentals = await rentalsRepository.getActiveRentalsByGameId(gameId);
  if (rentals.length >= game.stockTotal) {
    throw { type: 'invalidCategory', message: "No available copies of this game" }; 
  }

  // Define os valores automáticos
  const rentDate = new Date().toISOString().split("T")[0];
  const originalPrice = daysRented * game.pricePerDay;

  // Insere o aluguel no banco
  await rentalsRepository.insertRental({
    customerId,
    gameId,
    rentDate,
    daysRented,
    returnDate: null,
    originalPrice,
    delayFee: null
  });

  return { status: 201 };
}

async function returnRental(rentalId) {
  // Buscar o aluguel
  const rental = await rentalsRepository.getRentalById(rentalId);
  
  // Verificar se o aluguel existe
  if (!rental) {
    throw { type: 'notFound', message: "Rental not found" };
  }

  // Verificar se o aluguel já foi finalizado
  if (rental.returnDate !== null) {
    throw { type: 'invalidCategory', message: "Rental already returned" };
  }

  // Calcular o delayFee
  const rentDate = new Date(rental.rentDate);
  const returnDate = new Date();
  const daysRented = rental.daysRented;

  // Calcular o atraso, se houver
  let delayFee = 0;
  if (returnDate > new Date(rentDate.setDate(rentDate.getDate() + daysRented))) {
    const delayDays = Math.ceil((returnDate - rentDate) / (1000 * 3600 * 24)); // Dias de atraso
    delayFee = delayDays * rental.originalPrice; // Atraso * preço por dia
  }

  // Atualizar o aluguel no banco
  await rentalsRepository.returnRental(rentalId, returnDate, delayFee);

  return { message: "Rental returned successfully" };
}

async function deleteRental(rentalId) {
  await rentalsRepository.deleteRental(rentalId);
}

const rentalsService = {
  getRentals,
  postRental,
  returnRental,
  deleteRental
}

export default rentalsService;