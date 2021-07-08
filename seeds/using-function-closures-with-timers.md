# Problem

You want to provide a function with a timer, but you want to add the function directly into the timer method call.

# Solution

Use an _anonymous function_ as first parameter to the setInterval() or setTimeout() method call:

```javascript
intervalId=setInterval(
            function() {
              x+=5;
              var left = x + "px";
              document.getElementById("redbox").style.left=left;
            },100);
```

# Discussion

Unlike the other material covered in this chapter, JavaScript timers don’t belong to any of the basic built-in objects. Instead, they’re part of the basic Web API (previously known as the Browser Object Model, or BOM). In the browser, they’re properties of the Window object, the browser’s global object, though we don’t need to specify window when accessing them. In Node.js, the two timer functions are part of the global object.

When you’re creating timers using setTimeout() and setInterval(), you can pass in a function variable as the first parameter:

```javascript
function bing() {
  alert('Bing!');
}

setTimeout(bing, 3000);
```

However, you can also use an anonymous function, as demonstrated in the solution. This approach is more useful, because rather than have to clutter up the global space with a function just to use with the timer, you can embed the function directly. In addition, you can use a variable local to the scope of the enclosing function when you use an anonymous function.

[Using an anonymous function within a setInterval timer parameter](#using_an_anonymous_function_within_a_set) demonstrates an anonymous function within a setInterval() method call. The approach also demonstrates how the use of this _function closure_ allows access to the parent function’s local variables within the timer method. In the example, clicking the red box starts the timer, and the box moves. Clicking the box again clears the timer, and the box stops. The position of the box is tracked in the x variable, which is within scope for the timer function, as it operates within the scope of the parent function.

Example 4. Using an anonymous function within a setInterval timer parameter

```html
<!DOCTYPE html>
<head>
<title>interval and anonymous function</title>
<style>
#redbox
{
  position: absolute;
  left: 100px;
  top: 100px;
  width: 200px; height: 200px;
  background-color: red;
}
</style>
</head>
<body>
<div id="redbox"></div>

<script>
  var intervalId=null;

  document.getElementById('redbox').addEventListener('click',startBox,false);

  function startBox() {
    if (intervalId == null) {
       var x = 100;
       intervalId=setInterval(
            function() {
              x+=5;
              var left = x + "px";
              document.getElementById("redbox").style.left=left;
            },100);
    } else {
       clearInterval(intervalId);
       intervalId=null;
    }
  }
</script>

</body>
```

There’s no guarantee that the timer event fires when it is supposed to fire. Timers run on the same execution thread as all other user interface (UI) events, such as mouse-clicks. All events are queued and blocked, including the timer event, until its turn. So, if you have several events in the queue ahead of the timer, the actual time could differ—probably not enough to be noticeable to your application users, but a delay can happen.

# See Also

[John Resig offers an excellent discussion on how timers work](http://ejohn.org/blog/how-javascript-timers-work/), and especially the issues associated with event queues and single threads of execution.

Function closures are covered in more detail in [\[create\_a\_function\_that\_remembers\_its\_sta\]](#create_a_function_that_remembers_its_sta). See function closures in timers in action in [Tracking Elapsed Time](#tracking_elapsed_time).