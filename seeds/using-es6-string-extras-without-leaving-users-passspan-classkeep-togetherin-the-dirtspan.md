# Problem

You want to use new ECMAScript 6 features, such as the _string extras_ like startsWith() and endsWith(), but you don’t want your applications to break for people using browsers that don’t support this newer functionality.

# Solution

Use an ECMAScript 6 (or ES 6) _shim_ to provide support for the functionality in browsers not currently implementing it. [Using a shim to enable ES 6 functionality](#demonstrating_use_of_shim) demonstrates how a shim enables support for the new ES 6 String functionality.

Example 7. Using a shim to enable ES 6 functionality

```html
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>ES 6 String</title>
<script type="text/javascript" src="es6-shim.js"></script>
</head>
<body>

<script type="text/javascript">

  // quote from "To Kill a Mockingbird"
  var str = "Mockingbirds don't do one thing except make music " +
  "for us to enjoy. They don't eat up people's gardens, " +
  "don't nest in corn cribs, " +
  "they don’t do one thing but sing their hearts out for us. " +
  "That's why it’s a sin to kill a mockingbird."

  console.log(str.startsWith("Mockingbirds")); // true
  console.log(str.startsWith("autos", 20)); // false

  console.log(str.endsWith("mockingbird.")); // true
  console.log(str.endsWith("kill", str.length-15)); // true

  var cp = str.codePointAt(50); // 102 for 'f'
  var cp2 = str.codePointAt(51); // 111 for 'o'
  var cp3 = str.codePointAt(52); // 114 for 'r'

  var str2 = String.fromCodePoint(cp,cp2,cp3);

  console.log(str2); // for
</script>
</body>
</html>
```

# Discussion

JavaScript (or ECMAScript, the more proper name) is advancing much more rapidly now than in the past, but uneven implementation is still an issue. We do live in better times, as the major browser companies are more ready to embrace new features more quickly, and automated browser upgrades help eliminate some of the bogging down we had with a browser such as IE 6. In addition, until we see complete cross-browser support for a new feature, we can still make use of enhancements in Node.js applications on the server, and via the use of _shims_ in the client. I’ll cover Node.js in a later chapter, but for now, let’s look at shims, JavaScript compatibility, and what they mean for something like the new String object enhancements.

Note

The [shim](https://github.com/paulmillr/es6-shim/) used in the example is the ES6-shim created by Paul Miller. There are other shims and libraries known as _polyfills_, which you’ll see used elsewhere in this book.

The latest formal release of ECMAScript (ES) is ECMAScript 5, and I make use of several ES 5 features throughout the book. Work is underway, though, on the next generation of ES, appropriately named ES.Next (ECMA-262 Edition 6), but commonly referred to as ES 6.

As consensus is reached on new ES features, they’re added to the existing draft specification. They’re also listed in ES compatibility tables, such as the ones Mozilla incorporates in much of its documentation, and the exceedingly helpful [ECMAScript 6 Compatibility Table](http://kangax.github.io/es5-compat-table/es6/).

Among the ES 6 additions are the following new String.prototype methods:

*   startsWith: Returns true if string begins with characters from another string
    
*   endsWith: Returns true if string ends with characters from another string
    
*   contains: Returns true if string contains another string
    
*   repeat: Repeats the string a given number of times and returns the result
    
*   codePointAt: Returns the Unicode code point (unicode number) that starts at the given index
    

Both startsWith() and endsWith() require a string to examine as first parameter, and an optional integer as second parameter. For startsWith(), the integer marks the position in the string to begin the search; for endsWith(), the integer represents the position in the string where the search should terminate.

The contains() method also takes two parameters—search string and optional starting position for search—but it returns true or false depending on whether it found the search string _anywhere_ in the string:

```javascript
console.log(str.contains("gardens")); // true
```

The repeat() method takes a given string and repeats it however many times is given in the only parameter, returning the result:

```javascript
var str2 = 'abc';
console.log(str2.repeat(2)); // abcabc
```

The codePointAt() method returns the UTF-16 encoded code point value for the character found at the position in the string. In addition, there’s also a new _static_ method, fromCodePoint, which returns a string created by a sequence of code points:

```javascript
var cp = str.codePointAt(50); // 102 for 'f'
var cp2 = str.codePointAt(51); // 111 for 'o'
var cp3 = str.codePointAt(52); // 114 for 'r'

var str2 = String.fromCodePoint(cp,cp2,cp3);

console.log(str2); // for
```

At the time of this writing, if I were to access the web page in [Using a shim to enable ES 6 functionality](#demonstrating_use_of_shim) without the use of the ES 6 shim, the JavaScript would fail for all but a developer release of Firefox. With the use of the shim, the JavaScript works for all modern browsers.

# See Also

Another alternative to a shim is a _transpiler_ that compiles tomorrow’s code into today’s environment. Google’s version, Traceur, is introduced in [\[destructuring\_assignment\]](#destructuring_assignment), and demonstrated more fully in [\[creating\_class\_extending\_it\]](#creating_class_extending_it).