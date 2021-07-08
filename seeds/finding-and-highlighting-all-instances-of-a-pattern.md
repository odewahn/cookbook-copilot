# Problem

You want to find all instances of a pattern within a string.

# Solution

Use the RegExp exec method and the global flag (g) in a loop to locate all instances of a pattern, such as any word that begins with _t_ and ends with _e_, with any number of characters in between:

```javascript
var searchString = "Now is the time and this is the time and that is the time";
var pattern = /t\w*e/g;
var matchArray;

var str = "";

// check for pattern with regexp exec, if not null, process
while((matchArray = pattern.exec(searchString)) != null) {
  str+="at " + matchArray.index + " we found " + matchArray[0] + "\n";
}
console.log(str);
```

The results are:

```javascript
at 7 we found the
at 11 we found time
at 28 we found the
at 32 we found time
at 49 we found the
at 53 we found time
```

# Discussion

The RegExp exec() method executes the regular expression, returning null if a match is not found, or an object with information about the match, if found. Included in the returned array is the actual matched value, the index in the string where the match is found, any parenthetical substring matches, and the original string:

*   index: The index of the located match
    
*   input: The original input string
    
*   \[0\]: The matched value
    
*   \[1\],…​,\[n\]+: Parenthesized substring matches, if any
    

The parentheses _capture_ the matched values. Given a regular expression like that in the following code snippet:

```javascript
var re = /a(p+).*(pie)/ig;
var result = re.exec("The apples in the apple pie are tart");
console.log(result);
console.log(result.index);
console.log(result.input);
```

the resulting output is:

```javascript
["apples in the apple pie", "pp", "pie"]
4
"The apples in the apple pie are tart"
```

The array results contain the complete matched value at index zero (0), and the rest of the array entries are the parenthetical matches. The index is the index of the match, and the input is just a repeat of the string being matched. In the solution, the index where the match was found is printed out in addition to the matched value.

The solution also uses the global flag (g). This triggers the RegExp object to preserve the location of each match, and to begin the search after the previously discovered match. When used in a loop, we can find all instances where the pattern matches the string. In the solution, the following are printed out:

```javascript
at 7 we found the
at 11 we found time
at 28 we found the
at 32 we found time
at 49 we found the
at 53 we found time
```

Both _time_ and _the_ match the pattern.

Let’s look at the nature of global searching in action. In [Using exec and global flag to search and highlight all matches in a text string](#using_exec_and_global_flag_to_search_and), a web page is created with a textarea and an input text box for accessing both a search string and a pattern. The pattern is used to create a RegExp object, which is then applied against the string. A result string is built, consisting of both the unmatched text and the matched text, except the matched text is surrounded by a span element (with a CSS class used to highlight the text). The resulting string is then inserted into the page, using the `innerHTML` for a div element.

Example 1. Using exec and global flag to search and highlight all matches in a text string

```html
<!DOCTYPE html>
<html>
<head>
<title>Searching for strings</title>
<style>
.found
{
  background-color: #ff0;
}
</style>

</head>
<body>
  <form id="textsearch">
    <textarea id="incoming" cols="150" rows="10">
    </textarea>
   <p>
     Search pattern: <input id="pattern" type="text" />
   </p>
  </form>
  <button id="searchSubmit">Search for pattern</button>
  <div id="searchResult"></div>

<script>

  document.getElementById("searchSubmit").onclick=function() {

    // get pattern
    var pattern = document.getElementById("pattern").value;
    var re = new RegExp(pattern,"g");

    // get string
    var searchString = document.getElementById("incoming").value;

    var matchArray;
    var resultString = "<pre>";
    var first=0;
    var last=0;

    // find each match
    while((matchArray = re.exec(searchString)) != null) {
      last = matchArray.index;

      // get all of string up to match, concatenate
      resultString += searchString.substring(first, last);

      // add matched, with class
      resultString += "<span class='found'>" + matchArray[0] + "</span>";
      first = re.lastIndex;
    }

    // finish off string
    resultString += searchString.substring(first,searchString.length);
    resultString += "</pre>";

    // insert into page
    document.getElementById("searchResult").innerHTML = resultString;
 }

</script>
</body>
</html>
```

[Application finding and highlighting all matched strings](#application_finding_and_highlighting_all) shows the application in action on William Wordsworth’s poem, "The Kitten and the Falling Leaves" after a search for the following pattern:

```javascript
lea(f|ves)
```

The bar (|) is a conditional test, and will match a word based on the value on either side of the bar. So _leaf_ matches, as well as _leaves_, but not _leap_.

![jscb 0102](images/jscb_0102.png)

Figure 2. Application finding and highlighting all matched strings

You can access the last index found through the RegExp’s lastIndex property. The lastIndex property is handy if you want to track both the first and last matches.

# See Also

[Replacing Patterns with New Strings](#replacing_patterns_with_new_strings) describes another way to do a standard find-and-replace behavior, and [Swapping Words in a String Using Capturing Parentheses](#swap_words_in_a_string_using_capturing_p) provides a simpler approach to finding and highlighting text in a string.