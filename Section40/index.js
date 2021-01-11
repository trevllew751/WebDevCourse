const express = require("express");
const app = express();
const morgan = require("morgan");


app.use(morgan("tiny"));
// app.use((req, res, next) => {
//     console.log("Middleware!!");
//     next();
// })
app.use((req, res, next) => {
    req.requestTime = Date.now();
    console.log(req.method, req.path);
    next();
})

app.use("/pups", (req, res, next) => {
    console.log("Hi puppies")
    next();
})

const verify = (req, res, next) => {
    const {password} = req.query;
    if (password === "chiccynugs") {
        next();
    }
    res.send("You need a password to get here")
}

app.get("/", (req, res) => {
    console.log(req.requestTime);
    res.send("Home page")
})

app.get("/secret", verify, (req, res) => {
    res.send("The secret ingredient to my secret ingredient soup is nothing")
})

app.get("/pups", (req, res) => {
    res.send("Bork bork")
})


app.use((req, res) => {
    res.status(404).send("NOT FOUND")
})

app.listen(3000, () => {
    console.log("Open on port 3000");
})