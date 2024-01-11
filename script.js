var editor = CodeMirror(document.getElementById("code-snippet"), {
  lineNumbers: true,
  theme: "dracula", // Set the theme
  mode:  "javascript", // Set the language mode
  indentUnit: 4, // Set the number of spaces for indentation
  lineWrapping: true, // Enable line wrapping
  styleActiveLine: true, // Highlight the active line
});

// Default JavaScript code
var defaultCode = `// This is a simple JavaScript code snippet for showcase
function greet(name) {
  return "Hello, " + name + "!";
}

console.log(greet("World"));`;

// Set the initial content of the editor
editor.setValue(editor.getValue() || defaultCode);

// Function to update the height of the editor
function updateEditorHeight() {
  var scrollInfo = editor.getScrollInfo();
  var maxHeight = 500; // Set this to the maximum height you want

  // Calculate the new height, but don't exceed the maximum
  var newHeight = Math.min(scrollInfo.height, maxHeight);

  editor.setSize(null, newHeight + "px");
}

// Rest of your code...
// Set the initial height of the editor to match its content
updateEditorHeight();

// Update the height of the editor whenever its content changes
editor.on("change", updateEditorHeight);


document.getElementById("font-size").addEventListener("change", function() {
  editor.getWrapperElement().style.fontSize = this.value + 'px';
});

document.getElementById("language").addEventListener("change", function() {
  editor.setOption("mode", this.value);
});

document.getElementById("font-family").addEventListener("change", function() {
  editor.getWrapperElement().style.fontFamily = this.value;
});

document.getElementById("theme-select").addEventListener("change", function() {
  editor.setOption("theme", this.value);
});



document.getElementById("download").addEventListener("click", function() {
  var container = document.querySelector(".CodeMirror"); // select the CodeMirror editor

  // Temporarily adjust the height of the editor to fit its content
  var originalHeight = container.style.height;
  container.style.height = 'auto';
  container.style['max-height'] = 'none';

  domtoimage.toBlob(container)
    .then(function (blob) {
      // Reset the height of the editor
      container.style.height = originalHeight;
      container.style['max-height'] = '';

      var link = document.createElement('a');
      link.download = 'code-snippet.png';
      link.href = URL.createObjectURL(blob);
      link.click();
    })
    .catch(function (error) {
      // Reset the height of the editor in case of error
      container.style.height = originalHeight;
      container.style['max-height'] = '';

      console.error('oops, something went wrong!', error);
    });
});
document.getElementById('theme-toggle').addEventListener('click', function() {
  document.body.classList.toggle('light-theme');
});


