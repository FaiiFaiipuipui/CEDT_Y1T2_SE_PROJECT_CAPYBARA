const Announcement = require("../models/Announcement");
const Campground = require("../models/Campground");

// @desc:    Get all announcements
// @route:   GET /api/v1/announcements
// @access:  Public
exports.getAnnouncements = async (req, res, next) => {
  let query;

  if (req.params.campgroundId) {
    query = Announcement.find({
      campground: req.params.campgroundId,
    }).populate({
      path: "campground",
      select: "name",
    });
  } else {
    query = Announcement.find().populate({
      path: "campground",
      select: "name",
    });
  }

  query = query.sort("startDate");

  try {
    const announcements = await query;

    res.status(200).json({
      success: true,
      count: announcements.length,
      data: announcements,
    });
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({
      success: false,
      message: "Cannot find Announcements",
    });
  }
};

// @desc:    Get a single announcement with an id
// @route:   GET /api/v1/announcements/:id
// @access:  Public
exports.getAnnouncement = async (req, res, next) => {
  try {
    const announcement = await Announcement.findById(req.params.id).populate({
      path: "campground",
      select: "name",
    });

    if (!announcement) {
      return res.status(400).json({ success: false });
    }

    res.status(200).json({
      success: true,
      data: announcement,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Cannot find Announcement",
    });
  }
};

// @desc:    Create a new announcement
// @route:   POST /api/v1/announcements
// @access:  Private
exports.createAnnouncement = async (req, res, next) => {
  try {
    if(req.body.endDate !== ""){
      if (req.body.endDate < req.body.startDate) {
        return res.status(400).json({ success: false, message: "End date's time must be after start date's time" });
      }
    }

    // Add more input validation here...

    const announcement = await Announcement.create(req.body);
    res.status(201).json({
      success: true,
      data: announcement,
    });
  } catch (err) {
    console.error(err); // Log the error
    res.status(500).json({
      success: false,
      message: "Cannot create Announcement",
    });
  }
};

// @desc:    Update a announcement with an id
// @route:   PUT /api/v1/announcements/:id
// @access:  Private
exports.updateAnnouncement = async (req, res, next) => {
  try {
    const announcement = await Announcement.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!announcement) {
      return res.status(400).json({ success: false });
    }

    res.status(200).json({
      success: true,
      data: announcement,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Cannot update Announcement",
    });
  }
};

// @desc    Delete announcement
// @route   DELETE /api/v1/announcements/:id
// @access  Private
exports.deleteAnnouncement = async (req, res, next) => {
  try {
    const announcement = await Announcement.findById(req.params.id);

    if (!announcement) {
      return res.status(404).json({
        success: false,
        message: `No announcement with the id of ${req.params.id}`,
      });
    }

    await announcement.deleteOne();

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (err) {
    console.log(err.stack);
    return res
      .status(500)
      .json({ success: false, message: "Cannot delete Announcement" });
  }
};
