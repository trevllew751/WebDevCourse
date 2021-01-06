const express = require("express");
const app = express();

// app.use((req, res) => {
//     // console.log("New request");
//     // res.send("Request received. Here is response");
//     // res.send({color: "red"});
//     // res.send("<h1>This is my webpage</h1>");
// })

app.get('/cats', (req, res) => {
    // console.log("Cat request")
    res.send("Meow");
})

app.get('/dogs', (req, res) => {
    // console.log("Cat request")
    res.send("Woof");
})

app.get('/', (req, res) => {
    res.send("Welcome to the home page!!!")
})

app.get('/r/:subreddit', (req, res) => {
    const {subreddit} = req.params;
    res.send(`<h1>Browsing the ${subreddit} subreddit</h1>`);
})

app.get('/r/:subreddit/:postId', (req, res) => {
    const {subreddit, postId} = req.params;
    res.send(`<h1>Viewing post ${postId} on the ${subreddit} subreddit</h1>`);
})
// the ":" indicates a variable that can be used

app.get("/search", (req, res) => {
    const{q} = req.query;
    if (!q) {
        res.send("Nothing found if nothing searched")
    }
    res.send(`Search results for ${q}`);
})

app.post('/cats', (req, res) => {
    res.send("Post request");
})

app.get('*',(req, res) => {
    res.send("No path");
})

app.listen(3000, () => {
    console.log("Listening on port 3000");
});

// /cats => "meow"
// /dogs => "woof"
// / => "Home"