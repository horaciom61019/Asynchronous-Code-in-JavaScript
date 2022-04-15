let baseURL = "http://deckofcardsapi.com/api/deck"

// 1) Make a request to the Deck of Cards API to request 
//    a single card from a newly shuffled deck. Once you have the card, 
//    console.log the value and the suit (e.g. “5 of spades”, “queen of diamonds”).

// let singleCard = axios.get(`${baseURL}/new/draw`); 
// singleCard.then(resp => {
//         let {value, suit} = resp.data.cards[0]
//         console.log(`${value} of ${suit}`)
//     })
//     .catch(err => console.log(err));

async function part1(){
    let resp = await axios.get(`${baseURL}/new/draw`);
    let {value, suit} = resp.data.cards[0];
    console.log(`${value} of ${suit}`);
};
part1();



/** **************************************************************************************** */
// 2) Make a request to the deck of cards API to request a single card from a newly shuffled deck. 
//    Once you have the card, make a request to the same API to get one more card from the same deck.
//    Once you have both cards, console.log the values and suits of both cards.

// let card1 = null
// axios
//     .get(`${baseURL}/new/draw`)
//     .then(data => {
//         card1 = data.data.cards[0];
//         let deckID = data.data.deck_id;
//         return axios.get(`${baseURL}/${deckID}/draw/`);
//     })
//     .then(data => {
//         let card2 = data.data.cards[0];
//         [card1, card2].forEach(function(card){
//             console.log(`${card.value} of ${card.suit}`)
//         })
//     })
//     .catch(err => console.log(err));

async function part2(){
    let card1 = await axios.get(`${baseURL}/new/draw`);
    let deckID = card1.data.deck_id;
    let card2 = await axios.get(`${baseURL}/${deckID}/draw/`);
    [card1, card2].forEach(card => {
        let {suit, value} = card.data.cards[0];
        console.log(`${value} of ${suit}`);
    });
};
part2();



/** **************************************************************************************** */
// 3) Build an HTML page that lets you draw cards from a deck. When the page loads, 
//    go to the Deck of Cards API to create a new deck, and show a button on the page 
//    that will let you draw a card. Every time you click the button, display a new card, 
//    until there are no cards left in the deck.

// let deckId = null;
// let $btn = $('button');
// let $cardArea = $('#card-area');

// axios
//     .get(`${baseURL}/new/shuffle/`)
//     .then(data => {
//         deckId = data.data.deck_id;
//         $btn.show();
//     });

// $btn.on('click', function() {
//     axios
//         .get(`${baseURL}/${deckId}/draw/`)
//         .then(data => {
//             let cardImg = data.data.cards[0].image
//             $cardArea.append(
//                 $('<img>', {
//                     src: cardImg
//                 })
//             )
//             if (data.data.remaining === 0) $btn.remove();
//         })
// })

async function part3(){
    let $btn = $('button');
    let $cardArea = $('#card-area');
    let deck = await axios.get(`${baseURL}/new/shuffle/`);

    $btn.on('click', async function (){
        let card = await axios.get(`${baseURL}/${deck.data.deck_id}/draw/`);
        let cardImg = card.data.cards[0].image;
        $cardArea.append(
            $('<img>', {
                src: cardImg
            })
        );
        if (card.data.remaining === 0) $btn.remove();
    });
};
part3();