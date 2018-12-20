(function() {
  /* the env arg has 
		
		-- code original in string format
		env.code					: any
		-- the <code/> HtmlElement
		env.element					: HtmlElement | undefined
		-- The language in string format
		env.language				: Prism.LanguageDefinition | undefined
		-- was undefined in the console
		env.grammar					: 
		

		---- these do not appear on the console of the plugin
		---- but are in the interface?
		env.attributes				: any
		env.classes					: string[] | undefined			
		env.content					: string | undefined
		env.highlightedCode			: any
		env.parent					: HtmlElement
		env.tag						: string | undefined
		env.type					: string | undefined

		---- line number plugin adds one more in the file
		---- probably to register itself with prism
		env.plugins
	 */

  if (typeof self === "undefined" || !self.Prism || !self.document) {
    return;
  }

  /**
   * Plugin name which is used as a class name for <pre> which is activating the plugin
   * @type {String}
   */
  var PLUGIN_NAME = "line-numbers";

  /**
   * Regular expression used for determining line breaks
   * @type {RegExp}
   */
  var NEW_LINE_EXP = /\n(?!$)/g;

  /**
   * Resizes line numbers spans according to height of line of code
   * @param {Element} element <pre> element
   */
  var _resizeElement = function(element) {
    var codeStyles = getStyles(element);
    var whiteSpace = codeStyles["white-space"];

    if (whiteSpace === "pre-wrap" || whiteSpace === "pre-line") {
      var codeElement = element.querySelector("code");
      var lineNumbersWrapper = element.querySelector(".line-numbers-rows");
      var lineNumberSizer = element.querySelector(".line-numbers-sizer");
      var codeLines = codeElement.textContent.split(NEW_LINE_EXP);

      if (!lineNumberSizer) {
        lineNumberSizer = document.createElement("span");
        lineNumberSizer.className = "line-numbers-sizer";

        codeElement.appendChild(lineNumberSizer);
      }

      lineNumberSizer.style.display = "block";

      codeLines.forEach(function(line, lineNumber) {
        lineNumberSizer.textContent = line || "\n";
        var lineSize = lineNumberSizer.getBoundingClientRect().height;
        lineNumbersWrapper.children[lineNumber].style.height = lineSize + "px";
      });

      lineNumberSizer.textContent = "";
      lineNumberSizer.style.display = "none";
    }
  };

  /**
   * Returns style declarations for the element
   * @param {Element} element
   */
  var getStyles = function(element) {
    if (!element) {
      return null;
    }

    return window.getComputedStyle
      ? getComputedStyle(element)
      : element.currentStyle || null;
  };

  window.addEventListener("resize", function() {
    Array.prototype.forEach.call(
      document.querySelectorAll("pre." + PLUGIN_NAME),
      _resizeElement
    );
  });

  Prism.hooks.add("complete", function(env) {
    /**********************************
     * Some initial tests
     **********************************/

    // if no code then ignore
    if (!env.code) {
      return;
    }
    //console.log("env: ", env);

    // works only for <code> wrapped inside <pre> (not inline)
    var pre = env.element.parentNode;
    var clsReg = /\s*\bline-numbers\b\s*/;
    if (
      !pre ||
      !/pre/i.test(pre.nodeName) ||
      // Abort only if nor the <pre> nor the <code> have the class
      (!clsReg.test(pre.className) && !clsReg.test(env.element.className))
    ) {
      return;
    }

    if (env.element.querySelector(".line-numbers-rows")) {
      // Abort if line numbers already exists
      return;
    }

    if (clsReg.test(env.element.className)) {
      // Remove the class 'line-numbers' from the <code>
      env.element.className = env.element.className.replace(clsReg, " ");
    }
    if (!clsReg.test(pre.className)) {
      // Add the class 'line-numbers' to the <pre>
      pre.className += " line-numbers";
    }

    /*******************************************
     * Beginning of the logic
     ********************************************/

    /* discover how many lines of code there is */
    var match = env.code.match(NEW_LINE_EXP);
    var linesNum = match ? match.length + 1 : 1;

    /* lineNumbersWrapper will be the parent span of the line numbers
     * (span.line-numbers-rows)
     */
    var lineNumbersWrapper = document.createElement("span");
    lineNumbersWrapper.setAttribute("aria-hidden", "true");
    lineNumbersWrapper.className = "line-numbers-rows";

    /* ********************************************************
     * The span containing the line numbers are created here
     **********************************************************/

    for (var i = 0; i < linesNum; i++) {
      var line = document.createElement("span");
      line.innerHTML = i;
      // add the evenntlistener to each line number spans
      // TODO: consider adding the event listener only to the parent
      // and getting the child clicked from it
      // this way there will be only an event listener
      // instead of n for n lines of code
      line.onclick = function(event) {
        event.stopPropagation();
        // pass the event to a callback
        Prism.plugins.lineNumbers.eventCallback(event);
      };
      // append the line numbers (span) to the parent (span.line-numbers-rows)
      lineNumbersWrapper.appendChild(line);
    }

    // append the parent span to the code htmlElement
    env.element.appendChild(lineNumbersWrapper);

    _resizeElement(pre);

    // run itself...
    Prism.hooks.run("line-numbers", env);
  });

  // registers itsel with prism hooks
  Prism.hooks.add("line-numbers", function(env) {
    env.plugins = env.plugins || {};
    env.plugins.lineNumbers = true;
  });

  /**
   * Global exports
   */
  Prism.plugins.lineNumbers = {
    /*
     * 	quick and dirty solution
     *
     *   i also deleted its original property
     *   since it wasn't necessary for this application
     */
    localCallback: () => {},
    setCallback: callback => {
      this.localCallback = callback;
    },
    eventCallback: event => {
      return this.localCallback(event);
    },
  };
})();
