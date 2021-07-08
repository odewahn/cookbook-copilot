# Problem

You need to create a temporary file or directory for use when your program executes. Afterward, you possibly want the file or directory to be destroyed.

# Solution

The `tempfile` module has a variety of functions for performing this task. To make an unnamed temporary file, use `tempfile.TemporaryFile`:

```python
from tempfile import TemporaryFile

with TemporaryFile('w+t') as f:
     # Read/write to the file
     f.write('Hello World\n')
     f.write('Testing\n')

     # Seek back to beginning and read the data
     f.seek(0)
     data = f.read()

# Temporary file is destroyed
```

Or, if you prefer, you can also use the file like this:

```python
f = TemporaryFile('w+t')
# Use the temporary file
...
f.close()
# File is destroyed
```

The first argument to `TemporaryFile()` is the file mode, which is usually `w+t` for text and `w+b` for binary. This mode simultaneously supports reading and writing, which is useful here since closing the file to change modes would actually destroy it. `TemporaryFile()` additionally accepts the same arguments as the built-in `open()` function. For example:

```python
with TemporaryFile('w+t', encoding='utf-8', errors='ignore') as f:
     ...
```

On most Unix systems, the file created by `TemporaryFile()` is unnamed and won’t even have a directory entry. If you want to relax this constraint, use `NamedTemporaryFile()` instead. For example:

```python
from tempfile import NamedTemporaryFile

with NamedTemporaryFile('w+t') as f:
    print('filename is:', f.name)
    ...

# File automatically destroyed
```

Here, the `f.name` attribute of the opened file contains the filename of the temporary file. This can be useful if it needs to be given to some other code that needs to open the file. As with `TemporaryFile()`, the resulting file is automatically deleted when it’s closed. If you don’t want this, supply a `delete=False` keyword argument. For example:

```python
with NamedTemporaryFile('w+t', delete=False) as f:
    print('filename is:', f.name)
    ...
```

To make a temporary directory, use `tempfile.TemporaryDirectory()`. For example:

```python
from tempfile import TemporaryDirectory
with TemporaryDirectory() as dirname:
     print('dirname is:', dirname)
     # Use the directory
     ...
# Directory and all contents destroyed
```

# Discussion

The `TemporaryFile()`, `NamedTemporaryFile()`, and `TemporaryDirectory()` functions are probably the most convenient way to work with temporary files and directories, because they automatically handle all of the steps of creation and subsequent cleanup. At a lower level, you can also use the `mkstemp()` and `mkdtemp()` to create temporary files and directories. For example:

```pycon
>>> import tempfile
>>> tempfile.mkstemp()
(3, '/var/folders/7W/7WZl5sfZEF0pljrEB1UMWE+++TI/-Tmp-/tmp7fefhv')
>>> tempfile.mkdtemp()
'/var/folders/7W/7WZl5sfZEF0pljrEB1UMWE+++TI/-Tmp-/tmp5wvcv6'
>>>
```

However, these functions don’t really take care of further management. For example, the `mkstemp()` function simply returns a raw OS file descriptor and leaves it up to you to turn it into a proper file. Similarly, it’s up to you to clean up the files if you want.

Normally, temporary files are created in the system’s default location, such as _/var/tmp_ or similar. To find out the actual location, use the `tempfile.gettempdir()` function. For example:

```pycon
>>> tempfile.gettempdir()
'/var/folders/7W/7WZl5sfZEF0pljrEB1UMWE+++TI/-Tmp-'
>>>
```

All of the temporary-file-related functions allow you to override this directory as well as the naming conventions using the `prefix`, `suffix`, and `dir` keyword arguments. For example:

```pycon
>>> f = NamedTemporaryFile(prefix='mytemp', suffix='.txt', dir='/tmp')
>>> f.name
'/tmp/mytemp8ee899.txt'
>>>
```

Last, but not least, to the extent possible, the `tempfile()` module creates temporary files in the most secure manner possible. This includes only giving access permission to the current user and taking steps to avoid race conditions in file creation. Be aware that there can be differences between platforms. Thus, you should make sure to check [the official documentation](http://docs.python.org/3/library/tempfile.html) for the finer points.