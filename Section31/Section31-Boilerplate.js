const fs = require('fs');

const dirName = process.argv[2] || "Project";
//Async method
// fs.mkdir(dirName, {recursive:true}, (err) => {
//     console.log("In the callback");
//     if (err) throw err;
// })

//Sync method
try {
    fs.mkdirSync(dirName);
    fs.writeFileSync(`${dirName}/index.html`, "");
    fs.writeFileSync(`${dirName}/app.js`, "");
    fs.writeFileSync(`${dirName}/style.css`, "");
} catch (e) {
    console.log("Oh no", e);
}