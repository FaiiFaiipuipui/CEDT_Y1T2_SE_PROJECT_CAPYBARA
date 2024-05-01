describe('Test getting announcements', () => {
  it('Get all announcements', () => {
    cy.viewport(1440, 800);
    cy.visit('http://localhost:3000');

    cy.get('button').contains('SIGN IN').click();

    cy.get('input[name=email]').type('admin@gmail.com')
    cy.get('input[name=password]').type('admin1234')
    cy.get('button').contains('Login').click();
    cy.url().should('eq', 'http://localhost:3000/');

    cy.get('button').contains('CAMPGROUND').click();

    cy.get('.announcement-small-card').should('have.length.greaterThan', 0);
  });

  it('Announcements not exist in that campground', () => {
    cy.visit('http://localhost:3000');
  
    cy.get('button').contains('SIGN IN').click();
  
    cy.get('input[name=email]').type('admin@gmail.com')
    cy.get('input[name=password]').type('admin1234')
    cy.get('button').contains('Login').click();
    cy.url().should('eq', 'http://localhost:3000/');
  
    cy.get('button').contains('CAMPGROUND').click();

    cy.get('.campground-card').contains('ไทรโยค').click();

    cy.get('.announcement-small-card').should('not.exist');
  });

  it('Announcements exist in that campground', () => {
    cy.visit('http://localhost:3000');
  
    cy.get('button').contains('SIGN IN').click();
  
    cy.get('input[name=email]').type('admin@gmail.com')
    cy.get('input[name=password]').type('admin1234')
    cy.get('button').contains('Login').click();
    cy.url().should('eq', 'http://localhost:3000/');
  
    cy.get('button').contains('CAMPGROUND').click();

    cy.get('.campground-card').contains('ดอยอินทนนท์').click();

    cy.get('.announcement-small-card').should('exist');
  });
})