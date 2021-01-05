const franc = require("franc");
const langs = require("langs");
const colors = require("colors");

const phrase = process.argv[2];
const code = franc(phrase);
if (code === "und") {
    console.log("Could not match a language. Please try again with a larger sample.".red);
} else {
    console.log(langs.where("3", code).name);
}