import '../node_modules/font-awesome/css/font-awesome.min.css';
import "./custom.scss";

import $ from "jquery";
window.$ = window.jQuery = $;  // make jQuery globally available




$(() => {
    
    setupHandlers();
    clearAll();

});


function setupHandlers() {

    $("#_0").click(() => { addDigit("0"); });
    $("#_1").click(() => { addDigit("1"); });
    $("#_2").click(() => { addDigit("2"); });
    $("#_3").click(() => { addDigit("3"); });
    $("#_4").click(() => { addDigit("4"); });
    $("#_5").click(() => { addDigit("5"); });
    $("#_6").click(() => { addDigit("6"); });
    $("#_7").click(() => { addDigit("7"); });
    $("#_8").click(() => { addDigit("8"); });
    $("#_9").click(() => { addDigit("9"); });

    $("#dot").click(() => { addDigit("."); });

    $("#add").click(() => { execute(add); });
    $("#subtract").click(() => { execute(subtract) });
    $("#multiply").click(() => { execute(multiply) });
    $("#divide").click(() => { execute(divide) });
    $("#to-percent").click(() => { toPercent() });

    $("#calculate-result").click(() => { calculateResult(); });

    $("#all-clear").click(() => { clearAll(); });
    $("#clear-entry").click(() => { clearEntry(); });

}


let operationExecuted;
let resultCalculated;
let currentInput;
let nextOperation;
let firstOperand;
let secondOperand;


function add(a, b) { return a + b; }
function subtract(a, b) { return a - b; }
function multiply(a, b) { return a * b; }
function divide(a, b) { return b === 0 ? 0 : a / b; }


function calculateResult() {
    execute(add);
    displayResult(firstOperand);
    resultCalculated = true;
}

function clearAll() {
    firstOperand = 0.0;
    secondOperand = 0.0;

    nextOperation = add;
    currentInput = "0";

    operationExecuted = true;

     displayResult(currentInput)
}

function clearEntry() {
    if (operationExecuted) {
        clearAll();
    }
    else {
        currentInput = "0";
        displayResult(currentInput)
    }
}

function execute(operation) {
    if (resultCalculated) {
        resultCalculated = false;
    }

    if (operationExecuted) {
        nextOperation = operation;
    }
    else {
        secondOperand = currentInput ? parseFloat(currentInput) : 0.0
        firstOperand = nextOperation(firstOperand, secondOperand);

        nextOperation = operation;
        currentInput = "";

        operationExecuted = true;

        displayResult(firstOperand);
    }
}


function addDigit(digit) {

    if (resultCalculated) {
        clearAll();
        resultCalculated = false;
    }
    currentInput = currentInput === "0" ? digit : currentInput + digit;
    operationExecuted = false;

    displayResult(currentInput);
}

function toPercent() {
    currentInput = parseFloat($("#display").text()) / 100;
    operationExecuted = false;
    displayResult(currentInput);
}


function displayResult(result) {
    $("#display").text(result);
}