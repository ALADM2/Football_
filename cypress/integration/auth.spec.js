beforeEach(() => {
  cy.visit('localhost:3000')
})

// The description of the test
it('register a user with name, email and password', () => {
  cy.get('.nav-link').contains('Register') // The nav link text contains "Register"
  cy.get('.nav-link').first().click() // Click on the Register nav link
  cy.get('input[name="name"]').type('Student') // Find the input with the name "name", then type a value
  cy.get('input[name="email"]').type('Student@student.op.ac.nz') // Find the input with the name "email", then type a value
  cy.get('input[name="password"]').type('password') // Find the input with the name "password", then type a value
  cy.get('.button').click() // Find the element with the class .button, then click it
})

it('login a user with email and password and logout', () => {
  cy.get('.nav-link').contains('Login') // The nav link text contains "Login"
  cy.get('.nav-link').last().click() // Click on the Login nav link
  cy.get('input[name="email"]').type('MikeAE@student.op.ac.nz') // Find the input with the name "email", then type a value
  cy.get('input[name="password"]').type('password') // Find the input with the name "password", then type a value
  cy.get('.button').click() // Find the element with the class .button, then click it
  cy.get('li').contains('Logout') // The li link text contains "Logout"
  cy.get('li').last().click() // Log the user out
})


