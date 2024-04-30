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

  // it('Get announcements for each campground', () => {
  //   cy.visit('http://localhost:3000');
  
  //   cy.get('button').contains('SIGN IN').click();
  
  //   cy.get('input[name=email]').type('admin@gmail.com')
  //   cy.get('input[name=password]').type('admin1234')
  //   cy.get('button').contains('Login').click();
  //   cy.url().should('eq', 'http://localhost:3000/');
  
  //   cy.get('button').contains('CAMPGROUND').click();
  
  //   cy.get('.campground-card').then(($cards) => {
  //     const totalCards = $cards.length;
  
  //     for (let i = 0; i < totalCards; i++) {
  //       cy.get('.campground-card').eq(i).then(($card) => {

  //         cy.wrap($card).click();
  //         cy.url().should('not.eq', 'http://localhost:3000/campground');

  //         const campgroundName = $card.find('.campground-name').text();
  //         cy.log('Campground name: ', campgroundName);

  //         // cy.log(`${cy.get(".announcement-small-card").should("have.length.greaterThan", 0)}`)
  //         if (cy.get(".announcement-small-card").should("not.exist")) {
  //           cy.get('.announcement-small-card').then(($announcementCard) => {
  //             const totalAnnouncements = $announcementCard.length;
  //             cy.log('Total announcements: ', totalAnnouncements);
  //           });
  //         }

  //         cy.go('back');
  //         cy.url().should('eq', 'http://localhost:3000/campground');
  //       });
  //     }
  //   });
  // });

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