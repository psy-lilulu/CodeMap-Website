var editor = CodeMirror(document.getElementById("code-snippet"), {
                    lineNumbers: true,
                    theme: "dracula", // Set the theme
                    mode:  "javascript", // Set the language mode
                    indentUnit: 4, // Set the number of spaces for indentation
                    lineWrapping: true, // Enable line wrapping
                    lineNumbers: true, // Enable line numbers
                    styleActiveLine: true, // Highlight the active line
                    autoCloseBrackets: true, // Automatically close brackets when typing
                    smartIndent: true, // Automatically indent lines when typing
                    viewportMargin: Infinity, // Render all lines, even those outside the viewport
                  });
                  
                  // Listen to the "paste" event
                  editor.on("paste", function() {
                    // Use setTimeout to ensure the refresh happens after the paste
                    setTimeout(function() {
                      editor.refresh();
                    }, 1);
                  });
document.body.style.backgroundImage = "url('Images/BackgroundDark.png')"; // replace with your dark theme background image
// Set a maximum width for the editor
editor.getWrapperElement().style.maxWidth = '800px'; // replace 800 with your desired maximum width

var defaultCode = `// sample code 
function helloWorld() {
  console.log("Hello, World!");
}`;
// Set the initial content of the editor
editor.setValue(editor.getValue() || defaultCode);

editor.on("renderLine", function(cm, line, element) {
                    var lineObj = cm.getLineHandle(line.lineNo());
                    var wraps = lineObj.height > cm.defaultTextHeight();
                    element.className += wraps ? " wrapped" : "";
                  });

// Function to update the height of the editor
function updateEditorHeight() {
                    var lineHeight = editor.defaultTextHeight(); // get the height of a line in pixels
                    var lines = editor.lineCount() + 2; // get the number of lines in the code and add 2
                    var newHeight = lineHeight * lines; // calculate the new height
                  
                    // Limit the maximum height to a certain value, for example 500px
                    var maxHeight = 500;
                    if (newHeight > maxHeight) {
                      newHeight = maxHeight;
                    }
                  
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
                    var link = document.getElementById('user-link').value; // get the link from the input field
                
                    // Create a new element to display the link
                    var linkElement = document.createElement('div');
                    linkElement.innerText = link;
                    linkElement.style.position = 'absolute';
                    linkElement.style.bottom = '0';
                    linkElement.style.right = '0';
                    linkElement.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'; // adjust as needed
                    linkElement.style.padding = '5px';
                    linkElement.style.color = 'white'; // adjust as needed
                    linkElement.className = 'link-widget'; // apply the same class as the widget in the editor
                    container.appendChild(linkElement); // add the link to the CodeMirror container
                
                    // Temporarily adjust the height of the editor to fit its content
                    var originalHeight = container.style.height;
                    container.style.height = 'auto';
                    container.style['max-height'] = '1000px'; // Set a maximum height
                
                    domtoimage.toBlob(container, { scale: 3 }) // Increase the scale to 3 for higher quality
                        .then(function (blob) {
                            // Reset the height of the editor
                            container.style.height = originalHeight;
                            container.style['max-height'] = '';
                
                            // Remove the link element from the CodeMirror container
                            container.removeChild(linkElement);
                
                            var link = document.createElement('a');
                            link.download = 'code-snippet.png';
                            link.href = URL.createObjectURL(blob);
                            link.click();
                        })
                        .catch(function (error) {
                            // Reset the height of the editor in case of error
                            container.style.height = originalHeight;
                            container.style['max-height'] = '';
                
                            // Remove the link element from the CodeMirror container
                            container.removeChild(linkElement);
                
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



// Start the typing effect when the "Start Typing" button is clicked
document.getElementById("start-capture").addEventListener("click", function() {
                    var code = editor.getValue().split('\n');
                    var baseDelay = 10; // set the base delay to a small number for fast typing
                    var lineHeight = editor.defaultTextHeight(); // get the height of a line in pixels
                    var defaultLines = editor.lineCount(); // get the number of lines in the default code
                    editor.setValue(''); // clear the editor
                    editor.setSize(null, (defaultLines * lineHeight) + 'px'); // set the initial height to match the default code


                    
                    // Function to append characters one by one
                    function typeWriter(text, i, line) {
                        if (i < text.length) {
                            var delay = baseDelay * (1 / text.length); // calculate the delay based on the length of the line
                            if (text.charAt(i) === '\n') {
                                var currentHeight = parseInt(editor.getWrapperElement().style.height, 10);
                                editor.setSize(null, (currentHeight + lineHeight) + 'px');
                            }
                            editor.replaceRange(text.charAt(i), CodeMirror.Pos(editor.lastLine()));
                            setTimeout(function() {
                                typeWriter(text, i + 1, line);
                            }, delay);
                        } else if (line < code.length - 1) {
                            editor.replaceRange('\n', CodeMirror.Pos(editor.lastLine()));
                            typeWriter(code[line + 1], 0, line + 1);
                        } else {
                            var totalLines = editor.lineCount(); // get the total number of lines in the code
                            editor.setSize(null, ((totalLines + 1) * lineHeight) + 'px'); // set the height to match the full code plus one line
                            editor.replaceRange('\n', CodeMirror.Pos(editor.lastLine())); // add an extra line
                            editor.setCursor({line: totalLines, ch: 0}); // set the cursor to the start of the extra line
                            editor.execCommand('deleteLine'); // delete the extra line
                        }
                        
                    }
                    setTimeout(function() {
                                        if (document.body.classList.contains("focus-mode")) {
                                            document.body.classList.remove("focus-mode");
                                        }
                                    }, 2000);
                
                    // Start the typewriter effect
                    typeWriter(code[0], 0, 0);

                       // Close the popup
                    var popup = document.getElementById("popup");
                    popup.style.display = "none";
                    });

// Toggle focus mode when the "Focus Mode" button is clicked
document.getElementById("focus-mode").addEventListener("click", function() {
    document.body.classList.toggle("focus-mode");
    // Ensure the button is always visible
    this.style.zIndex = document.body.classList.contains("focus-mode") ? "10000" : "auto";
});


// Add this to your JavaScript file
document.getElementById('user-link').addEventListener('input', function() {
                    var link = this.value;
                
                    // Remove the old widget if it exists
                    editor.eachLine(function(line) {
                        if (line.widgets) {
                            line.widgets.forEach(function(widget) {
                                editor.removeLineWidget(widget);
                            });
                        }
                    });
                
                    // Only create and display the widget if the input field is not empty
                    if (link.trim() !== '') {
                        // Create a new element to display the link
                        var linkElement = document.createElement('div');
                        linkElement.innerText = link;
                
                        // Create a new CodeMirror widget with the link element
                        var widget = document.createElement('div');
                        widget.appendChild(linkElement);
                        widget.className = 'link-widget';
                
                        // Get the last line of the editor
                        var lastLine = editor.lastLine();
                
                        // Add the new widget to the last line of the editor
                        editor.addLineWidget(lastLine, widget, {coverGutter: false, noHScroll: true, above: true, showIfHidden: false});
                
                        // Scroll the editor to the last line to ensure the link is always visible
                        editor.scrollIntoView({line: lastLine, ch: 0});
                    }
                });
                
                // Set a sample GitHub repository URL as an example
                document.getElementById('user-link').value = 'https://github.com/microsoft/vscode';
                document.getElementById('user-link').dispatchEvent(new Event('input'));
