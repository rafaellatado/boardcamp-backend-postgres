export function badRequestError() {
  return {
    type: 'badRequest',
    message: `Bad request test.`
  }
}

export function existingGame() { 
  return {
    type: 'conflict',
    message: `There is already a game with the exact same name in our database.`
  }
}

export function invalidCategoryError() {
  return {
    type: 'invalidCategory',
    message: `Test invalidCategory error.`
  }
}

export function existingCustomer() {
  return {
    type: 'conflict',
    message: `There is already a customer with the same cpf in our database.`
  }
}

  export function joiError(messages) {
    return {
      type: 'badRequest',
      message: messages
    }
  }
