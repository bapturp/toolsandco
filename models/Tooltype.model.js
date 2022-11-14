const { model, Schema } = require("mongoose");

const tooltypeSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
});

const Tooltype = model("Tooltype", tooltypeSchema);

module.exports = Tooltype;
