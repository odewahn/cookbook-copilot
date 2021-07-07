/*
javascript-cookbook-2e-ch01
You have a decimal value, and need to find its hexadecimal equivalent.
*/
function decimalToHex(d) {
  return d.toString(16);
}

console.log("Print test value for Converting a Decimal to a Hexadecimal Value");
console.log(decimalToHex(255));
console.log(decimalToHex(25));
console.log(decimalToHex(12345));
console.log(decimalToHex(0));
console.log(decimalToHex(-1));
console.log(decimalToHex(1000));
console.log(decimalToHex(0xff));
console.log(decimalToHex(0xf0f0));
console.log(decimalToHex(0xf0f0f0));
