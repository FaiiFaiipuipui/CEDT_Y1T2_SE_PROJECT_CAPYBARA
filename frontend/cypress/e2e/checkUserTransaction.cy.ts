import "cypress-file-upload";
describe("Test check user transaction", () => {
  before(() => {
    cy.viewport(1440, 800);
    cy.visit("http://localhost:3000");

    cy.get("button").contains("SIGN IN").click();
    cy.get("input[name=email]").type("check@gmail.com");
    cy.get("input[name=password]").type("check1234");
    cy.get("button").contains("Login").click();
    cy.wait(5000);
    cy.get("button").contains("BOOKING").click();
    cy.wait(5000);

    cy.get("#campground").select("อุทยานแห่งชาติทับลาน");
    cy.wait(5000);
    cy.get('input[type="date"]').type("2024-05-15");
    cy.get("button").contains("Book!").click();
    cy.wait(5000);

    // cy.url().should("eq", "http://localhost:3000/dashboard");

    cy.get("button").contains("DASHBOARD").click();
    cy.wait(5000);

    cy.get("button").contains("Pay").click();
    cy.wait(5000);

    cy.get("input[type=file]").attachFile("Slip.png");
    cy.wait(5000);

    cy.get("button").contains("Submit").click();
    cy.wait(5000);

    cy.get("button").contains("SIGN OUT").click();
    cy.get("button").contains("Sign out").click();
    cy.wait(5000);
  });
  it("No input status test", () => {
    cy.visit("http://localhost:3000");

    cy.get("button").contains("SIGN IN").click();
    cy.get("input[name=email]").type("admin@gmail.com");
    cy.get("input[name=password]").type("admin1234");
    cy.get("button").contains("Login").click();
    cy.url().should("eq", "http://localhost:3000/");

    cy.get("button").contains("DASHBOARD").click();
    cy.wait(5000);

    cy.get("button").contains("Verify").click();
    cy.wait(5000);
    cy.get("button").contains("Submit").click();

    cy.on("window:alert", (str) => {
      expect(str).to.equal("Please select transaction status!");
    });
    // cy.contains("Please select transaction status!").should("be.visible");
  });
  it("Rejected transaction status test", () => {
    cy.visit("http://localhost:3000");

    cy.get("button").contains("SIGN IN").click();
    cy.get("input[name=email]").type("admin@gmail.com");
    cy.get("input[name=password]").type("admin1234");
    cy.get("button").contains("Login").click();
    cy.url().should("eq", "http://localhost:3000/");
    cy.get("button").contains("DASHBOARD").click();
    cy.wait(5000);

    cy.get("button").contains("Verify").click();
    cy.wait(5000);
    cy.get("input[value=REJECTED]").click();
    cy.contains("Payment Rejected").should("exist");
    cy.get("button").contains("Submit").click();
    cy.wait(5000);
    cy.url().should("eq", "http://localhost:3000/dashboard");
    cy.get("button").contains("SIGN OUT").click();
    cy.get("button").contains("Sign out").click();
    cy.wait(5000);
  });

  it("Completed transaction status test", () => {
    cy.visit("http://localhost:3000");

    cy.get("button").contains("SIGN IN").click();
    cy.get("input[name=email]").type("check@gmail.com");
    cy.get("input[name=password]").type("check1234");
    cy.get("button").contains("Login").click();
    cy.get("button").contains("DASHBOARD").click();
    cy.get("button").contains("Edit").click();
    cy.wait(5000);
    cy.get("button").contains("Next").click();
    cy.wait(3000);
    cy.get("input[type=file]").attachFile("Slip.png");
    cy.wait(5000);

    cy.get("button").contains("Submit").click();
    cy.wait(5000);

    cy.get("button").contains("SIGN OUT").click();
    cy.get("button").contains("Sign out").click();
    cy.wait(5000);

    cy.get("button").contains("SIGN IN").click();
    cy.get("input[name=email]").type("admin@gmail.com");
    cy.get("input[name=password]").type("admin1234");
    cy.get("button").contains("Login").click();
    cy.url().should("eq", "http://localhost:3000/");

    cy.get("button").contains("DASHBOARD").click();
    cy.wait(5000);

    cy.get("button").contains("Verify").click();
    cy.wait(5000);
    cy.get("input[value=COMPLETED]").click();
    cy.contains("Payment Completed").should("exist");
    cy.get("button").contains("Submit").click();
    cy.wait(5000);
    cy.url().should("eq", "http://localhost:3000/dashboard");
  });
});
