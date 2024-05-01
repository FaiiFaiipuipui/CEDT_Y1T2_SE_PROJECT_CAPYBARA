let request = require("supertest");
const express = require("express");
const Campground = require("../models/Campground");
require("dotenv").config();

request = request("http://localhost:5000");

beforeAll(async () => {
  const server = express();
  await server.listen(process.env.PORT);
});

describe("announcement creation (user)", () => {
  let userJWT;

  it("should login as user puifaii301@gmail.com", async () => {
    const res = await request
      .post("/api/v1/auth/login")
      .send({
        email: "puifaii301@gmail.com",
        password: "12345678",
      })
      .expect(200)
      .then((response) => {
        console.log(response._body);
        userJWT = response._body.token;
      });
  });

  it("TC1 should FAIL to create announcement", async () => {
    const res = await request
      .post("/api/v1/announcements")
      .set("Accept", "application/json")
      .auth(userJWT, { type: "bearer" })
      .expect(401);
  });
});

describe("announcement creation (admin)", () => {
  let adminJWT;
  it("should login as admin admin@gmail.com", async () => {
    const res = await request
      .post("/api/v1/auth/login")
      .send({
        email: "admin@gmail.com",
        password: "admin1234",
      })
      .expect(200)
      .then((response) => {
        console.log(response._body.token);
        adminJWT = response._body.token;
      });
  });

  it("TC2 should FAIL to create announcement", async () => {
    let announcementID;

    const res = await request
      .post("/api/v1/announcements")
      .set("Accept", "application/json")
      .send({
        title: "",
        content: "เตือนภัย ช่วงนี้อาจมีพายุฤดูร้อน…",
        startDate: "05/01/2026",
        endDate: "06/01/2026",
        campground: "66191db24f65e3b7f5ac619a",
        author: "som",
      })
      .auth(adminJWT, { type: "bearer" })
      .expect(500);
  });

  it("TC3 should FAIL to create announcement", async () => {
    let announcementID;

    const res = await request
      .post("/api/v1/announcements")
      .set("Accept", "application/json")
      .send({
        title: "ข่าวด่วน",
        content: "",
        startDate: "05/01/2026",
        endDate: "06/01/2026",
        campground: "66191db24f65e3b7f5ac619a",
        author: "som",
      })
      .auth(adminJWT, { type: "bearer" })
      .expect(500);
  });

  it("TC4 should FAIL to create announcement", async () => {
    let announcementID;

    const res = await request
      .post("/api/v1/announcements")
      .set("Accept", "application/json")
      .send({
        title: "ข่าวด่วน",
        content: "เตือนภัย ช่วงนี้อาจมีพายุฤดูร้อน…",
        startDate: "",
        endDate: "06/01/2026",
        campground: "66191db24f65e3b7f5ac619a",
        author: "som",
      })
      .auth(adminJWT, { type: "bearer" })
      .expect(500);
  });

  it("TC5 should SUCCEED in creating announcement", async () => {
    let announcementID;

    const res = await request
      .post("/api/v1/announcements")
      .set("Accept", "application/json")
      .send({
        title: "ข่าวด่วน",
        content: "เตือนภัย ช่วงนี้อาจมีพายุฤดูร้อน…",
        startDate: "05/01/2026",
        endDate: "",
        campground: "66191db24f65e3b7f5ac619a",
        author: "som",
      })
      .auth(adminJWT, { type: "bearer" })
      .expect(201)
      .then((response) => {
        announcementID = response._body.data._id;
      });

    const deletion = await request
      .delete(`/api/v1/announcements/${announcementID}`)
      .set("Accept", "application/json")
      .auth(adminJWT, { type: "bearer" })
      .expect(200);
  });

  it("TC6 should FAIL to create announcement", async () => {
    let announcementID;

    const res = await request
      .post("/api/v1/announcements")
      .set("Accept", "application/json")
      .send({
        title: "ข่าวด่วน",
        content: "เตือนภัย ช่วงนี้อาจมีพายุฤดูร้อน…",
        startDate: "05/01/2026",
        endDate: "06/01/2026",
        campground: "",
        author: "som",
      })
      .auth(adminJWT, { type: "bearer" })
      .expect(500);
  });

  it("TC7 should FAIL to create announcement", async () => {
    let announcementID;

    const res = await request
      .post("/api/v1/announcements")
      .set("Accept", "application/json")
      .send({
        title: "ข่าวด่วน",
        content: "เตือนภัย ช่วงนี้อาจมีพายุฤดูร้อน…",
        startDate: "05/01/2026",
        endDate: "06/01/2026",
        campground: "66191db24f65e3b7f5ac619a",
        author: "",
      })
      .auth(adminJWT, { type: "bearer" })
      .expect(500);
  });

  it("TC8 should FAIL to create announcement", async () => {
    //GOT 201
    let announcementID;

    const res = await request
      .post("/api/v1/announcements")
      .set("Accept", "application/json")
      .send({
        title: "ข่าวด่วน",
        content: "เตือนภัย ช่วงนี้อาจมีพายุฤดูร้อน…",
        startDate: "01/01/2024",
        endDate: "06/01/2026",
        campground: "66191db24f65e3b7f5ac619a",
        author: "Som",
      })
      .auth(adminJWT, { type: "bearer" })
      .expect(400);
  });

  it("TC9 should FAIL to create announcement", async () => {
    let announcementID;

    const res = await request
      .post("/api/v1/announcements")
      .set("Accept", "application/json")
      .send({
        title: "ข่าวด่วน",
        content: "เตือนภัย ช่วงนี้อาจมีพายุฤดูร้อน…",
        startDate: "07/01/2026",
        endDate: "06/01/2026",
        campground: "66191db24f65e3b7f5ac619a",
        author: "Som",
      })
      .auth(adminJWT, { type: "bearer" })
      .expect(400);
  });

  it("TC10 should SUCCEED in creating announcement", async () => {
    let announcementID;

    const res = await request
      .post("/api/v1/announcements")
      .set("Accept", "application/json")
      .send({
        title: "ข่าวด่วน",
        content: "เตือนภัย ช่วงนี้อาจมีพายุฤดูร้อน…",
        startDate: "05/01/2026",
        endDate: "06/01/2026",
        campground: "66191db24f65e3b7f5ac619a",
        author: "Som",
      })
      .auth(adminJWT, { type: "bearer" })
      .expect(201)
      .then((response) => {
        announcementID = response._body.data._id;
      });

    const deletion = await request
      .delete(`/api/v1/announcements/${announcementID}`)
      .set("Accept", "application/json")
      .auth(adminJWT, { type: "bearer" })
      .expect(200);
  });

  it("TC11 should FAIL to create announcement", async () => {
    let announcementID;

    const res = await request
      .post("/api/v1/announcements")
      .set("Accept", "application/json")
      .send({
        title: "TC11",
        content: "TC11",
        startDate: "14/14/2028",
        endDate: "",
        campground: "66191db24f65e3b7f5ac619a",
        author: "Daeng",
      })
      .auth(adminJWT, { type: "bearer" })
      .expect(500);
  });

  it("TC12 should FAIL to create announcement", async () => {
    let announcementID;

    const res = await request
      .post("/api/v1/announcements")
      .set("Accept", "application/json")
      .send({
        title: "TC12",
        content: "TC12",
        startDate: "14/1/2025",
        endDate: "14/14/2025",
        campground: "66191db24f65e3b7f5ac619a",
        author: "Daeng",
      })
      .auth(adminJWT, { type: "bearer" })
      .expect(500);
  });

  it("TC13 should FAIL to create announcement", async () => {
    let announcementID;

    const res = await request
      .post("/api/v1/announcements")
      .set("Accept", "application/json")
      .send({
        title: "TC12",
        content: "TC12",
        startDate: "14/1/2025",
        endDate: "14/2/2025",
        campground: "Yellow",
        author: "Daeng",
      })
      .auth(adminJWT, { type: "bearer" })
      .expect(500);
  });

  it("TC14 should FAIL to create announcement", async () => {
    let announcementID;

    const res = await request
      .post("/api/v1/announcements")
      .set("Accept", "application/json")
      .send({
        title: "TC12",
        content: "TC12",
        startDate: "14/1/2025",
        endDate: "14/2/2025",
        campground: "6630ab8806646b153fcf238f",
        author: "Daeng",
      })
      .auth(adminJWT, { type: "bearer" })
      .expect(500);
  });
});
