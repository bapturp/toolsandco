require("../db/index");
const Tool = require("../models/Tool.model");
const tools = require("./../tools.json");

async function toolSeed() {
  await Tool.deleteMany();
  await Tool.create(tools);
}

toolSeed();
