const { model, Schema } = require("mongoose");

const usecaseSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
});

const Usecase = model("Usecase", usecaseSchema);

module.exports = Usecase;
