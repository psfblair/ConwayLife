var Game = (function() 
{
		var module = {};		
		module.currentState = new Set();

		var reset = false;

		function isAlive(cell) {
				return module.currentState.contains(cell);
		}

		function removeCell(cell) {
				module.currentState.remove(cell);
		}

		function addCell(cell) {
				module.currentState.add(cell);
		}

		function toggleCell(cell) {
				if(isAlive(cell)) {
						removeCell(cell);
				} else {
						addCell(cell);
				}
		}

		function newGeneration() {
				module.currentState = Life.nextGeneration(module.currentState);
		}

		function resetAllCells() {
				module.currentState = new Set();
		}

		function generationLoop(drawFunction) {
				if(reset) {
						return;
				} else {
						setTimeout(function() {
													 newGeneration();
													 drawFunction(module.currentState);
													 generationLoop(drawFunction);
											 }, 500);
				}
		}

		module.startDrawing = function(drawFunction) {
				reset = false;		
				generationLoop(drawFunction);
		};

		module.stopDrawing = function() {
				reset = true;
		};

		module.stopDrawingAndReset = function(drawFunction) {
				module.stopDrawing();
				resetAllCells();
				drawFunction(module.currentState);
		};

		module.toggleCellAndRedraw = function(cell, drawFunction) {
				toggleCell(cell);
				drawFunction(module.currentState);
		};

		return module;
})();