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
    tool_type: {
      type: Schema.Types.ObjectId,
      ref: "Tooltype",
      required: true
    }
  },
  use_case: [{
    type: Schema.Types.ObjectId,
    ref: "Usecase",
    required: true
  }],
});

const Tool = model("Tool", toolSchema);

module.exports = Tool;
