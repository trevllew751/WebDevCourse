// const color = document.querySelector("#colorChange");
// const body = document.querySelector("body");
// const h1 = document.querySelector("h1");
//
// color.addEventListener("click", function() {
//     let bgColor = randomColor();
//     h1.innerText = bgColor;
//     body.style.backgroundColor = bgColor;
// })

const randomColor = () => {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

const buttons = document.querySelectorAll('button');
const h1s = document.querySelectorAll("h1");

for (let btn of buttons) {
    btn.addEventListener("click", colorize);
}

for (let h of h1s) {
    h.addEventListener("click", colorize);
}

function colorize() {
    this.style.backgroundColor = randomColor();
    this.style.color = randomColor();
}