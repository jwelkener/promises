$(function() {
	let baseURL = 'https://deckofcardsapi.com/api/deck';
  
	async function uno() {
	  try {
		let data = await $.getJSON(`${baseURL}/new/draw`);
		let { suit, value } = data.cards[0];
		console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
	  } catch (error) {
		console.error('Error fetching data:', error);
	  }
	}
  
	// Call the uno function
	uno();

	async function dos() {
		try {
		  let firstCardData = await $.getJSON(`${baseURL}/new/draw/`);
		  let deckId = firstCardData.deck_id;
	  
		  if (!deckId) {
			throw new Error('Failed to get deck ID.');
		  }
	  
		  let secondCardData = await $.getJSON(`${baseURL}/${deckId}/draw/`);
	  
		  [firstCardData, secondCardData].forEach(card => {
			let { suit, value } = card.cards[0];
			console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
		  });
		} catch (error) {
		  console.error('Error fetching data:', error);
		}
	  }

	// Call the dos function
	dos();
	  
	async function setup() {
		let $btn = $('button');
		let $cardArea = $('#card-area');
	
		let deckData = await $.getJSON(`${baseURL}/new/shuffle/`);
		$btn.show().on('click', async function() {
		  let cardData = await $.getJSON(`${baseURL}/${deckData.deck_id}/draw/`);
		  let cardSrc = cardData.cards[0].image;
		  let angle = Math.random() * 90 - 45;
		  let randomX = Math.random() * 40 - 20;
		  let randomY = Math.random() * 40 - 20;
		  $cardArea.append(
			$('<img>', {
			  src: cardSrc,
			  css: {
				transform: `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`
			  }
			})
		  );
		  if (cardData.remaining === 0) $btn.remove();
		});
	  }
	  setup();
  });
  