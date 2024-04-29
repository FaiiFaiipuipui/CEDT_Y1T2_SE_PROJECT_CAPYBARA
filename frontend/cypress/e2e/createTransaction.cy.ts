import "cypress-file-upload";
describe("Test create transaction function", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");

    cy.get("button").contains("SIGN IN").click();
    cy.get("input[name=email]").type("user@gmail.com");
    cy.get("input[name=password]").type("user12345");
    cy.get("button").contains("Login").click();
    cy.url().should("eq", "http://localhost:3000/");
  });
  it("Booking campground first", () => {
    cy.get("button").contains("BOOKING").click();
    cy.wait(3000);

    cy.get("#campground").select("อุทยานแห่งชาติตะรุเตา");
    cy.get('input[type="date"]').type("2024-05-10");
    cy.get("button").contains("Book!").click();
    cy.wait(3000);

    cy.url().should("eq", "http://localhost:3000/dashboard");
  });

  it("Upload empty file to a transaction", () => {
    cy.get("button").contains("DASHBOARD").click();
    cy.wait(1000);

    cy.get("#transaction-card").should("have.length.greaterThan", 0);
    cy.get("button").contains("Pay").click();
    cy.wait(1000);

    cy.get("button").contains("Submit").click();
    cy.on("window:alert", (str) => {
      expect(str).to.equal("Please upload Slip");
    });
  });

  it("Upload not image file type to a transaction", () => {
    cy.get("button").contains("DASHBOARD").click();
    cy.wait(1000);

    cy.get("#transaction-card").should("have.length.greaterThan", 0);
    cy.get("button").contains("Pay").click();
    cy.wait(3000);

    // invisible input field
    cy.get("input[type=file]").attachFile("Error.pdf", {
      force: true,
    });

    cy.get("button").contains("Submit").click();
    cy.on("window:alert", (str) => {
      expect(str).to.equal("Please upload Slip");
    });
  });

  it("Upload image file type to a transaction", () => {
    cy.get("button").contains("DASHBOARD").click();
    cy.wait(1000);

    cy.get("#transaction-card").should("have.length.greaterThan", 0);
    cy.get("button").contains("Pay").click();
    cy.wait(1000);

    cy.get("input[type=file]").attachFile("Slip.png");
    cy.wait(3000);

    cy.get("button").contains("Submit").click();
    cy.wait(1000);

    // cy.get("div.popup")
    //   .should("exist")
    //   .then(($popup) => {
    //     // Check if the popup is hidden
    //     if ($popup.css("display") === "none") {
    //       // If hidden, force the display to be 'block' to make it visible
    //       $popup.css("display", "block");
    //     }
    //   });

    // // Then assert that the text "Successfully upload" is visible within the popup
    cy.contains("Successfully upload").should("be.visible");
    cy.wait(5000);

    cy.url().should("eq", "http://localhost:3000/dashboard");
  });
});
