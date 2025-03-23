import { existingCustomer } from "../errors/errors.js";
import customersRepository from "../repositories/customersRepository.js";

async function getCustomers() {
  const result = await customersRepository.getCustomers();
  return result;
}

async function getCustomerById(id) {
  return await customersRepository.getCustomerById(id);
}

async function postCustomer(customerData) {
  const cpfExists = await customersRepository.findCustomerByCpf(customerData.cpf);

  if (cpfExists) throw existingCustomer();

  await customersRepository.postCustomer(customerData);
}

const customersService = {
  getCustomers,
  getCustomerById,
  postCustomer
}

export default customersService;
