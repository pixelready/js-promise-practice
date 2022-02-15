"use strict";

const NUMBERS_API_BASE_URL = "http://numbersapi.com";
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

async function getFacts(num, numFacts){
  
  const results = [];
  for(let i = 0; i<numFacts; i++){
    let fact = await getNumFact(num);
    results.push(fact);
  }

  return results;
}

function displayFacts(facts){
  for (let fact of facts){
    //console.log(fact);
    let $displayRow = $('<li class = "display-row">');
    $displayRow.text(`This is your fact: ${fact}`);
    $displayContainer.append($displayRow);
  }
}

async function getAndDisplayFacts(num, numFacts){
  const facts = await getFacts(num, numFacts);
  console.log(facts)
  displayFacts(facts);
}

// getAndDisplayNums(24, 42, 89);
// console.log(getNumFact(42));
getAndDisplayFacts(7, 4);
