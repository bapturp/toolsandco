require('../db/index');
const Tool = require('../models/Tool.model');
const tools = require('./tools.json');
const Tooltype = require('../models/Tooltype.model');
const tooltypes = require('./tooltypes.json');
const Usecase = require('../models/Usecase.model');
const usecases = require('./usecases.json');
const mongoose = require('mongoose');

async function toolSeed() {
  await tooltypeSeed()
  await usecaseSeed()

  await Tool.deleteMany();

  for (const tool of tools) {
    const type = await Tooltype.findOne({ name: tool.tool_type })
    tool.tool_type = type._id
    const usecases = await Usecase.find({ name: { $in: tool.use_case } })
    const usecasesId = usecases.map((usecase) => {
      return usecase._id
    })
    tool.use_case = usecasesId
    await Tool.create(tool)

  }
}

async function tooltypeSeed() {
  await Tooltype.deleteMany();
  await Tooltype.create(tooltypes);
}

async function usecaseSeed() {
  await Usecase.deleteMany();
  await Usecase.create(usecases);

  mongoose.disconnect();
}

toolSeed();
