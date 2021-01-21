const bcrypt = require("bcrypt");

const saltRounds = 12;

// const hashPassword = async (password) => {
//     const salt = await bcrypt.genSalt(saltRounds);
//     const hash = await bcrypt.hash(password, salt);
//     console.log(salt);
//     console.log(hash);
// }

const hashPassword = async (password) => {
    const hash = await bcrypt.hash(password, saltRounds);
    console.log(hash);
}

const login = async (password, hash) => {
    const result = await bcrypt.compare(password, hash);
    if (result) {
        console.log("logged in!")
    } else {
        console.log("no!")
    }
}

// hashPassword("monke");
// login("monke", "$2b$12$S1ZAepnLQVkeCud821jGRec/SkLb/cUG6eruj4eCfjtonlkfE87/W");
login("monke", "$2b$12$q6/mkeMTlNH/ihjIAxeh5O.1A6CT14i4dGZBKzl8naLOdgJgGpx9i");