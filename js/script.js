'use strict';

const input = document.querySelector('#input'), // input/output button
  numbers = document.querySelectorAll('.numbers div'), // number buttons
  operators = document.querySelectorAll('.operators div'), // operator buttons
  result = document.querySelector('#result'), // equal button
  clear = document.querySelector('#clear'); // clear button

let resultDisplayed = false; // flag to keep an eye on what output is displayed

numbers.forEach(function(number) {
  number.addEventListener('click', function(e) {
    input.innerHTML += this.innerText;
  });
});

operators.forEach(function(operator) {
  operator.addEventListener('click', function(e) {
    let currentString = input.innerHTML;
    let lastChar = currentString[currentString.length - 1];

    if (currentString !== '') {
      if (
        lastChar === '+' ||
        lastChar === '-' ||
        lastChar === '*' ||
        lastChar === '/'
      ) {
        const newString =
          currentString.substring(0, currentString.length - 1) + this.innerHTML;
        input.innerHTML = newString;
      } else {
        input.innerHTML += this.innerHTML;
      }
    } else {
      alert(`CAN'T DO THAT`);
    }
  });
});

result.addEventListener('click', function(e) {
  const inputString = input.innerHTML;
  let numbersArray = inputString.split(/\+|\-|\*|\//g);
  let operatorsArray = inputString.replace(/[0-9]|\./g, '').split('');

  // map is rad, because we can do stuff like this...
  // Loop through the array,
  // run the Number function to convert strings to numbers
  // map returns new values, so we can get a new array of numbers, instead of strings
  // Here, I'm re-assigning the value of numbersArray to be equal to this new array
  // a forEach loop would require pushing the values into a new array
  numbersArray = numbersArray.map(Number);

  // We are looping through the array and doing one operation at a time.
  // First we multiply, then divide, then add and then subtract.
  // As we move we are alternating the original numbers and operators arrays
  // The final value remaining in the array will be the output

  let multiply = operatorsArray.indexOf('*');
  while (multiply != -1) {
    numbersArray.splice(
      multiply,
      2,
      numbersArray[multiply] * numbersArray[multiply + 1]
    );
    operatorsArray.splice(multiply, 1);
    multiply = operatorsArray.indexOf('*');
  }

  let divide = operatorsArray.indexOf('/');
  while (divide != -1) {
    numbersArray.splice(
      divide,
      2,
      numbersArray[divide] / numbersArray[divide + 1]
    );
    operatorsArray.splice(divide, 1);
    divide = operatorsArray.indexOf('/');
  }

  let add = operatorsArray.indexOf('+');
  while (add != -1) {
    // using parseFloat is necessary, otherwise it will result in string concatenation :)
    numbersArray.splice(
      add,
      2,
      parseFloat(numbersArray[add]) + parseFloat(numbersArray[add + 1])
    );
    operatorsArray.splice(add, 1);
    add = operatorsArray.indexOf('+');
  }

  let subtract = operatorsArray.indexOf('-');
  while (subtract != -1) {
    numbersArray.splice(
      subtract,
      2,
      numbersArray[subtract] - numbersArray[subtract + 1]
    );
    operatorsArray.splice(subtract, 1);
    subtract = operatorsArray.indexOf('-');
  }

  input.innerHTML = numbersArray[0];
});

clear.addEventListener('click', function(e) {
  input.innerHTML = '';
  resultDisplayed = false;
});
