# Problem

You have an angle in degrees. To use the value in the Math object’s trigonometric functions, you need to convert the degrees to radians.

# Solution

To convert degrees to radians, multiply the value by (Math.PI / 180):

```javascript
var radians = degrees * (Math.PI / 180);
```

To convert radians to degrees, multiply the value by (180 / Math.PI):

```javascript
var degrees = radians * (180 / Math.PI);
```

# Discussion

All Math trigonometric methods (sin(), cos(), tin(), asin(), acos(), atan(), and atan2()), take values in radians, and return radians as a result. Yet it’s not unusual for people to provide values in degrees rather than radians, as degrees are the more familiar unit of measure. The functionality covered in the solution provides the conversion between the two units.