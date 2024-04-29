describe('Test filtering function', () => {

    beforeEach(() => {
      cy.viewport(1440, 800);
      cy.visit("http://localhost:3000");
  
      cy.get("button").contains("SIGN IN").click();
      cy.get("input[name=email]").type("admin@gmail.com");
      cy.get("input[name=password]").type("admin1234");
      cy.get("button").contains("Login").click();
      cy.url().should("eq", "http://localhost:3000/");
      
    });

    it('Delete an announcement from a campgrounds page', () => {
      cy.get("button").contains("CAMPGROUND").click();
      cy.url().should("eq", "http://localhost:3000/campground");
      
      cy.wait(1000);
  
      cy.get('#announcement-card').should('have.length.greaterThan', 0);
      cy.get("#announcement-card").first().find("button#announcement-delete-button").click()
    });

    it('Delete an announcement from a campground/[cid] page', () => {
      cy.get("button").contains("CAMPGROUND").click();
      cy.url().should("eq", "http://localhost:3000/campground");

      cy.wait(1000);

      cy.get("a#66191db24f65e3b7f5ac618e").click();
      cy.url().should("eq", "http://localhost:3000/campground/66191db24f65e3b7f5ac618e");
      
      cy.wait(1000);
  
      cy.get('#announcement-card').should('have.length.greaterThan', 0);
      cy.get("#announcement-card").first().find("button#announcement-delete-button").click()
    });
  })