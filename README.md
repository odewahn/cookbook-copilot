Converting a Decimal to a Hexadecimal Value

```
/*
You have a decimal value, and need to find its hexadecimal equivalent.
*/
function

console.log("Print test value for Converting a Decimal to a Hexadecimal Value")
```

```
/*
You have a decimal value, and need to find its hexadecimal equivalent.
*/
function toHex(d) {
  var hex = Number(d).toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

console.log("Print test value for Converting a Decimal to a Hexadecimal Value");
console.log(toHex(255));
console.log(toHex(25));
console.log(toHex(15));
console.log(toHex(10));
console.log(toHex(5));
console.log(toHex(2));
console.log(toHex(1));
console.log(toHex(0));
console.log(toHex(-1));
```
