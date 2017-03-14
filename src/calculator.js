import "./calculator.scss";
import {Display} from "./display";
import $ from "jquery";


/**
 * A basic calculator that supports the four basic arithmetic operations
 * @class Calculator
 */
export default class Calculator {

    /**
     * Creates an instance of Calculator.
     * @memberOf Calculator
     */
    constructor() {
        this.display = new Display(0);

        this.clearAll();
        this.setupHandlers();
    }

    /**
     * calculates result for last user input and displays the result
     * @memberOf Calculator
     */
    calculateResult() {
        this.execute(add);
        this.display.update(this.firstOperand);
        this.resultCalculated = true;  // setting resultCalculated to true, allows to enter input a new number
    }

    /**
     * Initialize calculator variables, reset user input and display
     * @memberOf Calculator
     */
    clearAll() {
        this.firstOperand = 0.0;
        this.secondOperand = 0.0;

        this.nextOperation = add;
        this.currentInput = "0";

        this.operationExecuted = true;

        this.display.update(this.currentInput)
    }

    /**
     * Reset latest user input, while hes building up the formula
     * @memberOf Calculator
     */
    clearEntry() {
        if (this.operationExecuted) {
            this.clearAll();
        }
        else {
            this.currentInput = "0";
            this.display.update(this.currentInput)
        }
    }


    /**
     * Executes add/subtract/multiply/divide operations
     * 
     * @param {any} operation e.g. add
     * 
     * @memberOf Calculator
     */
    execute(operation) {
        if (this.resultCalculated) {
            this.resultCalculated = false;
        }

        if (this.operationExecuted) { // repeatingly executing an operation, without adding new operands, will not cause a recalculation
            this.nextOperation = operation;
        }
        else {
            this.secondOperand = this.currentInput ? parseFloat(this.currentInput) : 0.0
            this.firstOperand = this.nextOperation(this.firstOperand, this.secondOperand);

            this.nextOperation = operation;
            this.currentInput = "";

            this.operationExecuted = true;

            this.display.update(this.firstOperand);
        }
    }

    /**
     * Add a digit to the display
     * @param {any} digit digit will be added to the current number
     * 
     * @memberOf Calculator
     */
    addDigit(digit) {

        if (this.resultCalculated) { // after hitting the calculate button, we clear the input and await new input
            this.clearAll();
            this.resultCalculated = false;
        }
        this.currentInput = this.currentInput === "0" ? digit : this.currentInput + digit;
        this.operationExecuted = false;

        this.display.update(this.currentInput);
    }

    /**
     * Initiliaze the click handlers for all calculator buttons
     * @memberOf Calculator
     */
    setupHandlers() {

        $("#_0").click(() => { this.addDigit("0"); });
        $("#_1").click(() => { this.addDigit("1"); });
        $("#_2").click(() => { this.addDigit("2"); });
        $("#_3").click(() => { this.addDigit("3"); });
        $("#_4").click(() => { this.addDigit("4"); });
        $("#_5").click(() => { this.addDigit("5"); });
        $("#_6").click(() => { this.addDigit("6"); });
        $("#_7").click(() => { this.addDigit("7"); });
        $("#_8").click(() => { this.addDigit("8"); });
        $("#_9").click(() => { this.addDigit("9"); });

        $("#dot").click(() => { this.addDigit("."); });

        $("#add").click(() => { this.execute(add); });
        $("#subtract").click(() => { this.execute(subtract) });
        $("#multiply").click(() => { this.execute(multiply) });
        $("#divide").click(() => { this.execute(divide) });
        $("#to-percent").click(() => { this.toPercent() });

        $("#calculate-result").click(() => { this.calculateResult(); });

        $("#all-clear").click(() => { this.clearAll(); });
        $("#clear-entry").click(() => { this.clearEntry(); });

    }

}


function add(a, b) { return a + b; }
function subtract(a, b) { return a - b; }
function multiply(a, b) { return a * b; }
function divide(a, b) { return b === 0 ? 0 : a / b; }


