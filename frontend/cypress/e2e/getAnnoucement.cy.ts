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
  
    cy.get('.campground-card').then(($cards) => {
      const totalCards = $cards.length;
  
      for (let i = 0; i < totalCards; i++) {
        cy.get('.campground-card').eq(i).then(($card) => {
          const campgroundName = $card.find('.campground-name').text();
  
          cy.log('Campground name: ', campgroundName);
  
          cy.wrap($card).click();
          cy.url().should('not.eq', 'http://localhost:3000/campground');

          cy.wait(1000);

          // Check if there are any announcements
          cy.get('.announcement-card').then(($announcementCard) => {
            if ($announcementCard.length > 0) {
                const announcementCampgroundName = $announcementCard.find('.campground-name').text();
                cy.log('Announcement campground name: ', announcementCampgroundName);
            }
          });
          
  
          cy.go('back');
          cy.url().should('eq', 'http://localhost:3000/campground');
        });
      }
    });
  });
})