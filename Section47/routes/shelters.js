const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("All shelters")
})

router.get("/:id", (req, res) => {
    res.send(`Specific shelter: ${req.params.id}`)
})

router.post("/", (req, res) => {
    res.send("Creating new shelter")
})

router.put("/", (req, res) => {
    res.send("Updating shelter")
})

router.delete("/", (req, res) => {
    res.send("Deleting shelter")
})

module.exports = router;