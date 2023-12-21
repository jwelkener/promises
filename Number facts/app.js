let faveNumber = 15;
let baseURL = "http://numbersapi.com";

// 1.
async function uno() {
  try {
    let data = await $.getJSON(`${baseURL}/${faveNumber}?json`);
    console.log(data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

uno();

// 2.
const favNumbers = [7, 11, 22];
async function dos() {
  let data = await $.getJSON(`${baseURL}/${favNumbers}?json`);
  console.log(data);
}
dos();

//3.

async function tres() {
	let facts = await Promise.all(
		Array.from({length:4}, () => $.getJSON(`${baseURL}/${faveNumber}?json`))
	);
	facts.forEach(data => {
		$('body').append(`<p>${data.text}</p>`);
	});
}
tres();