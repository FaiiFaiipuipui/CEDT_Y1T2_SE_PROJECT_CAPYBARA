describe("Test create transaction function", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");

    cy.get("button").contains("SIGN IN").click();
    cy.get("input[name=email]").type("admin@gmail.com");
    cy.get("input[name=password]").type("admin1234");
    cy.get("button").contains("Login").click();
    cy.url().should("eq", "http://localhost:3000/");
  });

  it("1. Check title cannot be empty", () => {
    cy.get("button").contains("CAMPGROUND").click();

    cy.get(':nth-child(2) > .bg-white > .justify-between > .flex > :nth-child(1)').click();
    cy.wait(1000);
    cy.get('.text-sm.max-w-lg.min-w-sm.min-h-14.w-full.border.rounded-md.p-2.bg-gray-100.border-1.border-cadetblue.mt-4').clear();
    cy.get('.bg-fern').click();
    
    cy.on("window:alert", (str) => {
      expect(str).to.equal("Please Fill all fields");
       
      });
  });

  it("2. Check content cannot be empty", () => {
    cy.get("button").contains("CAMPGROUND").click();

    cy.get(':nth-child(2) > .bg-white > .justify-between > .flex > :nth-child(1)').click();
    cy.wait(1000);
    cy.get('.text-sm.max-w-lg.min-w-sm.min-h-14.w-full.border.rounded-md.p-2.bg-gray-100.border-1.border-cadetblue.mt-4.mb-4').clear();
    cy.get('.bg-fern').click();
    cy.on("window:alert", (str) => {
      expect(str).to.equal("Please Fill all fields");
       
      });
  });

  it("3. Check startdate cannot be empty", () => {
    cy.get("button").contains("CAMPGROUND").click();

    cy.get(':nth-child(2) > .bg-white > .justify-between > .flex > :nth-child(1)').click();
    cy.wait(3000);
    cy.get('input[id="startdate"]').clear();
    cy.get('.bg-fern').click();
    
    cy.on("window:alert", (str) => {
      expect(str).to.equal("Please Fill all fields");
       
      });
  });

  it("4. Check enddate can be empty", () => {
    cy.get("button").contains("CAMPGROUND").click();

    cy.get(':nth-child(2) > .bg-white > .justify-between > .flex > :nth-child(1)').click();
    cy.wait(1000);
    cy.get('input[id="enddate"]').clear();
    cy.get('.bg-fern').click();
    
    cy.on("window:alert", (str) => {
      expect(str).to.equal("Please Fill all fields");
       
      });
    });

  it("5. Check all fields are field with correct type", () => {
    cy.get("button").contains("CAMPGROUND").click();

    cy.get(':nth-child(2) > .bg-white > .justify-between > .flex > :nth-child(1)').click();
    cy.wait(1000);
    cy.get('input[id="startdate"]').type("2024-05-21");
    cy.get('input[id="enddate"]').type("2024-05-30");
    cy.get('.highlight').type("SALE 20%");
    cy.get('.mb-4').type("campground ลดราคาตั้งแต่วันนี้…");
    cy.get('.bg-fern').click();
  
    cy.on("window:alert", (str) => {
      expect(str).to.equal("Successfully update announcement");
       
      });
  });

  it("6. Check startdate cannot be a day after enddate", () => {
    cy.get("button").contains("CAMPGROUND").click();

    cy.get(':nth-child(2) > .bg-white > .justify-between > .flex > :nth-child(1)').click();
    cy.wait(1000);
    cy.get('input[id="startdate"]').type("2024-05-30");
    cy.get('input[id="startdate"]').type("2024-05-21");
    cy.get('.bg-fern').click();
    
    cy.on("window:alert", (str) => {
      expect(str).to.equal("startDate must be a day before the day announcement created");
       
      });
  });

  it("7. Check startDate cannot be a day before the date that admin create announcement", () => {
    cy.get("button").contains("CAMPGROUND").click();

    cy.get(':nth-child(2) > .bg-white > .justify-between > .flex > :nth-child(1)').click();
    cy.wait(1000);
    cy.get('input[id="startdate"]').type("2024-05-30");
    cy.get('input[id="startdate"]').type("2024-05-21");
    cy.get('.bg-fern').click();
    
    cy.on("window:alert", (str) => {
      expect(str).to.equal("startDate must before endDate");
       
      });
  });

  });
