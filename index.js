const express = require('express');
const PORT = 8000;
const app = express();
const middleware = require('./middleware');
const path = require('path');
const db = require('./config/mongoose');

// Body Parser
app.use(express.urlencoded({extended: false}));

//setting up views
app.set("view engine", "pug");
app.set("views", "views");

// setting up static files path
app.use(express.static(path.join(__dirname, 'public')));

// Routes
const loginRoute = require('./routes/loginRoutes');
const registerRoute = require('./routes/registerRoutes');

app.use('/login', loginRoute);
app.use('/register', registerRoute);

app.get('/', middleware.requireLogin, (req, res, next) => {
    const payload = {
        title: 'Home'
    }
    res.status(200).render('home', payload);
})

app.listen(PORT, function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`Server is running on port: ${PORT}`);
});