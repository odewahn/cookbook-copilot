# Problem

You have a decimal value, and need to find its hexadecimal equivalent.

# Solution

Use the Number toString() method:

```javascript
var num = 255;

// displays ff, which is hexadecimal equivalent for 255
console.log(num.toString(16));
```

# Discussion

By default, numbers in JavaScript are base 10, or decimal. However, they can also be converted to a different _radix_, including hexadecimal (16) and octal (8). Hexadecimal numbers begin with 0x (a zero followed by lowercase x), and octal numbers always begin with zero:

```javascript
var octoNumber = 0255; // equivalent to 173 decimal
var hexaNumber = 0xad; // equivalent to 173 decimal
```

A decimal number can be converted to another radix, in a range from 2 to 36:

```javascript
var decNum = 55;
var octNum = decNum.toString(8); // value of 67 octal
var hexNum = decNum.toString(16); // value of 37 hexadecimal
var binNum = decNum.toString(2); // value of 110111 binary
```

To complete the octal and hexadecimal presentation, you’ll need to concatenate the zero to the octal, and the 0x to the hexadecimal value.

Although decimals can be converted to any base number (between a range of 2 to 36), only the octal, hexadecimal, and decimal numbers can be manipulated, directly as numbers. In addition, when using JavaScript _strict mode_, only decimal and hexadecimal literals are supported, as octal integers are no longer supported in JavaScript.

# Extra: Speaking of Strict Mode

Strict mode is an ECMAScript 5 addition that signals the use of a more restricted version of the JavaScript language. Strict mode can be implemented for an entire script or only for a function. Triggering is simple:

```javascript
'use strict';
```

or:

```javascript
"use strict";
```

This code should be the first line in your script block or function.

When strict mode is engaged, a mistake that would normally be ignored now generates an error. What kind of mistake?

*   Typos in variable names in assignment throw an error.
    
*   Assignments that would normally fail quietly now throw an error.
    
*   Attempting to delete an undeletable property fails.
    
*   Using nonunique property names.
    
*   Using nonunique function parameter names.
    

Strict mode also triggers other requirements:

*   Octals aren’t supported in strict mode.
    
*   The eval() statement is limited, and with is not supported.
    
*   When constructing a new object, new is required for this to function correctly.
    

Bottom line: strict mode helps eliminate unexpected and unexplainable results.