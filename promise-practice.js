"use strict";

const NUMBERS_API_BASE_URL = "http://numbersapi.com";
const DECK_API_BASE_URL = "http://deckofcardsapi.com/api";
const $displayContainer = $("#display-container");

async function getNumFact(num) {
  let response = await axios.get(`${NUMBERS_API_BASE_URL}/${num}/?json`);
  //console.log(response.data.text);
  return response.data.text;
}

async function getNumBatch(nums) {
  let numString = nums.join(",");
  return await axios.get(`${NUMBERS_API_BASE_URL}/${numString}`);
}

function displayNumBatch(numBatch) {
  for (let num in numBatch.data) {
    let $displayRow = $('<li class = "display-row">');
    $displayRow.text(`Number ${numBatch.data[num]}`);
    $displayContainer.append($displayRow);
  }
}

async function getAndDisplayNums(...nums) {
  let numBatch = await getNumBatch(nums);
  displayNumBatch(numBatch);
}

async function getFacts(num, numFacts) {
  const results = [];
  for (let i = 0; i < numFacts; i++) {
    let fact = await getNumFact(num);
    results.push(fact);
  }

  return results;
}

function displayFacts(facts) {
  for (let fact of facts) {
    //console.log(fact);
    let $displayRow = $('<li class = "display-row">');
    $displayRow.text(`This is your fact: ${fact}`);
    $displayContainer.append($displayRow);
  }
}

async function getAndDisplayFacts(num, numFacts) {
  const facts = await getFacts(num, numFacts);
  console.log(facts);
  displayFacts(facts);
}

// getAndDisplayNums(24, 42, 89);
// console.log(getNumFact(42));
//getAndDisplayFacts(7, 4);

async function getDeck() {
  let newDeck = await axios.get(`${DECK_API_BASE_URL}/deck/new/shuffle/?deck_count=1`);
  return newDeck.data.deck_id;
}

async function drawCardsFromDeck(deckId, num) {
  let drawnCard = await axios.get(`${DECK_API_BASE_URL}/deck/${deckId}/draw/?count=${num}`);
  return drawnCard.data.cards;
}

async function makeDeckAndDraw(num) {
  let deck = await getDeck();
  let cards = await drawCardsFromDeck(deck, num);
  return cards;
  // console.log(cards);
  // console.log(`You drew a ${cards[0].value} of ${cards[0].suit}`);
}

function displayCard(card) {
  $newCardImage = $(`<img src={card.images.svg}>`);
  $displayContainer.append($newCardImage);
}

async function drawCardAndDisplay() {
  newCards = await makeDeckAndDraw(1);
  displayCard(newCards[0]);
}

$("#draw-card").on("click", drawCardAndDisplay);

makeDeckAndDraw(1);