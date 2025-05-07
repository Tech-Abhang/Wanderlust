const express = require("express")
const User = require("../models/user")
const router = express.Router()

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
module.exports = router