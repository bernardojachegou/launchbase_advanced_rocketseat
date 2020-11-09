// Função que retorna o dobro do valor em ordem aleatória

function printDouble(number) {
    setTimeout(
        () => {
            console.log(number * 2)
        },
        Math.floor(Math.random() * 100) + 1
    )
}

function printAll() {
    printDouble(5)
    printDouble(10)
    printDouble(22)
    printDouble(1)
    printDouble(89)
}

printAll()

// Mesma função utilizando async / await

function returnWithPromise() {
    return new Promise((resolve, reject) => {
        printDouble(5), (err) => {
            if (err) {
                reject(err); return;
            }
            resolve(Promise)
        }
    }).then(
        printDouble(10), (err) => {
            if (err) {
                reject(err); return;
            }
            resolve(Promise)
        }
    ).then(
        printDouble(22), (err) => {
            if (err) {
                reject(err); return;
            }
            resolve(Promise)
        }
    ).then(
        printDouble(1), (err) => {
            if (err) {
                reject(err); return;
            }
            resolve(Promise)
        }
    ).then(
        printDouble(89), (err) => {
            if (err) {
                reject(err); return;
            }
            resolve(Promise)
        }
    )
}

returnWithPromise();


var printDoubleWithPromise = function () {
    return new Promise(function (resolve, reject) {
        var printDouble = function (number) {
            setTimeout(
                () => {
                    console.log(number * 2)
                },
                Math.floor(Math.random() * 100) + 1
            )
        }
        resolve(printDouble)
    })
}

printDoubleWithPromise()
    .then(function (response) {
        console.log(response);
    });
