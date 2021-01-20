const express = require("express");
const app = express();
const sessionOptions = {secret: "secret", resave: false, saveUninitialized: true}
const session = require("express-session");

app.use(session(sessionOptions));

app.get("/viewcount", (req, res) => {
    if (req.session.count) {
        req.session.count++;
    } else {
        req.session.count = 1;
    }
    res.send(`You have viewed this page ${req.session.count} times`);
})

app.get("/register", (req, res) => {
    const {username = "anonymous"} = req.query;
    req.session.username = username;
    res.redirect("/greet")
})

app.get("/greet", (req, res) => {
    const {username} = req.session;
    res.send(`Welcome back, ${username}`)
})

app.listen(3000, () => {
    console.log("Open on port 3000");
})