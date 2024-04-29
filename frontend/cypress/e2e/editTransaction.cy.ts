import "cypress-file-upload";

describe("Test edit transaction function", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
    cy.get("button").contains("SIGN IN").click();
    cy.get("input[name=email]").type("EditTest@gmail.com");
    cy.get("input[name=password]").type("12345678");
    cy.get("button").contains("Login").click();
    cy.url().should("eq", "http://localhost:3000/");
  });

  // it("Booking Campground and create Transaction and Check if it exist", () => {
  //   cy.get("button").contains("BOOKING").click();
  //   cy.wait(3000);

  //   cy.get("#campground").select("อุทยานแห่งชาติตะรุเตา");
  //   cy.get('input[type="date"]').type("2024-05-10");
  //   cy.get("button").contains("Book!").click();

  // });
  it("Open Dashboard and add transaction", () => {
    cy.visit("http://localhost:3000/dashboard");


    cy.get("button").contains("DASHBOARD").click();
    cy.wait(1000);

    cy.get("#transaction-card").should("have.length.greaterThan", 0);
    cy.get("button").contains("Pay").click();
    cy.wait(1000);

    cy.get("input[type=file]").attachFile("SlipTestEdit.jpg");
    cy.wait(3000);

    cy.get("button").contains("Submit").click();
    cy.wait(1000);

    cy.contains("Successfully upload").should("be.visible");
    cy.wait(5000);

    cy.url().should("eq", "http://localhost:3000/dashboard");

  });

});