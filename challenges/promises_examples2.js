// Common function

function helloWorld1() {
	console.log("Olá mundo");
}

function helloWorld2() {
	return new Promise((resolve, reject) => {
		console.log("Olá mundo");
		resolve()
	})
}

const promise = new Promise((resolve, reject) => {
	setTimeout(() => resolve("Olá mundo!"), 5000)
})

async function helloWorld3() {
	console.log("Testando promise");
	const text = await promise;
	console.log(text);
}

helloWorld1();
helloWorld2();
helloWorld3();
