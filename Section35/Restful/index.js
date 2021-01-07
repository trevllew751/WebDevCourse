// GET /comments - list all comments
// POST /comments - Create a new comment
// GET /comments/:id - get one comment (using ID)
// PATCH /comments/:id - Update one comment (using ID)
// DELETE /comments/:id - Destroy one comment (using ID)

const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const { v4: uuid } = require('uuid');

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(methodOverride("_method"));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

let comments = [
    {
        id: uuid(),
        username: "Todd",
        comment: "Tapes"
    },
    {
        id: uuid(),
        username: "Rick",
        comment: "And"
    },
    {
        id: uuid(),
        username: "Teemo",
        comment: "CDs"
    },
    {
        id: uuid(),
        username: "Tlew",
        comment: "Got eem"
    },
]

app.get("/comments", (req, res) => {
    res.render("comments/index", {comments});
})

app.get("/comments/new", (req, res) => {
    res.render("comments/new");
})

app.get("/comments/:id", (req, res) => {
    const {id} = req.params;
    const comment = comments.find( c => c.id === id);
    res.render('comments/show', {comment});
})

app.post("/comments", (req, res) => {
    const {username, comment} = req.body;
    comments.push({username, comment, id:uuid()});
    res.redirect("/comments");
})

app.patch("/comments/:id", (req, res) => {
    const {id} = req.params;
    const foundComment = comments.find( c => c.id === id);
    foundComment.comment = req.body.comment;
    res.redirect("/comments")
})

app.get("/comments/:id/edit", (req, res) => {
    const {id} = req.params;
    const foundComment = comments.find( c => c.id === id);
    res.render("comments/edit", {foundComment});
})

app.delete("/comments/:id", (req, res) => {
    const {id} = req.params;
    comments = comments.filter(c => c.id !== id);
    res.redirect("/comments");
})

app.listen(3000, () => {
    console.log("Opened on port 3000");
})
