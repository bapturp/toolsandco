const { Schema, model } = require("mongoose");

const reservationSchema = new Schema({
  tool: {
    type: Schema.Types.ObjectId,
    ref: "Tool",
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  start_date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  end_date: {
    type: Date,
    required: true,
  },
});

const Reservation = model("Reservation", reservationSchema);

module.exports = Reservation;
