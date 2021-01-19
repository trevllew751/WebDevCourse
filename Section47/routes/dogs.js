const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("All dogs")
})
router.get("/edit", (req, res) => {
    res.send("Editing dog")
})
router.get("/:id", (req, res) => {
    res.send("Specific dog")
})

module.exports = router;