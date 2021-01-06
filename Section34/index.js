const express = require("express");
const path = require("path");
const app = express();
const redditData = require("./data.json");

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, "/views"));   // sets the correct directory for the views folder

app.use(express.static(path.join(__dirname, "public")));

app.get('/', (req, res) => {
    res.render('home');
})

app.get('/rand', (req, res) => {
    const rand = Math.floor(Math.random() * 10) + 1;
    res.render('random', {rand});
})

app.get('/cats', (req, res) => {
    const cats = ["cat", "kat", "ckat", "qat"];
    res.render('cats', {cats});
})

app.get("/r/:subreddit", (req, res) => {
    const {subreddit} = req.params;
    const data = redditData[subreddit];
    if (data) {
        res.render('subreddit', {...data});
    } else {
        res.render("notfound", {subreddit});
    }
})

app.listen(3000, () => {
    console.log("Server open on port 3000");
})