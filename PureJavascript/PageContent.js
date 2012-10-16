var PageContent = (function()
{
		var module = {};

		var CANVAS_WIDTH = 1200;
		var CANVAS_HEIGHT = 650;
		var CELL_SIDE_PIXELS = 10;
		var X_OFFSET = 1;
		var Y_OFFSET = 6;

		function createButton(name, handler) {
				var theButton = document.createElement('input');
				theButton.setAttribute('type', 'button');
				theButton.setAttribute('value', name);
				theButton.addEventListener('click', handler, false);
				return theButton;
		}

		function body() {
				Canvas.initialize(CANVAS_WIDTH, CANVAS_HEIGHT, CELL_SIDE_PIXELS, X_OFFSET, Y_OFFSET);
				var outerSpan = document.createElement('span');
				
				var innerSpan = document.createElement('span');
				innerSpan.setAttribute('style', 'position:absolute; top:20px; left:425px');

				var goButton =createButton('Go', Canvas.Go);
				var stopButton =createButton('Stop', Canvas.Stop);
				var resetButton =createButton('Reset', Canvas.Reset);

				innerSpan.appendChild(goButton);
				innerSpan.appendChild(stopButton);
				innerSpan.appendChild(resetButton);

				var instructions = document.createTextNode("Click within the canvas to set/unset cells. To add/remove cells in a running game, stop the game first. Cells outside the canvas boundaries are still tracked.");
				var instructionsParagraph = document.createElement('p');
				instructionsParagraph.setAttribute('style', 'font-style:italic; position:absolute; top:30px;');
				instructionsParagraph.appendChild(instructions);

				var lastDiv = document.createElement('div');
				lastDiv.setAttribute('style', 'clear:both');

				outerSpan.appendChild(innerSpan);
				outerSpan.appendChild(instructionsParagraph);
				outerSpan.appendChild(Canvas.nodes());
				outerSpan.appendChild(lastDiv);

				return outerSpan;
		}

		function title() {
				return "John Horton Conway's Game of Life";
		}

		module.insertNodesIntoPage = function() {
				var titleTagElements = document.getElementsByTagName("title");
				titleTagElements[0].innerHTML = title();
				var pageTitleElement = document.getElementById("title");
				pageTitleElement.innerHTML = title();
				var bodyWrapper = document.getElementById("data-body");
				bodyWrapper.innerHTML = "";
				bodyWrapper.appendChild(body());
		};

		return module;
})();
