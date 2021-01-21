const express = require("express");
const app = express();
const path = require("path");
const User = require("./models/user");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const session = require("express-session");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended: true}));
app.use(session({
    secret: "secret!",
    resave: false,
    saveUninitialized: true
}));

const requireLogin = (req, res, next) => {
    if (!req.session.userId) {
        return res.redirect("/login");
    }
    next();
}

mongoose.connect('mongodb://localhost:27017/authDemo', {
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

app.get("/", (req, res) => {
    res.send("This is the home page!");
})

app.get("/login", (req, res) => {
    res.render("login");
})

app.post("/login", async (req, res) => {
    const {username, password} = (req.body);
    const foundUser = await User.findAndValidate(username, password);
    if (foundUser) {
        req.session.userId = foundUser.id;
        res.redirect("/secret");
    } else {
        res.redirect("/login");
    }
})

app.get("/register", (req, res) => {
    res.render("register")
})

app.post("/logout", (req, res) => {
    req.session.userId = null;
    res.redirect("/login")
})

app.post("/register", async (req, res) => {
    const {username, password} = req.body;
    const user = new User({username, password});
    req.session.userId = user.id;
    await user.save();
    res.redirect("/secret");
})

app.get("/secret", requireLogin, (req, res) => {
    res.render("secret");
})

app.get("/topsecret", requireLogin, (req, res) => {
    res.send("SUH DUDE")
})

app.listen(3000, () => {
    console.log("Open on port 3000");
})