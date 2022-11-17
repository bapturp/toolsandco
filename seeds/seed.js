require("dotenv").config();
require("../db/index");
const Tool = require("../models/Tool.model");
const tools = require("./tools.json");
const Tooltype = require("../models/Tooltype.model");
const tooltypes = require("./tooltypes.json");
const Usecase = require("../models/Usecase.model");
const usecases = require("./usecases.json");
const User = require("../models/User.model");
const users = require("./users.json");
const Reservation = require("../models/Reservation.model");
const reservations = require("./reservations.json");
const mongoose = require("mongoose");

async function tooltypeSeed() {
  await Tooltype.deleteMany();
  await Tooltype.create(tooltypes);
}

async function usecaseSeed() {
  await Usecase.deleteMany();
  await Usecase.create(usecases);
}

const userSeed = async () => {
  await User.deleteMany();
  await User.create(users);
};

async function toolSeed() {
  await tooltypeSeed();
  await usecaseSeed();

  await Tool.deleteMany();

  for (const tool of tools) {
    const type = await Tooltype.findOne({ name: tool.tool_type });
    tool.tool_type = type._id;
    const usecases = await Usecase.find({ name: { $in: tool.use_case } });
    const usecasesId = usecases.map((usecase) => {
      return usecase._id;
    });
    tool.use_case = usecasesId;
    await Tool.create(tool);
  }
}

const reservationSeed = async () => {
  await userSeed();
  await toolSeed();
  await Reservation.deleteMany();

  const users = await User.find();
  const tools = await Tool.find().populate();

  for (let i = 0; i < reservations.length; i++) {
    await Reservation.create({
      start_date: reservations[i].start_date,
      end_date: reservations[i].end_date,
      tool: tools[i % tools.length],
      user: users[i % users.length],
    });
  }

  mongoose.disconnect();
};

reservationSeed();
