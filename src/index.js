import '../node_modules/font-awesome/css/font-awesome.min.css';
import "./custom.scss";

import $ from "jquery";
window.$ = window.jQuery = $;  // make jQuery globally available




$(() => {
    
    setupHandlers();
    clearAll();

});

function setupHandlers() {

    $("#_0").click(() => { addDigit(0); });
    $("#_1").click(() => { addDigit(1); });
    $("#_2").click(() => { addDigit(2); });
    $("#_3").click(() => { addDigit(3); });
    $("#_4").click(() => { addDigit(4); });
    $("#_5").click(() => { addDigit(5); });
    $("#_6").click(() => { addDigit(6); });
    $("#_7").click(() => { addDigit(7); });
    $("#_8").click(() => { addDigit(8); });
    $("#_9").click(() => { addDigit(9); });

    $("#dot").click(() => { addDigit("."); });

    $("#add").click(() => { execute(add); });
    $("#subtract").click(() => { execute(subtract) });
    $("#multiply").click(() => { execute(multiply) });
    $("#divide").click(() => { execute(divide) });

    $("#calculate-result").click(() => { calculateResult(); });

    $("#clear-all").click(() => { clearAll(); });
    $("#clear-entry").click(() => { clearEntry(); });

}

let awaitingInput;
let currentInput;
let lastOperation;
let firstOperand;
let secondOperand;

function add(a, b) { return a + b; }
function subtract(a, b) { return a - b; }
function multiply(a, b) { return a * b; }
function divide(a, b) { return a / b; }

function calculateResult() {
    execute(add);
    
    awaitingInput = false;
    $("#display").text(firstOperand);
}

function clearAll() {
    firstOperand = 0.0;
    secondOperand = 0.0;

    lastOperation = add;
    currentInput = "";

    awaitingInput = true;

     $("#display").text(currentInput)
}

function clearEntry() {
    currentInput = "";
    $("#display").text(currentInput)
}

function execute(operation) {
    if (awaitingInput) {
        lastOperation = operation;
    }
    else {
        secondOperand = currentInput ? parseFloat(currentInput) : 0.0
        firstOperand = Math.round(lastOperation(firstOperand, secondOperand) * 10) / 10;

        lastOperation = operation;
        currentInput = "";

        awaitingInput = true;

        $("#display").text(firstOperand);
    }
}


function addDigit(digit) {
    currentInput += digit;

    awaitingInput = false;

    $("#display").text(currentInput);
}