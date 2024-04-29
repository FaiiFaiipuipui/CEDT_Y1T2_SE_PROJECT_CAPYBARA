describe('Test filtering function', () => {
  it('Default status includes all transactions', () => {
    cy.visit('http://localhost:3000');

    cy.get('button').contains('SIGN IN').click();
    cy.get('input[name=email]').type('admin@gmail.com');
    cy.get('input[name=password]').type('admin1234');
    cy.get('button').contains('Login').click();
    cy.url().should('eq', 'http://localhost:3000/');

    cy.get('button').contains('DASHBOARD').click();

    cy.wait(1000);

    cy.get('#transaction-card').should('have.length.greaterThan', 0);
  });
  
  it('Waiting status includes the waiting transaction', () => {
    cy.visit('http://localhost:3000')

    cy.get('button').contains('SIGN IN').click();

    cy.get('input[name=email]').type('admin@gmail.com')
    cy.get('input[name=password]').type('admin1234')
    cy.get('button').contains('Login').click();
    cy.url().should('eq', 'http://localhost:3000/');

    cy.get('button').contains('DASHBOARD').click();

    cy.get('#lock-button').click();
    
    cy.get('ul li').contains('WAITING').click();
    cy.wait(1000);
    cy.get('#transaction-card').each(($card) => {
      cy.wrap($card).within(() => {
        cy.contains('WAITING');
      });
    });
  });
  
  it('Verifying status includes the verifying transaction', () => {
    cy.visit('http://localhost:3000')

    cy.get('button').contains('SIGN IN').click();

    cy.get('input[name=email]').type('admin@gmail.com')
    cy.get('input[name=password]').type('admin1234')
    cy.get('button').contains('Login').click();
    cy.url().should('eq', 'http://localhost:3000/');

    cy.get('button').contains('DASHBOARD').click();

    cy.get('#lock-button').click();
    
    cy.get('ul li').contains('VERIFYING').click();
    cy.wait(1000);
    cy.get('#transaction-card').each(($card) => {
      cy.wrap($card).within(() => {
        cy.contains('VERIFYING');
      });
    });
  });

  it('Rejected status includes the rejected status', () => {
    cy.visit('http://localhost:3000')

    cy.get('button').contains('SIGN IN').click();

    cy.get('input[name=email]').type('admin@gmail.com')
    cy.get('input[name=password]').type('admin1234')
    cy.get('button').contains('Login').click();
    cy.url().should('eq', 'http://localhost:3000/');

    cy.get('button').contains('DASHBOARD').click();

    cy.get('#lock-button').click();
    
    cy.get('ul li').contains('REJECTED').click();
    cy.wait(1000);
    cy.get('#transaction-card').each(($card) => {
      cy.wrap($card).within(() => {
        cy.contains('REJECTED');
      });
    });
  });

  it('Completed status includes the complete status', () => {
    cy.visit('http://localhost:3000')

    cy.get('button').contains('SIGN IN').click();

    cy.get('input[name=email]').type('admin@gmail.com')
    cy.get('input[name=password]').type('admin1234')
    cy.get('button').contains('Login').click();
    cy.url().should('eq', 'http://localhost:3000/');

    cy.get('button').contains('DASHBOARD').click();

    cy.get('#lock-button').click();
    
    cy.get('ul li').contains('COMPLETED').click();
    cy.wait(1000);
    cy.get('#transaction-card').each(($card) => {
      cy.wrap($card).within(() => {
        cy.contains('COMPLETED');
      });
    });
  });
})