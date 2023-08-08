# File System

File system using the built-in `fs` module. This module provides various functions to perform operations on files and directories, such as reading, writing, deleting, and manipulating file metadata. Here's a brief overview of how to work with the file system using Node.js:

1. **Importing the `fs` module:**

First, you need to require the `fs` module to access its functionality.

```javascript
const fs = require('fs');
```

2. **Reading Files:**

You can use the `fs.readFile()` function to read the contents of a file asynchronously.

```javascript
fs.readFile('file.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(data);
});
```

3. **Writing Files:**

To write data to a file, you can use the `fs.writeFile()` function.

```javascript
const content = 'This is the content to write to the file.';
fs.writeFile('newFile.txt', content, 'utf8', (err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('File has been written.');
});
```

4. **Appending to Files:**

You can use the `fs.appendFile()` function to add content to an existing file.

```javascript
const additionalContent = '\nThis content will be appended.';
fs.appendFile('existingFile.txt', additionalContent, 'utf8', (err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('Content has been appended.');
});
```

5. **Renaming and Moving Files:**

The `fs.rename()` function can be used to rename or move files.

```javascript
fs.rename('oldName.txt', 'newName.txt', (err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('File has been renamed.');
});
```

6. **Deleting Files:**

The `fs.unlink()` function is used to delete a file.

```javascript
fs.unlink('fileToDelete.txt', (err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('File has been deleted.');
});
```

7. **Working with Directories:**

You can create directories using `fs.mkdir()` and remove directories using `fs.rmdir()`.

```javascript
fs.mkdir('newDirectory', (err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('Directory created.');
});

fs.rmdir('directoryToDelete', (err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('Directory deleted.');
});
```

Remember that these examples show asynchronous operations. You can also use the synchronous counterparts of these functions by appending 'Sync' to the function names (e.g., `fs.readFileSync()`, `fs.writeFileSync()`), but using asynchronous versions is generally recommended to prevent blocking the Node.js event loop.
