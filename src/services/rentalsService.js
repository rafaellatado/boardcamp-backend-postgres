import rentalsRepository from "../repositories/rentalsRepository.js";

async function getRentals() {
  const result = await rentalsRepository.getRentals();
  return result;
}

const rentalsService = {
  getRentals
}

export default rentalsService;