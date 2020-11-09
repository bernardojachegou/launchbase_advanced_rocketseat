const fs = require('fs');

// Callbacks
fs.readFile('./list.text', (err, contents) => {
    fs.readFile('./list.text', (err2, contents2) => {
        console.log(err, String(contents));
        console.log(err2, String(contents2));
    })
})

// Promises
const readFile = file => new Promise((resolve, reject) => {
    fs.readFile(file, (err, contents) => {
        if (err) {
            reject(err);
        } else {
            resolve(contents)
        }
    })
})

// Async/Await

const init = async () => {
    try {
        const contents = await readFile('./list.text')
        return String(contents);
    } catch (err) {
        console.log(err);
    }
}

init().then(contents => console.log(contents));
