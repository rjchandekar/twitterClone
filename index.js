const express = require('express');
const PORT = 8000;
const app = express();
const path = require('path');
const db = require('./config/mongoose');
const session = require('express-session');
const key = require('./secrets/keys');

// Body Parser
app.use(express.urlencoded({extended: false}));

//setting up views
app.set("view engine", "pug");
app.set("views", "views");

// setting up static files path
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    name: "twitterClone",
    secret: key.sessionSecret,
    saveUninitialized: false,
    resave: false,

}))

// Routes
const loginRoute = require('./routes/loginRoutes');
const registerRoute = require('./routes/registerRoutes');
const homeRoute = require('./routes/homeRoutes')

app.use('/login', loginRoute);
app.use('/register', registerRoute);
app.use('/', homeRoute);

app.listen(PORT, function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`Server is running on port: ${PORT}`);
});