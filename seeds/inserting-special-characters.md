# Problem

You want to insert a special character, such as a line feed, into a string.

# Solution

Use one of the _escape sequences_ in the string. For instance, to include the copyright symbol in a block of text to be added to the page (shown in [Using an escape sequence to create the copyright symbol](#page_demonstrating_use_of_escape_sequenc)), use the escape sequence \\u00A9:

```javascript
var resultString = "<p>This page \u00A9 Shelley Powers </p>";

// print out to page
 var blk = document.getElementById("result");
 blk.innerHTML = resultString;
```

![jscb 0101](images/jscb_0101.png)

Figure 1. Using an escape sequence to create the copyright symbol

# Discussion

The escape sequences in JavaScript all begin with the _backslash character_, (\\). This character signals the application processing the string that what follows is a sequence of characters that need special handling. [Escape sequences](#escape_sequences) lists the other escape sequences.

Table 1. Escape sequences  

Sequence

Character

\\'

Single quote

\\"

Double quote

\\\\

Backslash

\\b

Backspace

\\f

Form feed

\\n

Newline

\\r

Carriage return

\\t

Horizontal tab

\\ddd

Octal sequence (3 digits: _ddd_)

\\xdd

Hexadecimal sequence (2 digits: _dd_)

\\udddd

Unicode sequence (4 hex digits: _dddd_)

The last three escape sequences in [Escape sequences](#escape_sequences) are patterns, where providing different numeric values will result in differing escape sequences. The copyright symbol in the solution is an example of the Unicode sequence pattern.

The escape sequences listed in [Escape sequences](#escape_sequences) can also be represented as a _Unicode sequence_. Unicode is a computing standard for consistent encoding, and a Unicode sequence is a specific pattern for a given character. For instance, the horizontal tab (\\t), can also be represented as the Unicode escape sequence, \\u0009. Of course, if the user agent disregards the special character, as browsers do with the horizontal tab, the use is moot.

One of the most common uses of escape sequences is to include double or single quotes within strings delimited by the same character:

```javascript
var newString = 'You can\'t use single quotes ' +
                'in a string surrounded by single quotes.' +
                'Oh, wait a sec...yes you can.';
```