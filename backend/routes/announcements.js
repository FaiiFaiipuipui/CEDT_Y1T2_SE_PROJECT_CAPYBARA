const express = require("express");
const { 
    getAnnouncements,
    getAnnouncement,
} = require("../controllers/announcements");

const router = express.Router({ mergeParams: true});
const { protect, authorize } = require("../middleware/auth");

router.route("/")
    .get(getAnnouncements);
router.route("/:id")
    .get(getAnnouncement);

module.exports = router;