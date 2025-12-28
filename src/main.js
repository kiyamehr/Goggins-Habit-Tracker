'use strict';

//* Selecting DOM Elements

// Header
const headerQuote = document.querySelector('#quote');

//* Datas

// Quote Array
const quotes = [
  'Most people only tap into 40% of their potential.',
  'You are in danger of living a life so comfortable and soft.',
  "The most important conversations you'll ever have are the ones you'll have with yourself.",
  'Suffering is the true test of life.',
  "Don't stop when you're tired. Stop when you're done.",
  "While you're sleeping, someone else is training.",
  "They Don't Know Me Son!",
  'Whose Gonna Carry The Boats?!',
  "I don't stop when I'm tired. I stop when I'm done.",
  'The governor is in your mind. You have to kill that motherfucker.',
];

//* Working...

// Random Quote For Header
let randomQuoteNumber = Math.trunc(Math.random() * quotes.length + 1);
headerQuote.textContent = quotes[randomQuoteNumber];
