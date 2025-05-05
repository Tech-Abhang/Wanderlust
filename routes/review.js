const express = require("express")
const router = express.Router({mergeParams: true})
const wrapAsync = require("../utils/wrapAsync.js")
const ExpressError = require("../utils/expressError.js")
const Review = require("../models/review.js")
const {reviewSchema} = require("../schema.js")
const Listing = require("../models/listing.js")

const validateReview = (req,res,next)=>{
    let {error}= reviewSchema.validate(req.body)
    if(error){
        let errMsg = error.details.map((el) => el.message).join(",")
        throw new ExpressError(400,errMsg);
    }else{
        next()
    }
}

//reviews
router.post("/",validateReview,wrapAsync( async(req,res)=>{
    let listing = await Listing.findById(req.params.id)
    let newReview = new Review(req.body.review)

    listing.reviews.push(newReview)
    await newReview.save()
    await listing.save()
    req.flash("success", "Review added successfully!")
    res.redirect(`/listings/${listing.id}`)
}))

module.exports = router