// Função que retorna o dobro do valor em ordem aleatória

// function printDouble(number) {
//   setTimeout(() => {
//     console.log(number * 2);
//   }, Math.floor(Math.random() * 100) + 1);
// }

// function printAll() {
//   printDouble(5); // 2
//   printDouble(10); // 5
//   printDouble(22); // 3
//   printDouble(1); // 4
//   printDouble(89); // 1
// }

// printAll();

// Await no printAll;

const printDoubleWithPromise = function () {
  return new Promise(function (resolve, reject) {
    const printDouble = function (number) {
      setTimeout(() => {
        console.log(number * 2);
      }, Math.floor(Math.random() * 100) + 1);
    };
    resolve(printDouble);
  });
};
