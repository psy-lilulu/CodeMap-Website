var editor = CodeMirror(document.getElementById("code-snippet"), {
  lineNumbers: true,
  theme: "monokai", // Set the theme
  mode:  "javascript", // Set the language mode
  indentUnit: 4, // Set the number of spaces for indentation
  lineWrapping: true, // Enable line wrapping
  styleActiveLine: true, // Highlight the active line
});


editor.setValue(`// This is a simple JavaScript code snippet for showcase
function greet(name) {
  return "Hello, " + name + "!";
}

console.log(greet("World"));`);
document.getElementById("theme").addEventListener("change", function() {
  editor.setOption("theme", this.value);
});

document.getElementById("font-size").addEventListener("change", function() {
  editor.getWrapperElement().style.fontSize = this.value + 'px';
});

document.getElementById("language").addEventListener("change", function() {
  editor.setOption("mode", this.value);
});

document.getElementById("font-family").addEventListener("change", function() {
  editor.getWrapperElement().style.fontFamily = this.value;
});




document.getElementById("download").addEventListener("click", function() {
  var container = document.querySelector(".CodeMirror"); // select the CodeMirror editor

  domtoimage.toPng(container)
    .then(function (dataUrl) {
      var link = document.createElement('a');
      link.download = 'code-snippet.png';
      link.href = dataUrl;
      link.click();
    })
    .catch(function (error) {
      console.error('oops, something went wrong!', error);
    });
});

document.getElementById('theme-toggle').addEventListener('click', function() {
  document.body.classList.toggle('light-theme');
});


