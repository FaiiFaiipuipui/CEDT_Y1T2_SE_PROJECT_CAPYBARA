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
    // console.log(token);
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
        const announcement = await resAnnouncement._body.data;
        announcementId = announcement._id;
        // console.log(announcementId);

        const resDelete = await request
            .delete(`/api/v1/announcements/${announcementId}`)
            .set('Accept', 'application/json')
            .auth(token, { type: 'bearer' })
            .expect(200);

        // console.log(resDelete);
    });
    it('Invalid Announcement ID', async () => {

        const resDelete = await request
            .delete(`/api/v1/announcements/452f666a8f2b694e6011174b`)
            .set('Accept', 'application/json')
            .auth(token, { type: 'bearer' })
            .expect(404);

    });
},10000);

