const express = require('express');
const app = express();
const router = express.Router();

app.set("view engine", "pug");
app.set("views", "views");

app.use(express.urlencoded({extended: false}));

router.get('/', (req, res, next) => {
    const payLoad = {
        title: 'Register'
    }
    res.status(200).render("register", payLoad);
})

router.post('/', (req, res, next) => {

    console.log(req.body);
    
    // Checking for empty fields in server side
    // const firstName = req.body.firstName.trim();
    // const lastName = req.body.lastName.trim();
    // const userName = req.body.userName.trim();
    // const email = req.body.email.trim();
    // const password = req.body.password;

    var payLoad = req.body;
    payLoad.title = "Register";

    if(/*firstName && lastName && userName && email && password*/ 1) {

    }else{
        payLoad.errorMessage = "Make sure each field has a valid value.";
        res.status(200).render("register", payLoad);
    }
})

module.exports = router;