const express = require('express');
const app = express();
const router = express.Router();

const middleware = require('../middleware');

app.set("view engine", "pug");
app.set("views", "views");

app.use(express.urlencoded({extended: false}));

router.get('/', middleware.requireLogin, (req, res, next) => {
    const payload = {
        title: 'Home'
    }
    res.status(200).render('home', payload);
})

module.exports = router;