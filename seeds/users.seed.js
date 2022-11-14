require('../db/index');
const User = require('../models/User.model');
const data = require('./users.json');
const mongoose = require('mongoose')

const userSeed = async () => {
    await User.deleteMany();
    await User.create(data);
    mongoose.disconnect()
}

userSeed();
