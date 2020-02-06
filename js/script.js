'use strict';

const input = document.getElementById('input'), // input/output button
  numbers = document.querySelectorAll('.numbers div'), // number buttons
  operators = document.querySelectorAll('.operators div'), // operator buttons
  result = document.getElementById('result'), // equal button
  clear = document.getElementById('clear'); // clear button

let resultDisplayed = false; // flag to keep an eye on what output is displayed

// numbers is a NodeList object, we need to make it into an array first, then we can map through it...
Array.from(numbers).map(number => {
  number.addEventListener('click', function() {
    // if result is not diplayed, just keep adding
    let currentString = input.innerHTML;
    let lastChar = currentString[currentString.length - 1];
    if (resultDisplayed === false) {
      input.innerHTML += this.innerHTML;
    } else if (
      (resultDisplayed === true && lastChar === '+') ||
      lastChar === '-' ||
      lastChar === '*' ||
      lastChar === '/'
    ) {
      // if result is currently displayed and user pressed an operator
      // we need to keep on adding to the string for next operation
      resultDisplayed = false;
      input.innerHTML += this.innerHTML;
    } else {
      // if result is currently displayed and user pressed a number
      // we need clear the input string and add the new input to start the new opration
      resultDisplayed = false;
      input.innerHTML = '';
      input.innerHTML += this.innerHTML;
    }
  });
});

// adding click handlers to the calculation buttons
Array.from(operators).map(operator => {
  operator.addEventListener('click', function() {
    // storing current input string and its last character in variables - used later
    let currentString = input.innerHTML;
    let lastChar = currentString[currentString.length - 1];

    // if last character entered is an operator, replace it with the currently pressed one
    if (
      lastChar === '+' ||
      lastChar === '-' ||
      lastChar === '*' ||
      lastChar === '/'
    ) {
      // We need to create a new string, and just replace the last character.
      const newString =
        currentString.substring(0, currentString.length - 1) + this.innerHTML;
      input.innerHTML = newString;
    } else if (currentString.length == 0) {
      // if first key pressed is an opearator, don't do anything
      console.log('enter a number first');
    } else {
      // else just add the operator pressed to the input
      input.innerHTML += this.innerHTML;
    }
  });
});

// on click of 'equal' button
result.addEventListener('click', function() {
  const currentString = input.innerHTML;
  const numberStringArray = currentString.split(/\+|\-|\*|\//g);

  let numbersArray = [];
  // Loop through the numberStringArray, and convert the string to int and write to a new array
  numberStringArray.forEach(function(number) {
    numbersArray.push(Number(number));
  });

  // Get an array of the operators
  const operatorsArray = currentString.replace(/[0-9]|\./g, '').split('');

  // operatorsArray = ['*']
  // operatorsArray = ['-', '+']

  // We need 4 while loops to do each math operation
  let multiply = operatorsArray.indexOf('*');
  while (multiply != -1) {
    //array.splice(start, deleteCount, value);
    // string = ["2*3*1"];
    // numberArray = [2,3];
    // operators["*", "*"]
    // multiply = 0;
    // numbersArray[0] = 2
    // numbersArray[1] = 3
    // value = 2 * 3;
    // numbersArray = [6]
    numbersArray.splice(
      multiply,
      2,
      numbersArray[multiply] * numbersArray[multiply + 1]
    );
    // This line removes one instance of the multiply
    operatorsArray.splice(multiply, 1);
    // this line updates the multiply variable for any additonal multiply operators
    multiply = operatorsArray.indexOf('*');
  }

  resultDisplayed = true;
  input.innerHTML = numbersArray;
});

// clearing the input on press of clear
clear.addEventListener('click', function() {
  input.innerHTML = '';
});
