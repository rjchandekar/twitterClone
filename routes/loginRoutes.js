const express = require('express');
const app = express();
const router = express.Router();

app.set("view engine", "pug");
app.set("views", "views");

app.use(express.urlencoded({extended: false}));

router.get('/', (req, res, next) => {
    const payLoad = {
        title: "Login"
    }
    res.status(200).render("login", payLoad);
})

module.exports = router;
