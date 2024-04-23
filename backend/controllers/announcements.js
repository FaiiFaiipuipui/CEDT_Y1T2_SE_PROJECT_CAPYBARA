const Announcement = require("../model/Announcement");

// @desc    Delete announcement
// @route   DELETE /api/v1/announcement/:id
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
