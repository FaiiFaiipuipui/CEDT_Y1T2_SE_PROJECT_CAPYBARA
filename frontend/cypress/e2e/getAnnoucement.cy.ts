describe('Test getting announcements', () => {
  it('Get all announcements', () => {
    cy.visit('http://localhost:3000');

    cy.get('button').contains('SIGN IN').click();

    cy.get('input[name=email]').type('admin@gmail.com')
    cy.get('input[name=password]').type('admin1234')
    cy.get('button').contains('Login').click();
    cy.url().should('eq', 'http://localhost:3000/');

    cy.get('button').contains('CAMPGROUND').click();

    cy.get('#announcement-card').should('have.length.greaterThan', 0);
  });

  it('Get announcements for each campground', () => {
    cy.visit('http://localhost:3000');
  
    cy.get('button').contains('SIGN IN').click();
  
    cy.get('input[name=email]').type('admin@gmail.com')
    cy.get('input[name=password]').type('admin1234')
    cy.get('button').contains('Login').click();
    cy.url().should('eq', 'http://localhost:3000/');
  
    cy.get('button').contains('CAMPGROUND').click();
  
    cy.get('.campground-card').then(($cards) => {
      const totalCards = $cards.length;
  
      for (let i = 0; i < totalCards; i++) {
        cy.get('.campground-card').eq(i).click();
        cy.url().should('not.eq', 'http://localhost:3000/campground');
        cy.contains('Announcement');
        cy.go('back');
        cy.url().should('eq', 'http://localhost:3000/campground');
      }
    });
  });
})