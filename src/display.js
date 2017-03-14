import $ from "jquery";
// import numeral from "numeral";

export class Display {

    constructor(number) {
        this.number = number;
    }

    /**
     * Updates the display and shorten the output to avoid overflowing the display area
     * @param {any} newNumber newNumber to display
     * @memberOf Display
     */
    update(newNumber) {
        this.number = newNumber;
        let rounded = this.roundNumber(parseFloat(newNumber), 5);
        $("#display").text(rounded > 999999999 ? rounded.toExponential(9) : rounded);
    }

    /**
     * Utility function to round the number
     * @param {number} num number to round
     * @param {number} dec number of decimals to round to
     * @returns rounded number
     * @memberOf Display
     */
    roundNumber(num, dec) {
        return Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
    }
}

