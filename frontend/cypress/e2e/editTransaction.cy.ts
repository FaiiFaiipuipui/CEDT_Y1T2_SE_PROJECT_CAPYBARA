import "cypress-file-upload";

const userName = "LastTestForEdit";
const userPassword = "123456";

describe("Test edit transaction function", () => {
  beforeEach(() => {
    cy.viewport(1440, 800);
    cy.visit("http://localhost:3000");
    cy.get("button").contains("SIGN IN").click();
    cy.get("input[name=email]").type(`${userName}@gmail.com`);
    cy.get("input[name=password]").type(userPassword);
    cy.get("button").contains("Login").click();
    cy.wait(3000);
    cy.url().should("eq", "http://localhost:3000/");
  });

  it("Booking Campground and create Transaction and Check if it exist", () => {
    cy.get("button").contains("BOOKING").click();
    cy.wait(3000);

    cy.get("#campground").select("อุทยานแห่งชาติตะรุเตา");
    cy.get('input[type="date"]').type("2024-05-10");
    cy.get("button").contains("Book!").click();
    cy.wait(3000);

    cy.url().should("eq", "http://localhost:3000/dashboard");

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

    cy.visit("http://localhost:3000");
    cy.get("button").contains("SIGN OUT").click();
    cy.get("button").contains("Sign out").click();
    cy.url().should("eq", "http://localhost:3000/");

    cy.get("button").contains("SIGN IN").click();
    cy.get("input[name=email]").type("admin@gmail.com");
    cy.get("input[name=password]").type("admin1234");
    cy.get("button").contains("Login").click();
    cy.url().should("eq", "http://localhost:3000/");

    cy.visit("http://localhost:3000/dashboard");
    cy.get(`[data-testid="edit-button-${userName}"]`).click();
    cy.wait(5000);
    cy.url().should("contain", "http://localhost:3000/transaction");

    cy.get('[data-testid="rejected-radio"]').click();
    cy.wait(1000);

    cy.get("button").contains("Submit").click();
    cy.wait(1000);

    cy.url().should("eq", "http://localhost:3000/dashboard");
  });

  it("Payment transaction has the edit button and Link to the transcation page", () => {
    cy.visit("http://localhost:3000/dashboard");

    cy.get("button").contains("DASHBOARD").click();
    cy.wait(1000);

    cy.get("#transaction-card").should("have.length.greaterThan", 0);
    cy.get("button").contains("Edit").click();
    cy.wait(1000);

    cy.get("button").contains("Next").click();

    cy.get("button").contains("Submit").click();
    cy.wait(1000);
    cy.on("window:alert", (str) => {
      expect(str).to.equal("Please upload Slip");
    });
  });

  it("Upload Invalid file", () => {
    cy.visit("http://localhost:3000/dashboard");

    cy.get("button").contains("DASHBOARD").click();
    cy.wait(1000);

    cy.get("#transaction-card").should("have.length.greaterThan", 0);
    cy.get("button").contains("Edit").click();
    cy.wait(1000);

    cy.get("button").contains("Next").click();

    cy.get("input[type=file]").attachFile("Error.pdf");
    cy.wait(3000);

    cy.get("button").contains("Submit").click();
    cy.wait(1000);
    cy.on("window:alert", (str) => {
      expect(str).to.equal("Please upload Slip");
    });
  });

  it("Check custom link", () => {
    cy.visit("http://localhost:3000/payment/edit?tid=15312");
    cy.wait(4000);
    cy.contains("Pending...");
  });

  it("Upload image file type to a transaction", () => {
    cy.get("button").contains("DASHBOARD").click();
    cy.wait(1000);

    cy.get("#transaction-card").should("have.length.greaterThan", 0);
    cy.get("button").contains("Edit").click();
    cy.wait(1000);
    cy.get("button").contains("Next").click();

    cy.get("input[type=file]").attachFile("Slip.png");
    cy.wait(3000);

    cy.get("button").contains("Submit").click();
    cy.wait(1000);

    // // Then assert that the text "Successfully upload" is visible within the popup
    cy.contains("Successfully upload").should("be.visible");
    cy.wait(5000);

    cy.url().should("eq", "http://localhost:3000/dashboard");
  });
});
