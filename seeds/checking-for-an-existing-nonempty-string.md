# Problem

You want to verify that a variable is defined, is a string, and is not empty.

# Solution

The simplest solution when testing for a nonempty string is the following:

```javascript
if (typeof unknownVariable === 'string' && unknownVariable.length > 0)
```

If the variable isn’t a string, the test will fail, and if the string’s length isn’t longer than zero (0), it will fail.

However, if you’re interested in testing for a string, regardless of whether it’s a String object or a string literal, you’ll need a different typeof test, as well as test to ensure the variable isn’t null:

```javascript
if (((typeof unknownVariable != 'undefined' && unknownVariable) &&
    unknownVariable.length() > 0) &&
    typeof unknownVariable.valueOf() == 'string') ...
```

# Discussion

You can use length to find out how long the string is and test whether the string variable is an _empty string_ (zero length):

```javascript
if (strFromFormElement.length == 0) // testing for empty string
```

However, when you’re working with strings and aren’t sure whether they’re set or not, you can’t just check their length, as you’ll get an _undefined_ JavaScript error if the variable has never been set (or even declared). You have to combine the length test with another test for existence and this brings us to the typeof operator.

The JavaScript typeof operator returns the type of a variable. The list of possible returned values are:

*   number if the variable is a number
    
*   string if the variable is a string
    
*   boolean if the variable is a Boolean
    
*   function if the variable is a function
    
*   object if the variable is null, an array, or another JavaScript object
    
*   undefined if the variable is undefined
    

Combining the test for a string and a test on the string length ensures our app knows if the variable is a non-zero length string or not:

```javascript
if (typeof unknownVariable == 'string' && unknownVariable.length > 0) ...
```

However, if you’re looking for a nonempty string regardless of whether the string is a literal or an object, than things get a little more interesting. A string that’s created using the String constructor:

```javascript
var str = new String('test');
```

has a typeof value equal to object not string. We need a more sophisticated test.

First, we need a way to test whether a variable has been defined _and_ isn’t null. The typeof can be used to ensure the variable isn’t undefined:

```javascript
if (typeof unknownVariable != 'undefined')...
```

But it’s not sufficient, because null variables have a typeof value equal to object.

So the defined and not null test is changed to check to see if the variable is defined and isn’t null:

```javascript
if (typeof unknownVariable != 'undefined' && unknownVariable) ...
```

Just listing the variable is sufficient to test whether it’s null or not.

We still don’t know, though, if the variable is a nonempty string. We’ll return the length test, which should allow us to test whether the variable is a string, and is not empty:

```javascript
if ((typeof unknownVariable != 'undefined' && unknownVariable) &&
    unknownVariable.length > 0) ...
```

If the variable is a number, the test fails because a number doesn’t have a length. The String object and string literal variables succeed, because both support length. However, an array also succeeds, because the Array object also supports length.

To finish the test, turn to a little used method, valueOf(). The valueOf() method is available on all JavaScript objects, and returns the primitive (unwrapped) value of the object. For Number, String, and Boolean, valueOf() returns the primitive value. So if the variable is a String object, valueOf() returns a string literal. If the variable is already a string literal, applying the valueOf() method temporarily wraps it in a String object, which means the valueOf() method will still return a string literal.

Our finished test then becomes:

```javascript
if(((typeof unknownVariable != "undefined" && unknownVariable) &&
     (typeof unknownVariable.valueOf() == "string")) &&
```

Now, the test functions without throwing an error regardless of the value and type of the unknown variable, and only succeeds with a nonempty string, regardless of whether the string is a string object or literal.

Note

Our use of valueOf() is limited. The method is primarily used by the JavaScript engine, itself, to handle conversions in instances when a primitive is expected and the engine is given an object.

The process is complex, and normally your application usually won’t have to be this extensive when testing a value. You’ll typically only need to test whether a variable has been set (typeof returns the correct data type), or find the length of a string in order to ensure it’s not an empty string.

# Extra: Loose and Strict Equality Operators

I used _loose equality_ (== and !=) in this section, but I use _strict equality_ (=== and !==) elsewhere in the book. My use of both types of operators is not a typo.

Some folks (Douglas Crockford being the most outspoken) consider the loose equality operators (== and !=) to be evil, and discourage their use. The main reason many developers eschew loose equality operators is that they test primitive values rather than the variable object, in totality, and the results of the test can be unexpected.

For instance, the following code succeeds:

```javascript
var str1 = new String('test');
if (str1 == 'test') { ...}
```

whereas this code fails:

```javascript
var str1 = new String('test');
if (str1 === 'test') { ...}
```

The first code snippet succeeds because the string literal (test) and the primitive value the str1 variable contains are identical. The second code snippet fails the conditional test because the objects being compared are not equivalent, though they both share the same primitive value (test): the str1 variable is a String object, while the compared value is a string literal.

While results of this comparison are relatively intuitive, others are less so. In the following code snippet, a string is compared to a number, and the results may be unexpected:

```javascript
var num = 0;
var str = '0';

console.log(num == str); // true
console.log(num === str); // false
```

In the [Abstract Equality Comparison Algorithm](http://es5.github.io/#x11.9.3), when a string is compared to a number, the _loose equality_ comparison is treated as if the following occurs:

```javascript
console.log(num === toNumber(str));
```

And therein lies the risk of loose equality: not understanding the implicit type conversion.

Sometimes, though, the very nature of the loose equality operator can be useful. For instance, the following code snippet demonstrates how the loose equality operator saves us time and code. The test to see if the variable is "bad" succeeds with standard equality regardless of whether the variable is undefined or null, where it wouldn’t succeed if strict equality had been used:

```javascript
var str1;

if (str1 == null) {
  console.log('bad variable');
}
```

Rather than using the first typeof in the solution, I could shorten the test to the following and get the same result:

```javascript
if ((unknownVariable != null && unknownVariable.length > 0) &&
     typeof unknownVariable.valueOf() == 'string') ...
```

Should you always use strict equality except in these rare instances? Just to ensure you don’t get unexpected results?

I’m going to buck the industry trend and say "No." As long as you’re cognizant of how the equality operators work, and your code is such that you’re either only interested in primitive values or you want the object type coercion I just demonstrated, you can use loose equality operators in addition to strict equality.

Consider the following scenario: in a function, you’re testing to see if a counter is a certain value (100, for example). You’re expecting the counter, passed into the function, to be a number, but the developer who sent the value to your function passed it as a string.

When you perform the test, you _are_ only interested in the value of the variable, not whether it’s a string or number. In this case, strict equality would fail, but not because the value isn’t what you’re testing for, but because the tested value and the function argument are different types. And the failure may be such that the developer using your function thinks that the application generating the value is in error, not that a type conversion hasn’t been made.

You don’t care in your function that the variable is a string and not a number. In this case, what you’re implicitly doing is converting the variable to what you expect and then doing the comparison. The following are equivalent:

```javascript
if (counter == 100) ...

if (parseInt(counter) === 100) ...
```

Note

If the type is critically important, then a first test should be on the type and a relevant error generated. But this is what I mean by being cognizant of your code.

In a more realistic scenario, you may be working with a string, and you don’t care if the person who passed the string value to your function used a String constructor to create the string, or used a string literal—all you care about is the primitive value:

```javascript
var str = 'test';
var str2 = new String('test');

doSomething(str);
doSomething(str2);
...

function doSomething (passedString) {

  if (passedString == 'test')
     ...
}
```

# See Also

For more on the equality operators and their differences, as well as a view from the other side on the issue, I recommend [JS101: Equality](http://dailyjs.com/2012/08/27/equality/). The Mozilla Developer Network has a lovely, in-depth overview of the comparison operators and how they work in their documentation on [comparison operators](http://mzl.la/1z2y92i). And do check out the [Abstract Equality Comparison Algorithm](http://es5.github.io/#x11.9.3), directly.