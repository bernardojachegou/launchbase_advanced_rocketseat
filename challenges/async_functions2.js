// Função que retorna o dobro do valor em ordem aleatória

// function printDouble(number) {
//     setTimeout(
//         () => {
//             console.log(number * 2)
//         },
//         Math.floor(Math.random() * 100) + 1
//     )
// }

// function printAll() {
//     printDouble(5)
//     printDouble(10)
//     printDouble(22)
//     printDouble(1)
//     printDouble(89)
// };

// printAll();

// Ordering the functions exec using callback hell;

// function callback(err, data) {
//     if (err) throw err
//     console.log(data);
// }

// Working with promises

// const promise = new Promise((resolve, reject) => {
//     setTimeout(() => resolve('End'), 2000)
// })

// promise
//     .then((data) => console.log(data))
//     .catch((err) => console.log('ops', err));

// promise.then((response) => { }, (reject) => { });

// const coinFlip = new Promise((resolve, reject) => Math.random() > 0.5 ? resolve('Yay') : reject('Oops'));

// coinFlip
//     .then((data) => console.log(data, 1))
//     .catch((err) => console.log('Erro 1'))
//     .then(() => console.log('End1'))
//     .catch((err) => console.log('Erro 2'))

const coinFlip = new Promise(
    (resolve, reject) => setTimeout(() => Math.random() > 0.5 ? resolve('Yay') : reject('Ops'), 2000)
)

const p = Promise.resolve('resolve').then(coinFlip);

p.then(console.log).catch(() => console.log('error'))