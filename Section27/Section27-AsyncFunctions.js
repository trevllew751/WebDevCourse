// async function hello() {
//
// }

// const sing = async () => {
//     throw new Error("error");
//     return "LA LA LA LA";
// }
//
// sing()
//     .then(data => console.log("Promise resolved with:", data))
//     .catch(err => console.log("Promise rejected:", err))


const login = async (username, password) => {
    if (!username || !password) {
        throw "Missing Credentials"
    }
    if (password === "yuhman") {
        return "Welcome"
    }
    throw "Invalid password"
}

login("spend three racks", "yuhman")
    .then(msg => {
        console.log("Logged in")
        console.log(msg)
    })
    .catch(err => {
        console.log("Error")
        console.log(err);
    })

const delayedColorChange = (color, delay) => {
    return new Promise((resolve, reject) => {
        setTimeout( () => {
            document.body.style.backgroundColor = color;
            resolve();
        }, delay)
    })
}

async function rainbow() {
    await delayedColorChange("red", 1000)
    await delayedColorChange("orange", 1000)
    await delayedColorChange("yellow", 1000)
    await delayedColorChange("green", 1000)
    await delayedColorChange("blue", 1000)
    await delayedColorChange("indigo", 1000)
    await delayedColorChange("violet", 1000)
    return "All done"
}

// rainbow()
//     .then(() => console.log("End of rainbow"))

const fakeRequest = (url) => {
    return new Promise((resolve, reject) => {
        const rand = Math.random();
        setTimeout(() => {
            if (rand < 0.7) {
                resolve("Fake data");
            }
            reject("Request error")
        }, 1000);
    })
}

async function makeTwoRequests() {
    try {
        let data1 = await fakeRequest("/nibbas1")
        let data2 = await fakeRequest("/nibbas2")
        console.log(data1)
        console.log(data2)
    } catch(e) {
        console.log("Fail")
        console.log(e)
    }
}

