"use strict";

const NUMBERS_API_BASE_URL = "http://numbersapi.com";
const $displayContainer = $("#display-container");

async function getNumFact(num) {
  return await axios.get(`${NUMBERS_API_BASE_URL}/${num}/?json`);
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

getAndDisplayNums(24, 42, 89);
console.log(getNumFact(42));
