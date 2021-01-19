const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();

app.use(cookieParser("secret"));

app.get("/greet", (req, res) => {
    const {name = 'yuhman'} = req.cookies;
    res.send(`Hey there, ${name}`);
})

app.get("/setname", (req, res) => {
    res.cookie("name", "blackseki");
    res.cookie("suh", "nigerians niberians");
    res.send("Ok sent a cookie");
})

app.get("/getsignedcookie", (req, res) => {
    res.cookie("fruit", "grape", {signed: true});
    res.send("Signed your cookie")
})

app.get("/verifyfruit", (req, res) => {
    res.send(req.signedCookies);
})

app.listen(3000, () => {
    console.log("Open on port 3000")
})