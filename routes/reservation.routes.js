const express = require("express");
const router = express.Router();
const Tool = require("./../models/Tool.model");
const Reservation = require("./../models/Reservation.model");

router.get("/", async (req, res, next) => {
  res.render("reservation");
});

router.get("/:id", async (req, res, next) => {
  const id = req.params.id;
  const reservedTool = await Tool.findById(id);
  res.render("reservation", { reservedTool });
});

router.post("/:id", async (req, res, next) => {
  const toolId = req.params.id;
  const start = req.body.start_date;
  const end = req.body.end_date;
  const newReservation = await Reservation.create({
    tool: toolId,
    user: "6370b892260a3f1599b8e26d",
    start_date: start,
    end_date: end,
  });
  const date = await Reservation.aggregate([
    { $match: { _id: newReservation._id } },
    {
      $project: {
        dateDifference: { $subtract: ["$end_date", "$start_date"] },
      },
    },
  ]);
  const daysReserved = date[0].dateDifference / 86400000;
  console.log(`Reserved for ${daysReserved} days`);
  res.redirect("/tools");
});

module.exports = router;
