import { db } from "../config/database.connection.js";

async function getCustomers() {
  const result = await db.query(`SELECT * FROM customers;`);
  return result.rows; 
}

async function getCustomerById(id) {
  const result = await db.query(`SELECT * FROM customers WHERE id = $1;`, [id]);
  return result.rows[0]; 
}

async function findCustomerByCpf(cpf) {
  const result = await db.query(`SELECT * FROM customers WHERE cpf = $1;`, [cpf]);
  return result.rows[0];
}

async function postCustomer(customerData) {

  const result = await db.query(
    `INSERT INTO customers ("name", "phone", "cpf") VALUES($1, $2, $3)`, 
    [customerData.name, customerData.phone, customerData.cpf]
  );
}

const customersRepository = {
  getCustomers,
  getCustomerById,
  findCustomerByCpf,
  postCustomer
}

export default customersRepository;