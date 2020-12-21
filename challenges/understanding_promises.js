// These functions return the results in a random order;

function printDouble(number) {
  setTimeout(() => {
    console.log(`2 * ${number} = ${number * 2}`);
  }, Math.floor(Math.random() * 100) + 1);
}

function printAll() {
  printDouble(5); // 2
  printDouble(10); // 5
  printDouble(22); // 3
  printDouble(1); // 4
  printDouble(89); // 1
}

printAll();

// Solution;
// Promise function;

const sleep = (timeout) =>
  new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });

// Async/Await function;

const asyncDouble = async (number) => {
  await sleep(Math.floor(Math.random() * 100) + 1);
  return number * 2;
};

// Callback function;

const printDouble = (number) => (result) => {
  if (result) console.log(`2 * ${result / 2} = ${result}`);
  return asyncDouble(number);
};

Promise.resolve()
  .then(printDouble(1))
  .then(printDouble(2))
  .then(printDouble(3))
  .then(printDouble(4))
  .then(printDouble(5))
  .then(printDouble(6))
  .then(printDouble(7))
  .then(printDouble(8))
  .then(console.log);
