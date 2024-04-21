import mongoose from "mongoose";

const CampgroundSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please add a name"],
    unique: true,
    trim: true,
    maxlength: [50, "Name can not be more than 50 characters"],
  },

  coordinate: {
    type: String,
    required: [true, "Please add a cooradinate"],
  },

  province: {
    type: String,
    required: [true, "Please add a province"],
  },

  postalcode: {
    type: String,
    required: [true, "Please add a postal code"],
  },

  telephone: {
    type: String,
    required: [true, "Please add a telephone number"],
  },

  region: {
    type: String,
    required: [true, "Please add a region"],
  },

  picture: {
    type: String,
  },
});

const Campground =
  mongoose.models.Campground || mongoose.model("Campground", CampgroundSchema);
export default Campground;
