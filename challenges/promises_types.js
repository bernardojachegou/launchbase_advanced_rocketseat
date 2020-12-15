// Common function

function helloWorld1() {
  console.log('Olá mundo! (1)');
}

helloWorld1();

// Promise structure (one)
function helloWorld2() {
  return new Promise((resolve, reject) => {
    console.log('Olá mundo! (2)');
    resolve();
  });
}

helloWorld2();

// Promise structure (two)
const promise = new Promise((resolve, reject) => {
  setTimeout(() => resolve('Olá mundo! (3)'), 1000);
});

// Promise structure (three)
async function helloWorld3() {
  console.log('Testando promise (4)');
  const text = await promise;
  console.log(text);
}

helloWorld3();
