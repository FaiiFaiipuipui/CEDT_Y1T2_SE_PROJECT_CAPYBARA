const express = require("express");
const { deleteAnnouncement } = require("../controllers/announcements");

const router = express.Router({ mergeParams: true });
const { protect, authorize } = require("../middleware/auth");

router.route("/:id").delete(protect, authorize("admin"), deleteAnnouncement);

module.exports = router;
