if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const mongoose = require("mongoose");
const ExpressError = require("./utilities/ExpressError");
const campgrounds = require("./routes/campgrounds");
const reviews = require("./routes/reviews");
const users = require("./routes/users");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet")
const MongoStore = require('connect-mongo').default;

const dbURL = process.env.DBURL || 'mongodb://localhost:27017/yelp-camp';
mongoose.connect(dbURL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
    .then(() => {
        console.log("Database Connection Open");
    })
    .catch(err => {
        console.log("Oh no, error!");
        console.log(err);
    })

const secret = process.env.SECRET || "secret";

const store = MongoStore.create({
    mongoUrl: dbURL,
    secret,
    touchAfter: 24 * 60 * 60
});

store.on("error", function (e) {
    console.log("SESSION STORE ERROR", e);
})

const sessionConfig = {
    store,
    name: "session",
    secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        // secure: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
};
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(mongoSanitize())
app.use(helmet({contentSecurityPolicy: false}));
app.use(session(sessionConfig));                        //SESSION MUST BE CREATED BEFORE FLASH!!!!!!!!!!!!!!!
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currentUser = req.user;
    next();

})
const scriptSrcUrls = [
    "https://stackpath.bootstrapcdn.com/",
    "https://api.tiles.mapbox.com/",
    "https://api.mapbox.com/",
    "https://kit.fontawesome.com/",
    "https://cdnjs.cloudflare.com/",
    "https://cdn.jsdelivr.net",
];
const styleSrcUrls = [
    "https://kit-free.fontawesome.com/",
    "https://stackpath.bootstrapcdn.com/",
    "https://api.mapbox.com/",
    "https://api.tiles.mapbox.com/",
    "https://fonts.googleapis.com/",
    "https://use.fontawesome.com/",
    "https://cdn.jsdelivr.net"
];
const connectSrcUrls = [
    "https://api.mapbox.com/",
    "https://a.tiles.mapbox.com/",
    "https://b.tiles.mapbox.com/",
    "https://events.mapbox.com/",
];
const fontSrcUrls = [];
app.use(
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: [],
            connectSrc: ["'self'", ...connectSrcUrls],
            scriptSrc: ["'unsafe-inline'", "'self'", ...scriptSrcUrls],
            styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
            workerSrc: ["'self'", "blob:"],
            objectSrc: [],
            imgSrc: [
                "'self'",
                "blob:",
                "data:",
                "https://res.cloudinary.com/dkvet3ce7/", // Cloudinary name
                "https://images.unsplash.com/",
            ],
            fontSrc: ["'self'", ...fontSrcUrls],
        },
    })
);
app.use("/", users);
app.use("/campgrounds", campgrounds);
app.use("/campgrounds/:id/reviews", reviews);
app.use(express.static(path.join(__dirname, "public")));
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.engine("ejs", ejsMate);
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("home");
})

app.all("*", (req, res, next) => {
    next(new ExpressError("Page not found", 404));
})

app.use((err, req, res, next) => {
    const {statusCode = 500, message = "Something went wrong!"} = err;
    if (!err.message) err.message = "Oh no! Something went wrong!"
    res.status(statusCode).render("error", {err});
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("Open on port 3000")
})