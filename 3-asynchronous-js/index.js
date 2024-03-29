const fs = require("fs");
const superagent = require("superagent");

fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
    console.log(`Breed: ${data}`);

    superagent
        .get(`https://dog.ceo/api/breed/${data}/images/random`)
        .end((err, res) => {
            if (err) 
                return console.log(err.message);
            console.log(res.body.message);

            fs.writeFile('dog-image.txt', res.body.message, err => {
                if (err) 
                    return console.log(err.message);
                console.log('Random dog image saved to file!');
            });
        });

    // Using superagent with promises methods then() and catch()
    
    // superagent
    //     .get(`https://dog.ceo/api/breed/${data}/images/random`)
    //     .then(res => {
    //         console.log(res.body.message);

    //         fs.writeFile('dog-image.txt', res.body.message, err => {
    //             if (err) 
    //                 return console.log(err.message);
    //             console.log('Random dog image saved to file!');
    //         });
    //     })
    //     .catch(err => {
    //         console.log(err.message);
    //     });

})