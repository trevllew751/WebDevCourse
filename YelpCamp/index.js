const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const mongoose = require("mongoose");
const catchAsync = require("./utilities/catchAsync");
const ExpressError = require("./utilities/ExpressError");
const Review = require("./models/review");
const {campgroundSchema, reviewSchema} = require("./schemas");

mongoose.set("useFindAndModify", false);

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log("Database Connection Open");
    })
    .catch(err => {
        console.log("Oh no, error!");
        console.log(err);
    })

const Campground = require("./models/campground");


app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));

const validateCampground = (req, res, next) => {
    const {error} = campgroundSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(",");
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
}

const validateReview = (req, res, next) => {
    const {error} = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(",");
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
}

app.engine("ejs", ejsMate);
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("home");
})

app.get("/campgrounds", async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render("campgrounds/index", {campgrounds});
})

app.post("/campgrounds", validateCampground, catchAsync(async (req, res) => {
    const camp = await new Campground(req.body.campground);
    camp.save();
    res.redirect(`/campgrounds/${camp.id}`);
}))

app.get("/campgrounds/new", (req, res) => {
    res.render("campgrounds/new")
})

app.get("/campgrounds/:id", catchAsync(async (req, res) => {
    const camp = await Campground.findById(req.params.id).populate("reviews");
    res.render("campgrounds/show", {camp});
}))

app.get("/campgrounds/:id/:edit", catchAsync(async (req, res) => {
    const camp = await Campground.findById(req.params.id);
    res.render("campgrounds/edit", {camp});
}))

app.put("/campgrounds/:id", validateCampground, catchAsync(async (req, res) => {
    const {id} = req.params;
    await Campground.findByIdAndUpdate(id, {...req.body.campground});
    // Above line spreads the campground object in the req.body and updates the current campground
    res.redirect(`/campgrounds/${id}`);
}))

app.delete("/campgrounds/:id", catchAsync(async (req, res) => {
    await Campground.findByIdAndDelete(req.params.id);
    res.redirect("/campgrounds");
}))

app.post("/campgrounds/:id/reviews", validateReview, async (req, res) => {
    const camp = await Campground.findById(req.params.id);
    const review = new Review(req.body.review);
    camp.reviews.push(review);
    await review.save();
    await camp.save();
    res.redirect(`/campgrounds/${camp.id}`)
})

app.delete("/campgrounds/:id/reviews/:reviewId", catchAsync(async (req, res) => {
    const {id, reviewId} = req.params;
    await Campground.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/campgrounds/${id}`)
}))


app.all("*", (req, res, next) => {
    next(new ExpressError("Page not found", 404));
})

app.use((err, req, res, next) => {
    const {statusCode = 500, message = "Something went wrong!"} = err;
    if (!err.message) err.message = "Oh no! Something went wrong!"
    res.status(statusCode).render("error", {err});
})

app.listen(3000, () => {
    console.log("Open on port 3000")
})