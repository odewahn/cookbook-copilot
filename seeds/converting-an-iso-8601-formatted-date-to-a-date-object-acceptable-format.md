# Problem

You need to convert an ISO 8601 formatted date string into values that can be used to create a new Date object instance.

# Solution

Parse the ISO 8601 string into the individual date values, and use it to create a new JavaScript Date object instance:

```javascript
var dtstr= "2014-3-04T19:35:32Z";

dtstr = dtstr.replace(/\D/g," ");
var dtcomps = dtstr.split(" ");

// modify month between 1 based ISO 8601 and zero based Date
dtcomps[1]--;

var convdt = new Date(Date.UTC.apply(null,dtcomps));

console.log(convdt.toString()); // Tue, 04 Mar 2014 19:35:32 GMT
```

# Discussion

The ISO 8601 is an international standard that defines a representation for both dates and times. It’s not unusual for applications that provide APIs to require ISO 8601 formatting. It’s also not unusual for most dates to and from APIs to be in UTC, rather than local time.

The solution shows one variation of ISO 8601 formatting. The following demonstrate some others:

*   2009
    
*   2009-10
    
*   2009-10-15
    
*   2009-10-15T19:20
    
*   2009-10-15T19:20:20
    
*   2009-10-15T19:20:20.50
    

The values are year, month, date, then 'T' to represent time, and hours, minutes, seconds, and fractions of sections. The time zone also needs to be indicated. If the date is in UTC, the time zone is represented by the letter 'Z', as shown in the solution:

```javascript
2014-3-04T19:35:32Z
```

Otherwise, the time zone is represented as +hh:mm to represent a time zone ahead of UTC, and -hh:mm to represent a time zone behind UTC.

If you attempt to create a JavaScript Date with an ISO 8601 formatted string, you’ll get an invalid date error. Instead, you have to convert the string into values that can be used with the JavaScript Date.

The simplest way to parse an ISO 8601 formatted string is to use the String split() method. To facilitate using split(), all non-numeric characters are converted to one specific character. In the solution, the non-numeric characters are converted to a space:

```javascript
dtstr = dtstr.replace(/\D/g, " ");
```

The ISO-formatted string would be converted to:

```javascript
2014 03 04 19 35 32
```

ISO months are one-based values of 1 through 12. To use the month value in JavaScript Dates, the month needs to be adjusted by subtracting 1:

```javascript
dtcomps[1]--;
```

Finally, the new Date is created. To maintain the UTC setting, the Date’s UTC() method is used to create the date in universal time, which is then passed to the Date constructor. Rather than listing out each and every single date value, the apply() method is used, with null as the first value, and all of the arguments as an array as the second:

```javascript
var convdt = new Date(Date.UTC.apply(null,dtcomps));
```

The task gets more challenging when you have to account for the different ISO 8601 formats. [Converting ISO 8601 formatted dates to JavaScript Dates](#converting_iso_8601_formatted_dates_to_j) shows a JavaScript application that contains a more complex JavaScript function that converts from ISO 8601 to allowable Date values. The first test in the function ensures that the ISO 8601 format can be converted to a JavaScript Date. This means that, at a minimum, the formatted string must have a month, day, and year.

Example 3. Converting ISO 8601 formatted dates to JavaScript Dates

```html
<!DOCTYPE html>
<html>
<head>
   <title>Converting ISO 8601 date</title>
</head>
<body>
  <form>
    <p>Datestring in ISO 8601 format: <input type="text" id="datestring" />
    </p>
  </form>
  <button id="dateSubmit">Convert Date</button>
  <div id="result"></div>

 <script type="text/javascript">
   document.getElementById("dateSubmit").onclick=function() {

     var dtstr = document.getElementById("datestring").value;
     var convdate = convertISO8601toDate(dtstr);
     document.getElementById("result").innerHTML=convdate;
   }

   function convertISO8601toDate(dtstr) {

     // replace anything but numbers by spaces
     dtstr = dtstr.replace(/\D/g," ");

     // trim any hanging white space
     dtstr = dtstr.replace(/\s+$/,"");

     // split on space
     var dtcomps = dtstr.split(" ");

     // not all ISO 8601 dates can convert, as is
     // unless month and date specified, invalid
     if (dtcomps.length < 3) return "invalid date";

     // if time not provided, set to zero
     if (dtcomps.length < 4) {
         dtcomps[3] = 0;
         dtcomps[4] = 0;
         dtcomps[5] = 0;
     }

     // modify month between 1 based ISO 8601 and zero based Date
     dtcomps[1]--;

     var convdt = new Date(Date.UTC.apply(null,dtcomps));

     return convdt.toUTCString();
   }
 </script>

</body>
</html>
```

Another test incorporated into [Converting ISO 8601 formatted dates to JavaScript Dates](#converting_iso_8601_formatted_dates_to_j) is whether a time is given. If there aren’t enough array elements to cover a time, then the hours, minutes, and seconds are set to zero when the UTC date is created.

There are other issues related to dates not covered in the application. For instance, if the ISO 8601 formatted string isn’t in UTC time, converting it to UTC can require additional code, both to parse the time zone and to adjust the date to incorporate the time zone.

Note

Eventually, you won’t need this special processing, because ECMAScript 5 includes support for ISO 8601 dates in methods such as Date parse(). However, implementation is still inconsistent across all major browsers—nonexistent in older browsers—so you’ll need these workarounds, or a _shim_, for now. See [Using ES6 String Extras Without Leaving Users in the Dirt](#using_es6_string_extras) for more on using a shim.