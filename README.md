O'Reilly Cookbooks provide practical solutions for common programming problems. For exabple, how to format a date in JavaScript, how to enumerate a list in Python, or how to calculate the Fibonacci serries in Go. Chapters in a cookbook consist of groups of recipes that all address common themes, such as string handling or dates. Each recipe begins with a general description of the problem, a solution, and then a discussion section. We were wondering how [GitHub Copilot](https://copilot.github.com/) would do in solving some of these problems.

To test it, I first cloned the source content for the cookbooks from our internal GitLab repo. The files are usually in [AsciiDoc](https://asciidoc.org/) format, so I wrote a script to pull out problem solution and convert it into a "seed" program for Copilot.

The seed has two parts. The first part consists of a comment generated from the recipes' problem statement and a function declaration. (Copilot is great at generating contained functions!). Copilot can use the comment to generate a working function that solves the problem. Next, I added a print statement that only says "Print test value for <recipe title>". Copilot can then generate a number of statements that will print the function for various values it selects.

For example, here's the Copilot seed for a recipe called "Converting a Decimal to a Hexadecimal Value" from [The JavaScript Cookbook](https://learning.oreilly.com/library/view/javascript-cookbook/9781449390211/):

```
/*
You have a decimal value, and need to find its hexadecimal equivalent.
*/
function

console.log("Print test value for Converting a Decimal to a Hexadecimal Value")
```

Here's the seed for "Converting Between Degrees and Radians":

```
/*
You have an angle in degrees. To use the value in the Math object’s trigonometric functions, you need to convert the degrees to radians.
*/
function

console.log("Print test value for Converting Between Degrees and Radians")
```

Once I had the seeds for a few recipes, I could plug it into VSCode and let Copilot got to work. For example, here's what it generated to convert a number to hexadecimal:

```
/*
You have a decimal value, and need to find its hexadecimal equivalent.
*/
function toHex(d) {
  var hex = Number(d).toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

console.log("Print test value for Converting a Decimal to a Hexadecimal Value");
console.log(toHex(255));
console.log(toHex(25));
console.log(toHex(15));
console.log(toHex(10));
console.log(toHex(5));
console.log(toHex(2));
console.log(toHex(1));
console.log(toHex(0));
console.log(toHex(-1));
```

What's cool is you can then run the programs it generates from the seed to see if it got the correct answer:

```
odewahn@BOSMAC06394 out % node javascript-cookbook-2e-ch01-recipe-014-converting-a-decimal-to-a-hexadecimal-value.js
Print test value for Converting a Decimal to a Hexadecimal Value
ff
19
0f
0a
05
02
01
00
-1
```

Not too shabby!

Here's a video of the process in action:

https://drive.google.com/file/d/1cjTtfFVPoq2-4QuafA3VOimvS2q88XY-/view?usp=sharing
