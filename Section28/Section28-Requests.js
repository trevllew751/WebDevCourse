//////////////OLD WAY///////////////
// const req = new XMLHttpRequest();
//
// req.onload = function () {
//     console.log("Done with request");
//     const data = JSON.parse(this.responseText);
//     console.log(data.ticker.price);
// }
//
// req.onerror = function () {
//     console.log("Error");
//     console.log(this);
// }
//
// req.open('get', "https://api.cryptonator.com/api/full/btc-usd/");
// req.send();

///////////Fetch with promises///////////
// fetch("https://api.cryptonator.com/api/full/btc-usd/")
//     .then(res => {
//         console.log("RESPONSE:", res);
//         return res.json();
//     })
//     .then(data => {
//         console.log("Data parsed:", data);
//         console.log(data.ticker.price);
//     })
//     .catch(err => {
//         console.log("OH NO:", err);
//     })

//////////Fetch with Async functions////////
// const fetchBCPrice = async () => {
//     try {
//         const res = await fetch("https://api.cryptonator.com/api/full/btc-usd/");
//         const data = await res.json();
//         console.log(data.ticker.price);
//     } catch (err) {
//         console.log("Error:", err);
//     }
//
// }

///////////Axios request with promises/////////////
// axios.get("https://api.cryptonator.com/api/full/btc-usd/")
//     .then( res => {
//         console.log(res.data.ticker.price);
//     })
//     .catch( err => {
//         console.log("Error:", err);
//     })

/////////Axios request with async function///////////
const fetchBCPrice = async () => {
    try {
        const res = await axios.get("https://api.cryptonator.com/api/full/btc-usd/");
        console.log(res.data.ticker.price);
    } catch (err) {
        console.log("Error:", err);
    }
}

const jokes = document.querySelector("#jokes");
const button = document.querySelector("button");

const getDadJoke = async () => {
    const config = {headers: {Accept: "application/json"}};
    const res = await axios.get("https://icanhazdadjoke.com", config);
    const newLI = document.createElement("li");
    newLI.innerText = res.data.joke;
    jokes.append(newLI);
}

button.addEventListener("click", getDadJoke);