const express = require("express");
const router = express.Router();
const Tool = require("./../models/Tool.model");
const Tooltype = require("./../models/Tooltype.model");
const Usecase = require("./../models/Usecase.model");
const Reservation = require("./../models/Reservation.model");

// Display all tools if no query, else display corresponding search results
router.get("/", async (req, res, next) => {
  try {
    const queriedTools = {};
    const excludedTools = [];
    const query = req.query;
    if (query.tool_type) {
      const toolTypeId = await Tooltype.findOne({ name: query.tool_type });
      queriedTools.tool_type = toolTypeId;
    }
    if (query.use_case) {
      const useCaseId = await Usecase.findOne({ name: query.use_case });
      queriedTools.use_case = useCaseId;
    }
    if (query.start_date) {
      const startDate = new Date(query.start_date);
      const endDate = new Date(query.end_date);
      req.session.date = {
        start: startDate,
        end: endDate,
      };
      console.log(req.session.date);
      // Exclure les outils avec une réservation existante sur tout ou partie de la période sélectionnée
      const allResas = await Reservation.find({
        $or: [
          {
            $and: [
              { start_date: { $lte: startDate } },
              { end_date: { $gte: endDate } },
            ],
          }, // reservation over all selected period
          {
            $and: [
              { start_date: { $lte: startDate } },
              { end_date: { $gte: startDate } },
            ],
          }, // Start date of existing resa during selected period
          {
            $and: [
              { start_date: { $lte: endDate } },
              { end_date: { $gte: endDate } },
            ],
          }, // End date of existing resa during selected period
        ],
      }).populate("tool");
      allResas.forEach((resa) => {
        excludedTools.push(resa.tool._id);
      });
    }
    let toolsList;
    if (excludedTools.length) {
      toolsList = await Tool.find({
        $and: [queriedTools, { _id: { $nin: excludedTools } }],
      }).populate(["tool_type", "use_case"]);
    } else {
      toolsList = await Tool.find({ $and: [queriedTools] }).populate([
        "tool_type",
        "use_case",
      ]);
    }

    const tooltypesList = await Tooltype.find();
    const usecasesList = await Usecase.find();

    res.render("search", { toolsList, tooltypesList, usecasesList });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
