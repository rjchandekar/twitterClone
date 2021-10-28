const express = require('express');
const app = express();
const router = express.Router();
const bcrypt = require('bcrypt');

const User = require('../models/user')

app.set("view engine", "pug");
app.set("views", "views");

app.use(express.urlencoded({extended: false}));

router.get('/', (req, res, next) => {
    const payLoad = {
        title: 'Register'
    }
    res.status(200).render("register", payLoad);
})

router.post('/', async (req, res, next) => {
    
    // Checking for empty fields in server side
    const firstName = req.body.firstName.trim();
    const lastName = req.body.lastName.trim();
    const userName = req.body.userName.trim();
    const email = req.body.email.trim();
    const password = req.body.password;

    const payLoad = req.body;
    payLoad.title = "Register";

    if(firstName && lastName && userName && email && password) {
        const user = await User.findOne({
            $or: [
                {userName: userName},
                {email: email}
            ]
        })
        .catch((err) => {
            console.log(err);
            payLoad.errorMessage = "Something went wrong.";
            res.status(200).render("register", payLoad);
        });

        if(user==null){
            // no user found
            req.body.password = await bcrypt.hash(password, 10);
            User.create(req.body)
            .then((user) => {
                req.session.user = user;
                return res.redirect('/');
            })
        }else{
            //found a user having same username/email

            if(email == user.email){
                payLoad.errorMessage = "Email already in use.";
            }else{
                payLoad.errorMessage = "Username already in use.";
            }
            res.status(200).render("register", payLoad);
        }


    }else{
        payLoad.errorMessage = "Make sure each field has a valid value.";
        res.status(200).render("register", payLoad);
    }
})

module.exports = router;