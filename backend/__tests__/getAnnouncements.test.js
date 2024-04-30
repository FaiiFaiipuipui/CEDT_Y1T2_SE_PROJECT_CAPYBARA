let request = require("supertest");
const express = require("express");
const supertest = require("supertest");

require("dotenv").config();

request = request("http://localhost:5000");

//TC1
describe("Invalid Announcement Id", () => {
  it("should sent a 500", async () => {
    const invalidAid = "abcdefg";
    const response = await request.get(`/api/v1/announcements/${invalidAid}`);
    expect(response.status).toBe(500);
  });
});

//TC2
describe("Invalid Campground Id", () => {
  it("should sent a 500", async () => {
    const invalidCid = "abcdefg";
    const response = await request.get(`/api/v1/campgrounds/${invalidCid}/announcements`);
    expect(response.status).toBe(500);
  });
});

//TC3
describe("Valid Announcement Id", () => {
  it("should sent a 200", async () => {
    const validAid = "66308e88baa6a6c7ec646c48";
    const { body, statusCode } = await request.get(`/api/v1/announcements/${validAid}`);
    expect(statusCode).toBe(200);
    expect(body.success).toBe(true);
    expect(body).toHaveProperty("data");
  });
});

//TC4
describe("Valid Campground Id", () => {
    it("should sent a 200", async() => {
        const validCid = '66191db24f65e3b7f5ac61aa';
        const { body, statusCode } = await request.get(`/api/v1/campgrounds/${validCid}/announcements`);
        expect(statusCode).toBe(200);
        expect(body.success).toBe(true);
        expect(body).toHaveProperty("data");
    })
})

//TC5
describe("has valid campground Id but has invalid announcement Id", () => {
    it("should sent a 500", async() => {
        const validCid = '66191db24f65e3b7f5ac61aa';
        const invalidAid = 'abcdefg';
        const response = await request.get(`/api/v1/campgrounds/${validCid}/announcements/${invalidAid}`);
        expect(response.status).toBe(500);
    })
})

//TC6
describe("Get all Announcement", () => {
    it("should send all announcement", async () => {
        const { body, statusCode } = await request.get('/api/v1/announcements');
        expect(statusCode).toBe(200);
        expect(body.success).toBe(true);
        expect(body).toHaveProperty("data");
    });
});
