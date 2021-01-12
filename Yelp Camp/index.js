const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");

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

app.post("/campgrounds", async (req, res) => {
    const camp = await new Campground(req.body.campground);
    camp.save();
    res.redirect(`/campgrounds/${camp.id}`);
})

app.get("/campgrounds/new", (req, res) => {
    res.render("campgrounds/new")
})

app.get("/campgrounds/:id", async (req, res) => {
    const camp = await Campground.findById(req.params.id);
    res.render("campgrounds/show", {camp});
})

app.get("/campgrounds/:id/:edit", async (req, res) => {
    const camp = await Campground.findById(req.params.id);
    res.render("campgrounds/edit", {camp});
})

app.put("/campgrounds/:id", async (req, res) => {
    const {id} = req.params;
    await Campground.findByIdAndUpdate(id, {...req.body.campground});
    // Above line spreads the campground object in the req.body and updates the current campground
    res.redirect(`/campgrounds/${id}`);
})

app.delete("/campgrounds/:id", async (req, res) => {
    await Campground.findByIdAndDelete(req.params.id);
    res.redirect("/campgrounds");
})

app.listen(3000, () => {
    console.log("Open on port 3000")
})