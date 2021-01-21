const express = require("express");
const router = express.Router({mergeParams: true});
const {reviewSchema} = require("../schemas");
const Campground = require("../models/campground");
const Review = require("../models/review");
const catchAsync = require("../utilities/catchAsync");
const ExpressError = require("../utilities/ExpressError");

const validateReview = (req, res, next) => {
    const {error} = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(",");
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
}

router.post("/", validateReview, async (req, res) => {
    const camp = await Campground.findById(req.params.id);
    const review = new Review(req.body.review);
    camp.reviews.push(review);
    await review.save();
    await camp.save();
    req.flash("success", "Created a new review!");
    res.redirect(`/campgrounds/${camp.id}`)
})

router.delete("/:reviewId", catchAsync(async (req, res) => {
    const {id, reviewId} = req.params;
    await Campground.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Deleted review!");
    res.redirect(`/campgrounds/${id}`)
}))

module.exports = router;