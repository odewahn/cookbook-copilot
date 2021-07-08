# Problem

You want to paste example markup into a web page, and escape the markup (i.e., have the angle brackets print out rather than have the contents parsed).

# Solution

Use regular expressions to convert angle brackets (<>) into the named entities \\&lt; and \\&gt;:

```javascript
var pieceOfHtml = "<p>This is a <span>paragraph</span></p>";
pieceOfHtml = pieceOfHtml.replace(/</g,"&lt;");
pieceOfHtml = pieceOfHtml.replace(/>/g,"&gt;");
console.log(pieceOfHtml);
```

# Discussion

It’s not unusual to want to paste samples of markup into another web page. The only way to have the text printed out, as is, without having the browser parse it, is to convert all angle brackets into their equivalent _named entities_.

The process is simple with the use of regular expressions and the String replace method, as demonstrated in the solution. The key is to remember to use the global flag with the regular expression, to match all instances of the angle brackets.

Caution

Of course, if the regular expression finds the use of '>' or '<' in a mathematical or conditional expression, it will replace these, too.