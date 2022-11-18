// ℹ️ package responsible to make the connection with mongodb
// https://www.npmjs.com/package/mongoose
const mongoose = require('mongoose');

// ℹ️ Sets the MongoDB URI for our app to have access to it.
// If no env has been set, we dynamically set it to whatever the folder name was upon the creation of the app

const MONGO_URI =
    process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/toolsharing';

mongoose
    .connect(MONGO_URI)
    .then((db) => {
        const { host, port, name } = db.connection
        console.log(db.connection)
        console.log(`Connected to MongoDB! on host ${host}, port: ${port}, database name: '${name}'`);
    })
    .catch((err) => {
        console.error('Error connecting to mongo: ', err);
    });
