const AnnouncementController = require('../controllers/announcements');
const Announcement = require("../models/Announcement");
let request = require('supertest');
const mongoose = require('mongoose')
const express = require('express');


require("dotenv").config();

request = request('http://localhost:5000');

let token;
let announcementId;

beforeEach(async () => {
    const server = express();
    await server.listen(process.env.PORT);
    // await mongoose.connect(process.env.MONGO_URI);
    const userLogin = await request
        .post("/api/v1/auth/login")
        .set('Accept', 'application/json')
        .send({
            email: "admin@gmail.com",
            password: "admin1234"
        })
        .expect(200)
    token = userLogin.body.token;
    console.log(token);
});
describe('Check delete an announcement', () => {
    it('Valid Announcement ID', async () => {

        const resAnnouncement = await request
            .post("/api/v1/announcements")
            .set('Accept', 'application/json')
            .send({
                title: "Test Announcement",
                content: "Test Description",
                startDate: "2024-05-16T18:03:02.000Z",
                endDate: "2025-04-14T18:03:02.000Z",
                campground: "66191db24f65e3b7f5ac61b0",
                author: "Capybara"
            })
            .auth(token, { type: 'bearer' })
            .expect(201);

        // announcementId = resAnnouncement.body._id;
        console.log(resAnnouncement.body._id);

        // const resDelete = await request
        //     .delete(`/api/v1/announcements/${announcementId}`)
        //     .set('Accept', 'application/json')
        //     .auth(token, { type: 'bearer' })
        //     .expect(200);

        // console.log(resDelete);
    });
});
afterAll(done => {
    server.close(done);
});

