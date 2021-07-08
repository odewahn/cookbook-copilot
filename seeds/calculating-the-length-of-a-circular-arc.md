# Problem

Given the radius of a circle, and the angle of an arc in degrees, find the length of the arc.

# Solution

Use Math.PI to convert degrees to radians, and use the result in a formula to find the length of the arc:

```javascript
// angle of arc is 120 degrees, radius of circle is 2
var radians = degrees * (Math.PI / 180);
var arclength = radians * radius; // value is 4.18879020478...
```

# Discussion

The length of a circular arc is found by multiplying the circle’s radius times the angle of the arc, in radians.

If the angle is given in degrees, you’ll need to convert the degree to radians first, before multiplying the angle by the radius.

# See Also

[Converting Between Degrees and Radians](#converting_between_degrees_and_radians) covers how to convert between degrees and radians.