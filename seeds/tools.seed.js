require('../db/index');
const Tool = require('../models/Tool.model');
const tools = require('./tools.json');
const mongoose = require('mongoose');

async function toolSeed() {
  await Tool.deleteMany();
  await Tool.create(tools);
  mongoose.disconnect();
}

toolSeed();
