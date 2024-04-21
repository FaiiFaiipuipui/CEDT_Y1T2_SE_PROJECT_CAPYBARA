const Announcement = require("../models/Announcement");

// @desc:    Get all announcements
// @route:   GET /api/v1/announcements
// @access:  Public
exports.getAnnouncements = async (req, res, next) => {
  let query;
  console.log(req);
  
  if (req.params.campgroundId) {
    console.log(req.params.campgroundId);
    query = Announcement.find({
      campground: req.params.campgroundId,
    }).populate({
      path: "campground",
      select: "name",
    });
  }
  else {
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
    console.log("success", announcements.length);
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
    const announcement = await Announcement.create(req.body);

    res.status(201).json({
      success: true,
      data: announcement,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Cannot create Announcement",
    });
  }
};

// @desc:    Update a announcement with an id
// @route:   PUT /api/v1/announcements
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
    res.status(400).json({
      success: false,
      message: "Cannot update Announcement"
    });
  }
};