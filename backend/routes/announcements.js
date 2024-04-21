const express = require("express");
const { 
    getAnnouncements,
    getAnnouncement,
    updateAnnouncement,
} = require("../controllers/announcements");

const router = express.Router({ mergeParams: true});
const { protect, authorize } = require("../middleware/auth");

router.route("/")
    .get(getAnnouncements);
router.route("/:id")
    .get(getAnnouncement)
    .put(protect, authorize("admin"), updateAnnouncement);

module.exports = router;