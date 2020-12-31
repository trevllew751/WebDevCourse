// const btn = document.querySelector("#v2");
//
// btn.onclick = function() {
//     console.log("clicked");
// }
//
// function scream() {
//     alert("yuuuhhh")
// }
//
// btn.onmouseenter = scream;
//
// const btn3 = document.querySelector('#v3');
// btn3.addEventListener('dblclick', function(){
//     console.log("Spend three racks")
// })
//
// function twist() {
//     console.log("twist")
// }
// function shout() {
//     console.log("shout")
// }
//
// const tasBtn = document.querySelector("#tas");
// tasBtn.onclick = twist;
// tasBtn.onclick = shout;
//
// tasBtn.addEventListener("click", twist, {once: true}); //Options
// tasBtn.addEventListener("click", shout);

// document.querySelector("#object").addEventListener("click", (evt) => console.log(evt));
// const input = document.querySelector("input");
// input.addEventListener("keydown", function (evt) {
//         console.log(evt.key);
//         console.log(evt.code);
//     }
// )
// input.addEventListener("keyup", () => console.log("keyup"))

// window.addEventListener('keydown', function(evt) {
//     switch(evt.code) {
//         case "ArrowUp":
//             console.log("UP!");
//             break;
//         case "ArrowDown":
//             console.log("DOWN!");
//             break;
//         case "ArrowLeft":
//             console.log("LEFT!");
//             break;
//         case "ArrowRight":
//             console.log("RIGHT!");
//             break;
//         default:
//             console.log("Ignored");
//     }
// })

const tweet = document.querySelector("#tweet");
const tweets = document.querySelector("#tweets");
// const lis = document.querySelectorAll("li");
// for (let li of lis) {
//     li.addEventListener("click", () => li.remove());
// }

tweets.addEventListener("click", function(evt) {
    evt.target.remove();
});

tweet.addEventListener("submit", function(e) {
    e.preventDefault();
    // const usernameInput = document.querySelectorAll("input")[1];
    // const tweetInput = document.querySelectorAll("input")[2];
    const username = (tweet.elements.username);
    const text = (tweet.elements.tweet)
    addTweet(username.value, text.value);
    username.value = '';
    text.value = '';
    // alert("submit")
});

const addTweet = (username, text) => {
    const newTweet = document.createElement('li')
    const btag = document.createElement('b');
    btag.append(username);
    newTweet.append(btag);
    newTweet.append(`- ${text}`);
    tweets.append(newTweet);
}

const h1 = document.querySelector("#inputevent")
const inp = document.querySelector("#inp");
// inp.addEventListener("change", (evt) => console.log("fheilauhauf"));
inp.addEventListener("input", () => {
    h1.innerText = inp.value;
});

const bub = document.querySelector("#bub");
const container = document.querySelector("#container");

bub.addEventListener("click", function(evt) {
    container.style.backgroundColor = randomColor();
    evt.stopPropagation();
});
container.addEventListener("click", function() {
    container.classList.toggle("hide")
})

const randomColor = () => {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}