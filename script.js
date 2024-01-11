
var editor = CodeMirror(document.getElementById("code-snippet"), {
  lineNumbers: true,
  theme: "dracula", // Set the theme
  mode:  "javascript", // Set the language mode
  indentUnit: 4, // Set the number of spaces for indentation
  lineWrapping: true, // Enable line wrapping
  styleActiveLine: true, // Highlight the active line
});

document.body.style.backgroundImage = "url('Images/BackgroundDark.png')"; // replace with your dark theme background image

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
                    var lineHeight = editor.defaultTextHeight(); // get the height of a line in pixels
                    var lines = editor.lineCount() + 2; // get the number of lines in the code and add 2
                    var newHeight = lineHeight * lines; // calculate the new height
                  
                    editor.setSize(null, newHeight + "px");
                  }
                  
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
  var themeToggle = document.getElementById('theme-toggle');
  if (document.body.classList.contains('light-theme')) {
      document.body.classList.remove('light-theme');
      document.body.classList.add('dark-theme');
      document.body.style.backgroundImage = "url('Images/BackgroundDark.png')"; // Change this to your dark theme background image
      editor.setOption("theme", "default"); // Change this to your light theme
      themeToggle.textContent = 'Dark Theme'; // Update the button text
  } else {
      document.body.classList.remove('dark-theme');
      document.body.classList.add('light-theme');
      document.body.style.backgroundImage = "url('Images/BackgroundLight.png')"; // Change this to your light theme background image
      editor.setOption("theme", "dracula");
      themeToggle.textContent = 'Light Theme'; // Update the button text
  }
});


document.getElementById("copy").addEventListener("click", function() {
  var code = editor.getValue();
  navigator.clipboard.writeText(code).then(function() {
    console.log('Copying to clipboard was successful!');
  }, function(err) {
    console.error('Could not copy text: ', err);
  });
});
document.getElementById("start-capture").addEventListener("click", function() {
                    var code = editor.getValue();
                    var delay = 50; // delay in ms between each character
                    var lineHeight = editor.defaultTextHeight(); // get the height of a line in pixels
                    var lines = code.split('\n').length;
                    var defaultLines = editor.lineCount(); // get the number of lines in the default code
                    editor.setValue(''); // clear the editor
                    editor.setSize(null, (defaultLines * lineHeight) + 'px'); // set the initial height to match the default code
                  
                    // Function to append characters one by one
                    function typeWriter(text, i) {
                      if (i < text.length) {
                        if (text.charAt(i) === '\n') {
                          var currentHeight = parseInt(editor.getWrapperElement().style.height, 10);
                          editor.setSize(null, (currentHeight + lineHeight) + 'px');
                        }
                        editor.replaceRange(text.charAt(i), CodeMirror.Pos(editor.lastLine()));
                        setTimeout(function() {
                          typeWriter(text, i + 1);
                        }, delay);
                      } else {
                        var totalLines = editor.lineCount(); // get the total number of lines in the code
                        editor.setSize(null, ((totalLines + 1) * lineHeight) + 'px'); // set the height to match the full code plus one line
                        editor.replaceRange('\n', CodeMirror.Pos(editor.lastLine())); // add an extra line
                        editor.setCursor({line: totalLines, ch: 0}); // set the cursor to the start of the extra line
                        editor.execCommand('deleteLine'); // delete the extra line
                      }
                    }
                  
                    // Start the typewriter effect
                    typeWriter(code, 0);
                  });