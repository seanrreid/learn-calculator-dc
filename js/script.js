'use strict';

const input = document.querySelector('#input'), // input/output button
  numbers = document.querySelectorAll('.numbers div'), // number buttons
  operators = document.querySelectorAll('.operators div'), // operator buttons
  result = document.querySelector('#result'), // equal button
  clear = document.querySelector('#clear'); // clear button

let resultDisplayed = false; // flag to keep an eye on what output is displayed

const numberArray = [], operatorArray = [] // built in for each loops further down

let inputArray = []

// Functions

function addToInput(buttonValue) {
  let lastInput = input.innerHTML[(input.innerHTML.length)-1]
  switch (true) {
    case (operatorArray.indexOf(buttonValue.innerHTML)>=0):
      inputArray.push(buttonValue.innerHTML)
      break;
    case (numberArray.indexOf(lastInput) >=0):
      inputArray[(inputArray.length)-1] += buttonValue.innerHTML;
      break;
    default:
      inputArray.push(buttonValue.innerHTML);
  }
  input.innerHTML += buttonValue.innerHTML;
  console.log(inputArray, input.innerHTML);
}

function evaluateInput() {
  if (resultDisplayed === true) {
    console.log(inputArray);
  }
}

function clearInput() {
  input.innerHTML = "";
  inputArray.length = 0;
  resultDisplayed = false;
}


// Click Event Listeners

numbers.forEach(number => {
  number.addEventListener("click", function(event) {
    event.preventDefault();
    console.log(number.innerHTML + " pressed!");
    addToInput(number);
  })
  numberArray.push(number.innerHTML)
})

operators.forEach(operator => {
  operator.addEventListener("click", function(event) {
    event.preventDefault();
    let lastInput = input.innerHTML[(input.innerHTML.length)-1]
    switch(true) {
      case (input.innerHTML === ""):
        console.log("Cannot start with an operator");
        break;
      case (operatorArray.indexOf(lastInput)>=0):
        console.log("Replacing old operator");
        input.innerHTML = input.innerHTML.slice(0, (input.innerHTML.length)-1);
        input.innerHTML += operator.innerHTML;
        inputArray[inputArray.length - 1] = operator.innerHTML;
        break;
      default:
        console.log(operator.innerHTML + " pressed!");
        addToInput(operator);
    }
  })
  operatorArray.push(operator.innerHTML)
})

result.addEventListener("click", function(event) {
  event.preventDefault();
  console.log(result.innerHTML + " pressed!");
  resultDisplayed = true;
  evaluateInput();
})

clear.addEventListener("click", function(event) {
  event.preventDefault();
  console.log(clear.innerHTML + " pressed!");
  clearInput();
})