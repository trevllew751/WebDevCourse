// const allImages = document.getElementsByTagName("img")
//
// for (let img of allImages) {
//     img.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Partridge_Silkie_hen.jpg/900px-Partridge_Silkie_hen.jpg";
// }

// const squareImages = document.getElementsByClassName("square");
// for (let img of squareImages) {
//     img.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Partridge_Silkie_hen.jpg/900px-Partridge_Silkie_hen.jpg";
// }

// const links = document.querySelectorAll("p a");
// for (let link of links) {
//     console.log(link.href);
// }

// const allLinks = document.querySelectorAll('a');
// for (let link of allLinks) {
//     link.style.color = "#451c89"
//     link.style.textDecorationStyle = "wavy";
//     link.style.textDecorationColor = "orange";
// }

const pokemon = document.querySelector("#pokemon");
for (let i = 1; i <= 151; i++) {
    let poke = document.createElement("div");
    let label = document.createElement("span");
    label.innerText = `#${i}`;
    let img = document.createElement("img");
    img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i}.png`;
    poke.appendChild(img);
    poke.appendChild(label);
    pokemon.append(poke);
}
