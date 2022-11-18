const express = require("express");
const router = express.Router();
const Tool = require("./../models/Tool.model");
const Tooltype = require("./../models/Tooltype.model");
const Usecase = require("./../models/Usecase.model");
const Reservation = require("./../models/Reservation.model");
const getActualUrl = require("./../middlewares/getActualUrl");

// Display all tools if no query, else display corresponding search results
router.get("/", getActualUrl, async (req, res, next) => {
  try {
    const queriedTools = {};
    const excludedTools = [];
    const query = req.query;
    const search = {
      tool_type: req.query.tool_type,
      use_case: req.query.use_case,
      start_date: req.query.start_date,
      end_date: req.query.end_date,
    };
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
      // Stock the dates inside the session to use them in the checkout
      req.session.date = {
        start: startDate,
        end: endDate,
      };

      res.locals.date = req.session.date;
      // Exclure les outils avec une réservation existante sur tout ou partie de la période sélectionnée
      const allResas = await Reservation.find({
        $or: [
          {
            $and: [
              { start_date: { $lt: startDate } },
              { end_date: { $gt: endDate } },
            ],
          }, // reservation over all selected period
          {
            $and: [
              { start_date: { $lt: startDate } },
              { end_date: { $gt: startDate } },
            ],
          }, // Start date of existing resa during selected period
          {
            $and: [
              { start_date: { $lt: endDate } },
              { end_date: { $gt: endDate } },
            ],
          }, // End date of existing resa during selected period
        ],
      }).populate("tool");
      allResas.forEach((resa) => {
        if (resa.tool) {
          excludedTools.push(resa.tool._id);
        }
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

    const tooltypesList = await Tooltype.find({
      name: { $nin: [search.tool_type] },
    });
    const usecasesList = await Usecase.find({
      name: { $nin: [search.use_case] },
    });

    res.render("search", { toolsList, tooltypesList, usecasesList, search });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
