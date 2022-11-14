const express = require("express");
const router = express.Router();
const Tool = require("./../models/Tool.model");
const Tooltype = require("./../models/Tooltype.model");
const Usecase = require("./../models/Usecase.model");

// Display all tools if no query, else display corresponding search results
router.get("/", async (req, res, next) => {
    try {
        const queriedTools = {}
        const query = req.query
        if (query.tool_type) {
            const toolTypeId = await Tooltype.findOne({ name: query.tool_type })
            queriedTools.tool_type = toolTypeId
        }
        if (query.use_case) {
            const useCaseId = await Usecase.findOne({ name: query.use_case })
            queriedTools.use_case = useCaseId
        }
        if (query.start_date) {
            const startDate = query.start_date
            const endDate = query.end_date
        }
        const toolsList = await Tool.find({ $and: [queriedTools] }).populate(['tool_type', 'use_case']);
        const tooltypesList = await Tooltype.find()
        const usecasesList = await Usecase.find()

        res.render("search", { toolsList, tooltypesList, usecasesList })
    } catch (error) {
        next(error)
    }
})

module.exports = router;