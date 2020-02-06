'use strict';

const input = document.querySelector('#input'), // input/output button
  numbers = document.querySelectorAll('.numbers div'), // number buttons
  operators = document.querySelectorAll('.operators div'), // operator buttons
  result = document.querySelector('#result'), // equal button
  clear = document.querySelector('#clear'); // clear button

let resultDisplayed = false; // flag to keep an eye on what output is displayed
