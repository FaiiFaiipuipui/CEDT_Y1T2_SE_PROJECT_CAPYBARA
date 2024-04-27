describe('Test getting announcements', () => {
  // it('Get all announcements', () => {
  //   cy.visit('http://localhost:3000');

  //   cy.get('button').contains('SIGN IN').click();

  //   cy.get('input[name=email]').type('admin@gmail.com')
  //   cy.get('input[name=password]').type('admin1234')
  //   cy.get('button').contains('Login').click();
  //   cy.url().should('eq', 'http://localhost:3000/');

  //   cy.get('button').contains('CAMPGROUND').click();

  //   cy.get('#announcement-card').should('have.length.greaterThan', 0);
  // });

  it('Get announcements for each campground', () => {
    cy.visit('http://localhost:3000');
  
    cy.get('button').contains('SIGN IN').click();
  
    cy.get('input[name=email]').type('admin@gmail.com')
    cy.get('input[name=password]').type('admin1234')
    cy.get('button').contains('Login').click();
    cy.url().should('eq', 'http://localhost:3000/');
  
    cy.get('button').contains('CAMPGROUND').click();
  
    cy.get('#campground-card').each(($name, index) => {
      // Click on the campground name
      cy.wrap($name).click();
  
      // Check that the URL has changed
      cy.url().should('not.eq', 'http://localhost:3000/');

      cy.contains('Announcement');

      // Go back to the campground page
      cy.get('button').contains('Back').click();
  
      // Check that the URL is back to the original
      cy.url().should('eq', 'http://localhost:3000/campground');
    });
  });
})