var editor = CodeMirror(document.getElementById("code-snippet"), {
                    lineNumbers: true,
                    theme: "dracula", 
                    mode:  "javascript", 
                    indentUnit: 4, 
                    lineWrapping: true, 
                    lineNumbers: true,
                    styleActiveLine: true, 
                    autoCloseBrackets: true, 
                    smartIndent: true, 
                    viewportMargin: Infinity,
                  });
                  
                 
                  editor.on("paste", function() {
                   
                    setTimeout(function() {
                      editor.refresh();
                    }, 1);
                  });
document.body.style.backgroundImage = "url('Images/BackgroundDark.png')"; 
editor.getWrapperElement().style.maxWidth = '800px'; 

var defaultCode = `// sample code 
function helloWorld() {
  console.log("Hello, World!");
}`;
editor.setValue(editor.getValue() || defaultCode);

editor.on("renderLine", function(cm, line, element) {
                    var lineObj = cm.getLineHandle(line.lineNo());
                    var wraps = lineObj.height > cm.defaultTextHeight();
                    element.className += wraps ? " wrapped" : "";
                  });


function updateEditorHeight() {
                    var lineHeight = editor.defaultTextHeight();
                    var lines = editor.lineCount() + 2; 
                    var newHeight = lineHeight * lines; 
                  
                    
                    var maxHeight = 500;
                    if (newHeight > maxHeight) {
                      newHeight = maxHeight;
                    }
                  
                    editor.setSize(null, newHeight + "px");
                  }
                  
                  
                  updateEditorHeight();
                  
                  
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
                    var container = document.querySelector(".CodeMirror"); 
                    var link = document.getElementById('user-link').value;
                
                    
                    var linkElement = document.createElement('div');
                    linkElement.innerText = link;
                    linkElement.style.position = 'absolute';
                    linkElement.style.bottom = '0';
                    linkElement.style.right = '0';
                    linkElement.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'; 
                    linkElement.style.padding = '5px';
                    linkElement.style.color = 'white';
                    linkElement.className = 'link-widget';
                    container.appendChild(linkElement); 
                    
                    var originalHeight = container.style.height;
                    container.style.height = 'auto';
                    container.style['max-height'] = '1000px'; 
                
                    domtoimage.toBlob(container, { scale: 10}) 
                        .then(function (blob) {
                            
                            container.style.height = originalHeight;
                            container.style['max-height'] = '';
                
                            
                            container.removeChild(linkElement);
                
                            var link = document.createElement('a');
                            link.download = 'code-snippet.png';
                            link.href = URL.createObjectURL(blob);
                            link.click();
                        })
                        .catch(function (error) {
                          
                            container.style.height = originalHeight;
                            container.style['max-height'] = '';
                
                            
                            container.removeChild(linkElement);
                
                            console.error('oops, something went wrong!', error);
                        });
                });



document.getElementById('theme-toggle').addEventListener('click', function() {
  var themeToggle = document.getElementById('theme-toggle');
  if (document.body.classList.contains('light-theme')) {
      document.body.classList.remove('light-theme');
      document.body.classList.add('dark-theme');
      document.body.style.backgroundImage = "url('Images/BackgroundDark.png')"; 
      editor.setOption("theme", "default"); 
      themeToggle.textContent = 'Dark Theme'; 
  } else {
      document.body.classList.remove('dark-theme');
      document.body.classList.add('light-theme');
      document.body.style.backgroundImage = "url('Images/BackgroundLight.png')"; mage
      editor.setOption("theme", "dracula");
      themeToggle.textContent = 'Light Theme'; 
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
                    var code = editor.getValue().split('\n');
                    var baseDelay = 10; 
                    var lineHeight = editor.defaultTextHeight(); 
                    var defaultLines = editor.lineCount(); 
                    editor.setValue(''); 
                    editor.setSize(null, (defaultLines * lineHeight) + 'px'); 

                    
                    
                    function typeWriter(text, i, line) {
                        if (i < text.length) {
                            var delay = baseDelay * (1 / text.length);
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
                            var totalLines = editor.lineCount();
                            editor.setSize(null, ((totalLines + 1) * lineHeight) + 'px'); 
                            editor.setCursor({line: totalLines, ch: 0}); 
                            editor.execCommand('deleteLine');
                        }
                        
                    }
                    setTimeout(function() {
                                        if (document.body.classList.contains("focus-mode")) {
                                            document.body.classList.remove("focus-mode");
                                        }
                                    }, 2000);
                
                    typeWriter(code[0], 0, 0);

                    var popup = document.getElementById("popup");
                    popup.style.display = "none";
                    });

document.getElementById("focus-mode").addEventListener("click", function() {
    document.body.classList.toggle("focus-mode");
    this.style.zIndex = document.body.classList.contains("focus-mode") ? "10000" : "auto";
});


document.getElementById('user-link').addEventListener('input', function() {
                    var link = this.value;
                
                    editor.eachLine(function(line) {
                        if (line.widgets) {
                            line.widgets.forEach(function(widget) {
                                editor.removeLineWidget(widget);
                            });
                        }
                    });
                
                    if (link.trim() !== '') {
                        var linkElement = document.createElement('div');
                        linkElement.innerText = link;
                
                        var widget = document.createElement('div');
                        widget.appendChild(linkElement);
                        widget.className = 'link-widget';
                
                        var lastLine = editor.lastLine();
                
                        editor.addLineWidget(lastLine, widget, {coverGutter: false, noHScroll: true, above: true, showIfHidden: false});
                
                        editor.scrollIntoView({line: lastLine, ch: 0});
                    }
                });
                
                document.getElementById('user-link').value = 'https://github.com/microsoft/vscode';
                document.getElementById('user-link').dispatchEvent(new Event('input'));
