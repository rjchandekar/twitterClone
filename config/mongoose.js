const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://admin:O6nWUllQwcBUXHL1@cluster0.wrmsr.mongodb.net/twitter_clone?retryWrites=true&w=majority")
.then(() => {
    console.log('Connected to Database :: MongoDB');
})
.catch((err) => {
    console.log('Error conneting to MongoDB'+ err);
})

const db = mongoose.connection;

module.exports = db;