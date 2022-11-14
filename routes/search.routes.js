const express = require("express");
const router = express.Router();
const Tool = require("./../models/Tool.model");
const Tooltype = require("./../models/Tooltype.model");
const Usecase = require("./../models/Usecase.model");

router.get("/", async (req, res, next) => {
    try {
        const toolsList = await Tool.find();
        const tooltypesList = await Tooltype.find()
        const usecasesList = await Usecase.find()
        res.render("search", { toolsList, tooltypesList, usecasesList })
    } catch (error) {
        console.error(error)
    }
})

router.get("/:tool_type&:use_case", async (req, res, next) => {
    try {
        const toolType = req.params.tool_type
        const useCase = req.params.use_case
        console.log(toolType)
    } catch (error) {
        next(error)
    }
})

module.exports = router;