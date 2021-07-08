# Problem

People toss around terms like 'object', 'primitive', and 'literal'. What is the difference between the three, and how can you tell which is which?

# Solution

A JavaScript _literal_ represents a value of a specific type, such as a quoted string (String), floating-point number (Number), or boolean (Boolean):

```javascript
"this is a string"
1.45
true
```

A JavaScript _primitive_ is an instance of a particular _data type_, and there are five such in the language: String, Number, Boolean, null, and undefined. The following are examples of JavaScript primitives:

```javascript
"this is a string"
null
```

Of the primitive data types, three have complementary _constructor objects_: String, Number, and Boolean. These objects provide access to the built-in properties and methods that allow us to do more than simple assignment and subsequent access:

```javascript
var str1 = "this is a string";
console.log(str1.length); // using String object's length property
```

Note

Many of the examples in this book use the console.log() function to display JavaScript results. [\[console-your-friend\]](#console-your-friend) provides a quick how-to on accessing the JavaScript console in modern browers, and [\[appendix\_a\]](#appendix_a) also provides directions for setting up your environment and running the code snippets found in the solutions.

# Discussion

It may seem as if we’re working with simple strings or numbers when we declare a variable:

```javascript
var str1 = "this is a simple string";
```

However, we’re actually creating doorways into an extensive set of functionality. Without reliance on JavaScript objects, we can assign a string, number, or boolean value to a variable and then access it at a later time. However, if we want to do more with the variable, we’ll need to use the data type’s complementary JavaScript object and its properties.

As an example, if we want to see the length of a string, we’ll access the String object’s length property:

```javascript
var str1 = "this is a simple string";
console.log(str1.length); // prints out 23 to browser console
```

Behind the scenes, when the code accesses a String object’s property on the literal, a new String object is created and its value is set to the value of the string contained in the variable. The length property is accessed and printed out, and the newly created String object is discarded.

Note

JavaScript engines don’t have to actually create an object to wrap the primitive when you access object properties; they only have to emulate this type behavior.

There are exactly five _primitive_ data types in JavaScript: string, number, boolean, null, and undefined. Only the string, number, and boolean data types have complementary constructor objects. The actual representation of strings, floating-point numbers, integers, and booleans are _literals_:

```javascript
var str1 = "this is a simple string"; // the quoted string is the literal

var num1 = 1.45; // the value of 1.45 is the literal

var answer = true; // the values of true and false are boolean literals
```

We can create primitive boolean, string, and number variables either by using a literal representation or using the object without using the new operator:

```javascript
var str1 = String("this is a simple string"); // primitive string

var num1 = Number(1.45); // primitive number

var bool1 = Boolean(true); // primitive boolean
```

To deliberately instantiate an object, use the new operator:

```javascript
var str2 = new String("this is a simple string"); // String object instance

var num2 = new Number(1.45); // Number object instance

var bool2 = new Boolean(true); // primitive boolean
```

You can quickly tell the difference between a primitive and an object instance when you compare an object instance to a literal value using _strict equality_. For example, running the following code in a browser:

```javascript
var str1 = String("string");
var num1 = Number(1.45);
var bool1 = Boolean(true);

if (str1 === "string") {
  console.log('equal');
}

if (num1 === 1.45) {
  console.log('equal');
}

if (bool1 === true) {
  console.log('equal');
}

var str2 = new String("string");
var num2 = new Number(1.45);
var bool2 = new Boolean(true);

if (str2 === "string") {
  console.log('equal');
} else {
  console.log('not equal');
}

if (num2 === 1.45) {
  console.log('equal');
} else {
  console.log('not equal');
}

if (bool2 === true) {
  console.log('equal');
} else {
  console.log('not equal');
}
```

Results in the following print outs to the console:

```javascript
equal
equal
equal
not equal
not equal
not equal
```

The primitive variables (those not created with new) are strictly equal to the literals, while the object instances are not. Why are the primitive variables strictly equal to the literals? Because primitives are compared by value, and values _are_ literals.

For the most part, JavaScript developers don’t directly create object instances for the three primitive data types. Developers just want a number, boolean, or string variable to act like a number, boolean, or string, rather than an object; we don’t need the enhanced functionality of the object. More importantly, when developers use _strict equality_ or type checking in the code, they want a variable to match their expectations of data type, rather than be defined as "object":

```javascript
var num1 = 1.45;

var num2 = new Number(1.45);

console.log(typeof num1); // prints out number
console.log(typeof num2); // prints out object
```

Code validators, such as JSHint, output a warning if you instantiate a primitive data type object directly for just this reason.

# See Also

[Checking for an Existing, Nonempty String](#checking_existing_nonempty_string) has a more detailed look at the _strict equality_ operators, as compared to the standard equality operators.