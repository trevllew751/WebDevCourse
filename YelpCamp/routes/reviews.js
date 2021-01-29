const express = require("express");
const router = express.Router({mergeParams: true});
const Campground = require("../models/campground");
const Review = require("../models/review");
const catchAsync = require("../utilities/catchAsync");
const {isLoggedIn, validateReview, isReviewAuthor} = require("../middleware")


router.post("/", isLoggedIn, validateReview, async (req, res) => {
    const camp = await Campground.findById(req.params.id);
    const review = new Review(req.body.review);
    review.author = req.user.id;
    camp.reviews.push(review);
    await review.save();
    await camp.save();
    req.flash("success", "Created a new review!");
    res.redirect(`/campgrounds/${camp.id}`)
})

router.delete("/:reviewId", isLoggedIn, isReviewAuthor, catchAsync(async (req, res) => {
    const {id, reviewId} = req.params;
    await Campground.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Deleted review!");
    res.redirect(`/campgrounds/${id}`)
}))

module.exports = router;