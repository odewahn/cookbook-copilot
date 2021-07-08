# Problem

You have a string with several sentences, one of which includes a list of items. The list begins with a colon (:) and ends with a period (.), and each item is separated by a comma. You want to extract just the list.

Before:

```javascript
This is a list of items: cherries, limes, oranges, apples.
```

After:

```javascript
['cherries','limes','oranges','apples']
```

# Solution

The solution requires two actions: extract out the string containing the list of items, and then convert this string into a list.

Use String’s indexOf() to locate the colon, and then use it again to find the first period following the colon. With these two locations, extract the string using String’s substring():

```javascript
var sentence = 'This is one sentence. This is a sentence with a list of items:' +
'cherries, oranges, apples, bananas. That was the list of items.';
var start = sentence.indexOf(':');
var end = sentence.indexOf('.', start+1);

var listStr = sentence.substring(start+1, end);
```

Once you have the string consisting of the list items, use the String split() to break the string into an array:

```javascript
var fruits = listStr.split(',');
console.log(fruits); // ['cherries', ' oranges', ' apples', ' bananas']
```

# Discussion

The indexOf() method takes a search value, as first parameter, and an optional beginning index position, as second.

The list is delimited by a beginning colon character and an ending period. The indexOf() method is used without the second parameter in the first search, to find the colon. The method is used again but the colon’s position (plus _1_) is used to modify the beginning location of the search for the period:

```javascript
var end = sentence.indexOf('.',start+1);
```

If we didn’t modify the search for the ending period, we’d end up with the location of the first sentence’s period rather than the period for the sentence containing the list.

Once we have the beginning and ending location for the list, we’ll use the substring() method, passing in the two index values representing the beginning and ending positions of the string:

```javascript
var listStr = sentence.substring(start+1, end);
```

The extracted string is:

```javascript
cherries, oranges, apples, bananas
```

We’ll finish by using split() to split the list into its individual values:

```javascript
var fruits = listStr.split(',') ; // ['cherries', ' oranges',
             ' apples', ' bananas']
```

There is another string extraction method, substr(), that begins extraction at an index position marking the start of the substring and passing in the length of the substring as the second parameter. We can easily find the length just by subtracting the beginning position of the string from the end position:

```javascript
var listStr = sentence.substr(start+1, end-start);

var fruits = listStr.split(',');
```

# See Also

Another way to extract the string is to use regular expressions and the RegExp object, covered beginning in [Replacing Patterns with New Strings](#replacing_patterns_with_new_strings).

# Advanced

The result of splitting the extracted string is an array of list items. However, the items come with artifacts (leading spaces) from sentence white space. In most applications, we’ll want to clean up the resulting array elements.

We’ll discuss the Array object in more detail in [\[javascript\_arrays\]](#javascript_arrays), but for now, we’ll use the Array forEach() method in addition to the String object’s trim() method to clean up the array:

```javascript
fruits = listStr.split(',');

console.log(fruits); // [' cherries', ' oranges', ' apples', ' bananas']

fruits.forEach(function(elmnt,indx,arry) {
               arry[indx] = elmnt.trim();
});

console.log(fruits); // ['cherries', 'oranges', 'apples", "bananas"]
```

The forEach() method applies the function passed as parameter (the _callback_) to each array element. The callback function supports three arguments: the array element value, and optionally, the array element index and the array itself.

Another simpler approach is to pass a regular expression to the split() that trims the result before it’s returned:

```javascript
var fruits = listStr.split(/\s*,\s*/);
```

Now the matching returned value is just the string without the surrounding white space.

Note

The forEach() method is also covered in [\[applying\_a\_function\_against\_each\_array\_e\]](#applying_a_function_against_each_array_e). The code in this section _mutates the array in place_, which means it actually modifies the array as it’s traversed. Another nondestructive approach is to use the newer map() Array method, covered in [\[applying\_a\_function\_to\_every\_element\_in\]](#applying_a_function_to_every_element_in).

# Extra: Simplifying the Code Using Chaining

The example code in this recipe is correct, but a little verbose. We can compress the code by using JavaScript’s _method chaining_, allowing us to attach one method call to the end of a previous method call if the object and methods allow it. In this case, we can _chain_ the split() method directly to the substring() method:

```javascript
var start = sentence.indexOf(":");
var end = sentence.indexOf(".", start+1);

var fruits = sentence.substring(start+1, end).split(",");
```

The code isn’t more accurate, but it uses less space and can be easier to read. I’ll cover method chaining in more detail in [\[chaining\_your\_objectapostrophes\_methods\]](#chaining_your_objectapostrophes_methods).