const express = require("express");
const { 
    getAnnouncements,
    getAnnouncement,
    createAnnouncement,
    updateAnnouncement,
} = require("../controllers/announcements");

const router = express.Router({ mergeParams: true});
const { protect, authorize } = require("../middleware/auth");

router.route("/")
    .get(getAnnouncements)
    .post(protect, authorize("admin"), createAnnouncement);
router.route("/:id")
    .get(getAnnouncement)
    .put(protect, authorize("admin"), updateAnnouncement);

module.exports = router;