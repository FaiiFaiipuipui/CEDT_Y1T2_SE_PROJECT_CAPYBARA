describe("Test create announcement function by user role", () => {
  beforeEach(() => {
    cy.viewport(1440, 800);
    cy.visit("http://localhost:3000", { timeout: 30000 });
    cy.get("button").contains("SIGN IN").click();
    cy.get('input[name="email"]')
      .type("user123@gmail.com")
      .should("have.value", "user123@gmail.com");
    cy.get("input[name=password]")
      .type("user1234")
      .should("have.value", "user1234");
    cy.get("button").contains("Login").click();
    cy.url().should("eq", "http://localhost:3000/");
    cy.get("button").contains("SIGN OUT").should("contain", "SIGN OUT");
    cy.get("button").contains("CAMPGROUND").click();
    cy.url().should("eq", "http://localhost:3000/campground");
  });

  it("Create announcement button should not exist", () => {
    cy.get('button[id="createAnncButton"]').should("not.exist");
  });
});

describe("Test create announcement function by admin role", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000", { timeout: 30000 });
    cy.get("button").contains("SIGN IN").click();
    cy.get('input[name="email"]')
      .type("admin@gmail.com")
      .should("have.value", "admin@gmail.com");
    cy.get("input[name=password]")
      .type("admin1234")
      .should("have.value", "admin1234");
    cy.get("button").contains("Login").click();
    cy.url().should("eq", "http://localhost:3000/");
    cy.get("button").contains("SIGN OUT").should("contain", "SIGN OUT");
    cy.get("button").contains("CAMPGROUND").click();
    cy.url().should("eq", "http://localhost:3000/campground");

    cy.get('button[id="createAnncButton"]')
      .should("exist")
      .click({ force: true });

    cy.fixture("announcementData").then((data) => {
      this.data = data;
    });
  });

  it('"title" field is empty string', () => {
    cy.get("#title").type(this.data.content);
    cy.wait(3000);
    cy.get("#campground").select(this.data.campground);
    cy.get("#startdate").type(this.data.startDate, { force: true });
    cy.get("#enddate").type(this.data.endDate, { force: true });
    cy.get('button[id="OK"]').click({ force: true });
    cy.wait(3000);
    cy.on("window:alert", (str) => {
      expect(str).to.equal("Please fill in the missing fields!");
    });
  });

  it('"content" field is empty string', () => {
    cy.get("#content").type(this.data.title);
    cy.wait(3000);
    cy.get("#campground").select(this.data.campground);
    cy.get("#startdate").type(this.data.startDate, { force: true });
    cy.get("#enddate").type(this.data.endDate, { force: true });
    cy.get('button[id="OK"]').click({ force: true });
    cy.on("window:alert", (str) => {
      expect(str).to.equal("Please fill in the missing fields!");
    });
  });

  it('"startDate" field is empty string', () => {
    cy.get("#title").type(this.data.title);
    cy.get("#content").type(this.data.content);
    cy.wait(3000);
    cy.get("#campground").select(this.data.campground);
    cy.get("#enddate").type(this.data.endDate, { force: true });
    cy.get('button[id="OK"]').click({ force: true });
    cy.on("window:alert", (str) => {
      expect(str).to.equal("Please fill in the missing fields!");
    });
  });

  it('"endDate" field is empty string', () => {
    cy.get("#title").type(this.data.title);
    cy.get("#content").type(this.data.content);
    cy.wait(3000);
    cy.get("#campground").select(this.data.campground);
    cy.get("#startdate").type(this.data.startDate, { force: true });
    cy.get('button[id="OK"]').click({ force: true });
    cy.on("window:alert", (str) => {
      expect(str).to.equal("Please fill in the missing fields!");
    });
  });

  it('"campground" field is empty string', () => {
    cy.get("#title").type(this.data.title);
    cy.get("#content").type(this.data.content);
    cy.wait(3000);
    cy.get("#startdate").type(this.data.startDate, { force: true });
    cy.get("#enddate").type(this.data.endDate, { force: true });
    cy.get('button[id="OK"]').click({ force: true });
    cy.on("window:alert", (str) => {
      expect(str).to.equal("Please fill in the missing fields!");
    });
  });

  it('"startDate" is the day before today', () => {
    cy.get("#title").type(this.data.title);
    cy.get("#content").type(this.data.content);
    cy.wait(3000);
    cy.get("#campground").select(this.data.campground);
    cy.get("#startdate").type(this.data.startDateBeforeToday, { force: true });
    cy.get("#enddate").type(this.data.endDate, { force: true });
    cy.get('button[id="OK"]').click({ force: true });
    cy.on("window:alert", (str) => {
      expect(str).to.equal("Invalid start date");
    });
  });

  it('"startDate" is the day after or the same day as today', () => {
    cy.get("#title").type(this.data.title);
    cy.get("#content").type(this.data.content);
    cy.wait(3000);
    cy.get("#campground").select(this.data.campground);
    cy.get("#startdate").type(this.data.startDateBeToday, { force: true });
    cy.get("#enddate").type(this.data.endDate, { force: true });
    cy.get('button[id="OK"]').click({ force: true });
    cy.on("window:alert", (str) => {
      expect(str).to.equal("Successfully added Announcement!!");
    });
  });

  it('"startDate" is the day after "endDate"', () => {
    cy.get("#title").type(this.data.title);
    cy.get("#content").type(this.data.content);
    cy.wait(3000);
    cy.get("#campground").select(this.data.campground);
    cy.get("#startdate").type(this.data.startDateAfterEndDate, { force: true });
    cy.get("#enddate").type(this.data.endDate, { force: true });
    cy.get('button[id="OK"]').click({ force: true });
    cy.on("window:alert", (str) => {
      expect(str).to.equal("Start date has to be before end date");
    });
  });

  it('"startDate" is before or the same day as "endDate"', () => {
    cy.get("#title").type(this.data.title);
    cy.get("#content").type(this.data.content);
    cy.wait(3000);
    cy.get("#campground").select(this.data.campground);
    cy.get("#startdate").type(this.data.startDateBeEndDate, { force: true });
    cy.get("#enddate").type(this.data.endDate, { force: true });
    cy.get('button[id="OK"]').click({ force: true });
    cy.on("window:alert", (str) => {
      expect(str).to.equal("Successfully added Announcement!!");
    });
  });

  it("All fields are filled with correct type", () => {
    cy.get("#title").type(this.data.title);
    cy.get("#content").type(this.data.content);
    cy.wait(3000);
    cy.get("#campground").select(this.data.campground);
    cy.get("#startdate").type(this.data.startDate, { force: true });
    cy.get("#enddate").type(this.data.endDate, { force: true });
    cy.get('button[id="OK"]').click({ force: true });
    cy.on("window:alert", (str) => {
      expect(str).to.equal("Successfully added Announcement!!");
    });
  });
});
