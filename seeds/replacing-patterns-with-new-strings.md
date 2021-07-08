# Problem

You want to replace all matched substrings with a new substring.

# Solution

Use the String’s replace() method, with a regular expression:

```javascript
var searchString = "Now is the time, this is the tame";
var re = /t\w{2}e/g;
var replacement = searchString.replace(re, "place");
console.log(replacement); // Now is the place, this is the place
```

# Discussion

The solution makes use of a literal regular expression to find target text and replace it. The regular expression pattern is _t\\w{2}e_. This translates into _look for any sequence of characters beginning with 't', ending with 'e', and containing two other alphanumeric characters_. The solution matches 'time', but also matches 'tame'.

The solution also makes use of a global search. Using the global flag (g) with the regular expression in combination with the String replace() method will replace all instances of the matched text with the replacement string. If we didn’t use the global flag, only the first match would trigger a replacement.

The literal regular expression begins and ends with a slash (/). As an alternative, I could have used the built-in RegExp object:

```javascript
var re = new RegExp('t\\w{2}e',"g");
var replacement = searchString.replace(re,"place");
console.log(p);
```

The difference is the surrounding slashes aren’t necessary when using RegExp, but the use of the backslash in the pattern has to be escaped. In addition, the global indicator is a second, optional argument to the RegExp constructor.

You can use a regular expression literal or a RegExp object instance interchangeably. The primary difference is that the RegExp constructor allows you to create the regular expression dynamically.

# Extra: Regular Expression Quick Primer

Regular expressions are made up of characters that are used alone or in combination with special characters. For instance, the following is a regular expression for a pattern that matches against a string that contains the word _technology_ and the word _book_, in that order, and separated by one or more whitespace characters:

```javascript
var re = /technology\s+book/;
```

The backslash character (\\) serves two purposes: either it’s used with a regular character, to designate that it’s a special character, or it’s used with a special character, such as the plus sign (+), to designate that the character should be treated literally. In this case, the backslash is used with 's', which transforms the letter 's' to a special character designating a whitespace character (space, tab, line feed, or form feed). The +\\s+ special character is followed by the plus sign, \\s+, which is a signal to match the preceding character (in this example, a whitespace character) one or more times. This regular expression would work with the following:

```javascript
technology book
```

It would also work with the following:

```javascript
technology     book
```

It would not work with the following, because there is no white space between the words:

```javascript
technologybook
```

It doesn’t matter how much whitespace is between _technology_ and _book_, because of the use of \\s+. However, using the plus sign does require at least one whitespace character.

[Regular expression special characters](#regular_expression_special_characters) shows the most commonly used special characters in JavaScript applications.

Table 2. Regular expression special characters  

Character

Matches

Example

^

Matches beginning of input

/^This/ matches 'This is…​'

$

Matches end of input

/end$/ matches 'This is the end'

\*

Matches zero or more times

/se\*/ matches 'seeee' as well as 'se'

?

Matches zero or one time

/ap?/ matches 'apple' and 'and'

`+`

Matches one or more times

`/ap+/` matches 'apple' but not 'and'

\\{n\\}

Matches exactly _n_ times

/ap\\{2\\}/ matches 'apple' but not 'apie'

\\{n,\\}

Matches _n_ or more times

/ap{2,}/ matches all p’s in 'apple' and 'appple' but not 'apie'

\\{n,m\\}

Matches at least _n_, at most _m_ times

/ap{2,4}/ matches four p’s in 'apppppple'

.

Any character except newline

/a.e/ matches 'ape' and 'axe'

\[...\]

Any character within brackets

/a\[px\]e/ matches 'ape' and 'axe' but not 'ale'

\[^...\]

Any character but those within brackets

/a\[^px\]/ matches 'ale' but not 'axe' or 'ape'

\\b

Matches on word boundary

/\\bno/ matches the first 'no' in 'nono'

\\B

Matches on nonword boundary

/\\Bno/ matches the second 'no' in 'nono'

\\d

Digits from 0 to 9

`/\d{3}/` matches 123 in 'Now in 123'

\\D

Any nondigit character

/\\D{2,4}/ matches 'Now ' in 'Now in 123';

\\w

Matches word character (letters, digits, underscores)

/\\w/ matches 'j' in javascript

\\W

Matches any nonword character (not letters, digits, or underscores)

\\/W/ matches '%' in '100%'

\\n

Matches a line feed

\\s

A single whitespace character

\\S

A single character that is not whitespace

\\t

A tab

(x)

Capturing parentheses

Remembers the matched characters

Note

Regular expressions are powerful but can be tricky. I’m only covering them lightly in this book. If you want more in-depth coverage of regular expressions, I recommend the excellent _[Regular Expressions Cookbook](http://shop.oreilly.com/product/0636920023630.do)_ by Jan Goyvaerts and Steven Levithan (O’Reilly).

# See Also

[Swapping Words in a String Using Capturing Parentheses](#swap_words_in_a_string_using_capturing_p) shows variations of using regular expressions with the String replace method, including the use of _capturing parenthesis_.