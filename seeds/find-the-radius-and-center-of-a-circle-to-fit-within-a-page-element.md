# Problem

Given the width and height of a page element, you need to find the center and radius of the largest circle that fits within that page element.

# Solution

Find the smaller of the width and height; divide this by 2 to find the radius:

```javascript
var circleRadius = Math.min(elementWidth, elementHeight) / 2;
```

Given the page element’s width and height, find the center by dividing both by 2:

```javascript
var x = elementWidth / 2;
var y = elementHeight / 2;
```

# Discussion

Working with graphics requires us to do things such as finding the center of an element, or finding the radius of the largest circle that will fit into a rectangle (or largest rectangle that can fit in a circle).

[Fitting a SVG circle into a div element](#fitting_an_svg_circle_into_a_div_element) demonstrates both of the solution calculations, modifying an SVG circle contained within an HTML document so that the circle fits within the div element that surrounds it.

Example 6. Fitting a SVG circle into a div element

```html
<!DOCTYPE html>
<html>
<head>
<title>Using Math method to fit a circle</title>
<style type="text/css">

#elem
{
   width: 600px;
   height: 400px;
   border: 1px solid black;
}
</style>
<script type="text/javascript">

window.onload = window.onresize = function() {
  var box = document.getElementById("elem");
  var style = window.getComputedStyle(box,null);

  var height = parseInt(style.getPropertyValue("height"));
  var width = parseInt(style.getPropertyValue("width"));

  var x = width / 2;
  var y = height / 2;

  var circleRadius = Math.min(width,height) / 2;

  var circ = document.getElementById("circ");
  circ.setAttribute("r",circleRadius);
  circ.setAttribute("cx",x);
  circ.setAttribute("cy",y);
}

</script>

</head>
<body>
<div id="elem">
   <svg width="100%" height="100%">
      <circle id="circ" width="10" height="10" r="10" fill="red" />
   </svg>

</div>
</body>
```

[Page with SVG circle fit into rectangular div element](#page_with_svg_circle_fitted_into_rectang) shows the page once it’s loaded. There are techniques in SVG that can accomplish the same procedure using the SVG element’s viewPort setting, but even with these, at some point in time you’ll need to dust off your basic geometry skills if you want to work with graphics. However, as the example demonstrates, most of the math you’ll need is basic.

![jscb 0103](images/jscb_0103.png)

Figure 3. Page with SVG circle fit into rectangular div element