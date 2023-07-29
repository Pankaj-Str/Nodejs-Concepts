// Operator 	Description
// == 	        equal to
console.log(78 == 88)
// === 	        equal value and equal type
const num = 0;
const obj = new String("0");
const str = "0";

console.log(num === num); // true
console.log(obj === obj); // true
console.log(str === str); // true

// != 	        not equal
console.log(78 != 88)
// !== 	        not equal value or not equal type

console.log(78 !== 88)
// > 	        greater than

console.log(78 > 88)
// < 	        less than

console.log(78 < 88)
// >= 	        greater than or equal to

console.log(78 >= 88)
// <= 	        less than or equal to
console.log(78 <= 88)
// ? 	        ternary operator
const age = 26;
const beverage = age >= 21 ? "Beer" : "Juice";
console.log(beverage); // "Beer"
