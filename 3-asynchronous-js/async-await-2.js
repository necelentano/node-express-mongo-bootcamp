const fs = require("fs");
const superagent = require("superagent");

const readFilePromise = file => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, (err, data) => {
            if (err) reject("I could not find this file 😢");
            resolve(data);
        });
    });
}

const writeFilePromise = (file, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(file, data, err => {
            if (err) reject("I could not write this file 😢");
            resolve('Success');
        })
    });
}

const getDogPic = async () => {
    try {
        const data = await readFilePromise(`${__dirname}/dog.txt`);
        console.log(`Breed: ${data}`);
        
        const res = await superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
        console.log(res.body.message);
        
        await writeFilePromise('dog-image.txt', res.body.message);
        console.log('Random dog image saved to file!'); 
    } catch (err) {
        console.log(err);
        throw(err);
    }

    return "2: READY 👌";
}

// asinc/await way with IIFE
(async () => {
    try {
        console.log("1: Will get dog pics!");
        const x = await getDogPic();
        console.log(x);
        console.log("3: Done getting dog pics!");
    } catch(err) {
        console.log("ERROR 💥");
    }
})()



// Mixing async/await with then() and catch() methods
/*
console.log("1: Will get dog pics!");
getDogPic()
    .then(x => {
        console.log(x);
        console.log("3: Done getting dog pics!");
    })
    .catch(err => {
        console.log("ERROR 💥");
    });
*/