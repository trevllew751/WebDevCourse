const express = require("express");
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get('/tacos', (req, res) => {
    res.send("GET /tacos response")
})

app.post('/tacos', (req, res) => {
    const {typePost, qtyPost} = req.body;
    res.send(`OK, here are your ${qtyPost} ${typePost} tacos`);
})

app.listen(3000, () => {
    console.log("Opened on port 3000")
})