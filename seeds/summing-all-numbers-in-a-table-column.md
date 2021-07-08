# Problem

You want to sum all numbers in a table column.

# Solution

Traverse the table column containing numeric string values, convert to numbers, and sum the numbers:

```javascript
var sum = 0;

// use querySelector to find all second table cells
var cells = document.querySelectorAll("td:nth-of-type(2)");

for (var i = 0; i < cells.length; i++) {
  sum+=parseFloat(cells[i].firstChild.data);
}
```

# Discussion

The global functions parseInt() and parseFloat() convert strings to numbers, but parseFloat() is more adaptable when it comes to handling numbers in an HTML table. Unless you’re absolutely certain all of the numbers will be integers, parseFloat() can work with both integers and floating-point numbers.

As you traverse the HTML table and convert the table entries to numbers, sum the results. Once you have the sum, you can use it in a database update, print it to the page, or pop up a message box, as the solution demonstrates.

You can also add a sum row to the HTML table. [Converting table values to numbers and summing the results](#converting_table_values_to_numbers_and_s) demonstrates how to convert and sum up numeric values in an HTML table, and then how to insert a table row with this sum, at the end. The code uses document.querySelectorAll(), which uses a different variation on the CSS selector, `td + td`, to access the data this time. This selector finds all table cells that are preceded by another table cell.

Example 5. Converting table values to numbers and summing the results

```html
<!DOCTYPE html>
<html>
<head>
<title>Accessing numbers in table</title>
</head>
<body>
<table id="table1">
   <tr>
      <td>Washington</td><td>145</td>
   </tr>
   <tr>
      <td>Oregon</td><td>233</td>
   </tr>
   <tr>
      <td>Missouri</td><td>833</td>
   </tr>
</table>
<script type="text/javascript">

   var sum = 0;

   // use querySelector to find all second table cells
   var cells = document.querySelectorAll("td + td");

   for (var i = 0; i < cells.length; i++)
      sum+=parseFloat(cells[i].firstChild.data);

   // now add sum to end of table
   var newRow = document.createElement("tr");

   // first cell
   var firstCell = document.createElement("td");
   var firstCellText = document.createTextNode("Sum:");
   firstCell.appendChild(firstCellText);
   newRow.appendChild(firstCell);

   // second cell with sum
   var secondCell = document.createElement("td");
   var secondCellText = document.createTextNode(sum);
   secondCell.appendChild(secondCellText);
   newRow.appendChild(secondCell);

   // add row to table
   document.getElementById("table1").appendChild(newRow);

</script>
</body>
</html>
```

Being able to provide a sum or other operation on table data is helpful if you’re working with dynamic updates via an Ajax operation, such as accessing rows of data from a database. The Ajax operation may not be able to provide summary data, or you may not want to provide summary data until a web page reader chooses to do so. The users may want to manipulate the table results, and then push a button to perform the summing operation.

Adding rows to a table is simple, as long as you remember the steps:

1.  Create a new table row using document.createElement("tr").
    
2.  Create each table row cell using document.createElement("td").
    
3.  Create each table row cell’s data using document.createTextNode(), passing in the text of the node (including numbers, which are automatically converted to a string).
    
4.  Append the text node to the table cell.
    
5.  Append the table cell to the table row.
    
6.  Append the table row to the table. Rinse, repeat.
    

If you perform this operation frequently, you can create functions for these operations, and package them into JavaScript libraries that you can reuse. Also, many of the available JavaScript libraries can do much of this work for you.

# See Also

Wonder why I’m not using forEach() with the results of the query? That’s because the querySelectorAll() returns a NodeList, not an array, and forEach() is an Array method. But there is a workaround, covered in [\[traversing\_results\_queryselect\]](#traversing_results_queryselect).

# Extra: Modularization of Globals

The parseFloat() and parseInt() methods are global methods. As part of a growing effort to _modularize_ JavaScript, both methods are now attached to the Number object, as new _static_ methods, in ECMAScript 6:

```javascript
var num = Number.parseInt('123');
```

The motive is good, but at the time this book was written, only Firefox supported the Number methods.