# Problem

You want to track the elapsed time between events.

# Solution

Create a Date object when the first event occurs, a new Date object when the second event occurs, and subtract the first from the second. The difference is in milliseconds; to convert to seconds, divide by 1,000:

```javascript
var firstDate = new Date();

setTimeout(function() {
  doEvent(firstDate);
}, 25000);

function doEvent() {
  var secondDate = new Date();
  var diff = secondDate - firstDate;
  console.log(diff); // approx. 25000
}
```

# Discussion

Some arithmetic operators can be used with Date, but with interesting results. In the example, one Date instance can be subtracted from another, and the difference between the two is returned as milliseconds. However, if you add two dates together, the result is a string with the second Date instance concatenated to the first:

```javascript
Thu Oct 08 2009 20:20:34 GMT-0500 (CST)Thu Oct 08 2009 20:20:31 GMT-0500 (CST)
```

If you divide the Date instances, the dates are converted to their millisecond value, and the result of dividing one by the other is returned. Multiplying two dates will return a very large millisecond result.

Note

Only the Date instance subtraction operator really makes sense, but it’s interesting to see what happens with arithmetic operators and the Date object.