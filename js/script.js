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
  let lastInput = input.innerHTML[input.innerHTML.length-1];
  let lastArrayEntry = inputArray[(inputArray.length)-1] || "";
  let buttonText = buttonValue.innerHTML;
  switch (true) {
    case (operatorArray.indexOf(buttonText)>=0):
      inputArray.push(buttonText);
      input.innerHTML += buttonText;
      console.log("case1 " + buttonText)
      break;
    case (buttonText === "."):
      switch (true) {
        case (lastArrayEntry.indexOf(".")>=0):
          console.log("Existing decimal " + buttonText);
          break;
        case (operatorArray.indexOf(lastInput)<0):
          console.log("Adding to number...");
          inputArray[(inputArray.length)-1] += buttonText;
          input.innerHTML += buttonText;
          break;
        default:
          console.log("default subcase " + buttonText);
          inputArray.push(buttonText);
          input.innerHTML += buttonText;
      }
      break;
    case (numberArray.indexOf(lastInput)>=0):
      inputArray[(inputArray.length)-1] += buttonText;
      input.innerHTML += buttonText;
      console.log("case4 " + buttonText)
      break;
    case (buttonValue === clear):
      console.log("case5 " + buttonText)
      break;
    default:
      console.log("caseDefault")
      inputArray.push(buttonText);
      input.innerHTML += buttonText;
  }
  console.log(inputArray, input.innerHTML);
}

function operatorCalc(num1, operator, num2) {
  switch (operator) {
    case "*":
      return parseFloat(num1 * num2);
    case "/":
      return parseFloat(num1 / num2);
    case "+":
      return parseFloat(+num1 + +num2);
    case "-":
      return parseFloat(num1 - num2);
  } 
}

function evaluateInput() {
  while (inputArray.indexOf("*")>=0) {
    let tempIndex = inputArray.indexOf("*");
    let operatorResult = operatorCalc(inputArray[tempIndex-1], inputArray[tempIndex], inputArray[tempIndex+1]);
    inputArray.splice(tempIndex-1, 3, operatorResult)
  }
  while (inputArray.indexOf("/")>=0) {
    let tempIndex = inputArray.indexOf("/");
    let operatorResult = operatorCalc(inputArray[tempIndex-1], inputArray[tempIndex], inputArray[tempIndex+1]);
    inputArray.splice(tempIndex-1, 3, operatorResult)
  }
  while (inputArray.indexOf("+")>=0) {
    let tempIndex = inputArray.indexOf("+");
    let operatorResult = operatorCalc(inputArray[tempIndex-1], inputArray[tempIndex], inputArray[tempIndex+1]);
    inputArray.splice(tempIndex-1, 3, operatorResult)
  }
  while (inputArray.indexOf("-")>=0) {
    let tempIndex = inputArray.indexOf("-");
    let operatorResult = operatorCalc(inputArray[tempIndex-1], inputArray[tempIndex], inputArray[tempIndex+1]);
    inputArray.splice(tempIndex-1, 3, operatorResult)
  } 
  input.innerHTML = inputArray[0];
}

function clearInput() {
  input.innerHTML = "";
  inputArray.length = 0;
}


// Event Listeners

numbers.forEach(number => {
  number.addEventListener("click", function(event) {
    event.preventDefault();
    console.log(number.innerHTML + " pressed!");
    if (resultDisplayed === true) {
      clearInput();
      addToInput(number);
      resultDisplayed = false;
    } else {
      addToInput(number);
    }
  })
  numberArray.push(number.innerHTML);
})

operators.forEach(operator => {
  operator.addEventListener("click", function(event) {
    event.preventDefault();
    let lastInput = input.innerHTML[(input.innerHTML.length)-1];
    resultDisplayed = false;
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
  console.log("Result is " + input.innerHTML);
})

clear.addEventListener("click", function(event) {
  event.preventDefault();
  console.log(clear.innerHTML + " pressed!");
  clearInput();
  resultDisplayed = false;
})