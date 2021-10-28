const mongoose = require('mongoose');
const key = require('../secrets/keys'); 

mongoose.connect(key.mongoURI)
.then(() => {
    console.log('Connected to Database :: MongoDB');
})
.catch((err) => {
    console.log('Error conneting to MongoDB'+ err);
})

const db = mongoose.connection;

module.exports = db;