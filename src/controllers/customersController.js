import customersService from "../services/customersService.js";

async function getCustomers(req, res) {
  const customers = await customersService.getCustomers();
  res.send(customers);
}

async function getCustomerById(req, res) {
  const { id } = req.params;
  const customer = await customersService.getCustomerById(id);

  if (!customer) {
    return res.status(404).send({ message: "Cliente não encontrado" });
  }

  res.send(customer);
}

async function postCustomer(req, res) {
  const customerData = req.body;
  await customersService.postCustomer(customerData);
  res.sendStatus(201);
}

const customersController = {
  getCustomers,
  getCustomerById,
  postCustomer
}

export default customersController;