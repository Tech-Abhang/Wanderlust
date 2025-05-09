//user routes
const express = require("express")
const User = require("../models/user")
const router = express.Router()
const passport = require("passport")

router.get("/signup", (req, res) => {
    res.render("users/signup.ejs")
})

router.post("/signup",async (req,res)=>{
    email = req.body.email
    password = req.body.password
    username = req.body.username
    let newUser = {
        email:email,
        username:username
    }

    let registerUser = await User.register(newUser,password)
    console.log(registerUser)
    if(registerUser){
        req.flash("success","Welcome to Wanderlust!")
        res.redirect("/listings")
    }
})

router.get("/login", (req, res) => {
    res.render("users/login.ejs")
})

router.post("/login", 
    passport.authenticate('local', { 
        failureRedirect: '/login',
        failureFlash: true
    }),
    async (req, res) => {
        req.flash("success", "Welcome back to Wanderlust!")
        res.redirect("/listings")
    }
)

router.get("/logout", (req, res) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        req.flash("success", "Goodbye!")
        res.redirect("/listings")
    })
})

module.exports = router