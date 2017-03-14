import '../node_modules/font-awesome/css/font-awesome.min.css';
import "./custom.scss";
import Calculator from "./calculator.js";

import $ from "jquery";
window.$ = window.jQuery = $;  // make jQuery globally available



$(() => {
    
    new Calculator();

});