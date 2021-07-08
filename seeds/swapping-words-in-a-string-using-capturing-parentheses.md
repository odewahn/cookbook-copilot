# Problem

You want to accept an input string with first and last name, and swap the names so the last name is first.

# Solution

Use _capturing parentheses_ and a regular expression to find and remember the two names in the string, and reverse them:

```javascript
var name = "Abe Lincoln";
var re = /^(\w+)\s(\w+)$/;
var newname = name.replace(re,"$2, $1");
```

# Discussion

Capturing parentheses allow us to not only match specific patterns in a string, but to reference the matched substrings at a later time. The matched substrings are referenced numerically, from left to right, as represented by $1 and $2 in the replace() method.

In the solution, the regular expression matches two words separated by a space. Capturing parentheses were used with both words, so the first name is accessible using $1, the last name with $2.

The capturing parentheses aren’t the only special characters available with replace(). [String.replace special patterns](#stringdotreplace_special_patterns) shows the other special characters that can be used with regular expressions and String replace().

Table 3. String.replace special patterns  

Pattern

Purpose

`$$`

Allows a literal dollar sign ($) in replacement

`$&`

Inserts matched substring

$\`

Inserts portion of string before match

$'

Inserts portion of string after match

$\_\_n\_\_

Inserts _n_ th captured parenthetical value when using RegExp

The second pattern, which reinserts the matched substring, can be used to provide a simplified version of the [Using exec and global flag to search and highlight all matches in a text string](#using_exec_and_global_flag_to_search_and) application shown in [Finding and Highlighting All Instances of a Pattern](#finding_and_highlighting_all_instances_o). That example found and provided markup and CSS to highlight the matched substring. It used a loop to find and replace all entries, but in [Using String.replace and special pattern to find and highlight text in a string](#using_stringdotreplace_and_special_patte) we’ll use replace() with the matched substring special pattern ($&).

Example 2. Using String.replace and special pattern to find and highlight text in a string

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
    <textarea id="incoming" cols="100" rows="10">
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

    // replace
    var resultString = searchString.replace(re,"<span class='found'>$&</span>");

    // insert into page
    document.getElementById("searchResult").innerHTML = resultString;
 }

</script>
</body>
</html>
```

This is a simpler alternative, but the result isn’t quite the same: the line feeds aren’t preserved with [Using String.replace and special pattern to find and highlight text in a string](#using_stringdotreplace_and_special_patte), but they are with [Using exec and global flag to search and highlight all matches in a text string](#using_exec_and_global_flag_to_search_and).

The captured text can also be accessed via the RegExp object using the exec() method. Let’s return to the [Swapping Words in a String Using Capturing Parentheses](#swap_words_in_a_string_using_capturing_p) solution code, this time using exec():

```javascript
var name = "Abe Lincoln";
var re = /^(\w+)\s(\w+)$/;
var result = re.exec(name);
var newname = result[2] + ", " + result[1];
```

This approach is handy if you want to access the capturing parentheses values, but without having to use them within a string replacement.