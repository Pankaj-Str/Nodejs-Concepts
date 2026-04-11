function info(){
    console.log("This is a new basic JavaScript file for the lecture on 11 April 2026.");
}

function add(a, b){
    return a + b;
}

function subtract(a, b){
    return a - b;
}

function multiply(a, b){
    return a * b;
}

// exporting the functions to be used in other files

module.exports = { info, add, subtract, multiply };
