const { model, Schema } = require("mongoose");

const toolSchema = new Schema({
  brand: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  picture_url: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price_per_day: {
    type: Number,
    required: true,
  },
  tool_type: {
    type: String,
    required: true,
    enum: [
      "Drill",
      "Saw",
      "Hammer",
      "Screwdriver",
      "Clamp",
      "Tape measure",
      "Brush",
    ],
  },
  use_case: {
    type: [String],
    required: true,
    enum: ["Woodwork", "Plumbing", "Drilling", "Structural Work", "Painting"],
  },
});

const Tool = model("Tool", toolSchema);

module.exports = Tool;
