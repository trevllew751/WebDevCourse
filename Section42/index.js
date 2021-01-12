const express = require("express");
const app = express();
const morgan = require("morgan");
const AppError = require("./AppError");

app.use(morgan("tiny"));
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
    res.status(401);
    throw new AppError("Password Required", 401)
}

app.get("/", (req, res) => {
    console.log(req.requestTime);
    res.send("Home page")
})

app.get("/error", (req, res) => {
    chicken.fly()
})

app.get("/secret", verify, (req, res) => {
    res.send("The secret ingredient to my secret ingredient soup is nothing")
})

app.get("/admin", (req, res) => {
    throw new AppError("You are not an admin", 403);
})

app.get("/pups", (req, res) => {
    res.send("Bork bork")
})

app.use((req, res) => {
    res.status(404).send("NOT FOUND")
})

// app.use((err, req, res, next) => {
//     console.log("***********************************************");
//     console.log("********************Error**********************");
//     console.log("***********************************************");
//     next(err);
// })
app.use((err, req, res, next) => {
    const {status = 500, message = "Error"} = err;
    res.status(status).send(message);
})


app.listen(3000, () => {
    console.log("Open on port 3000");
})