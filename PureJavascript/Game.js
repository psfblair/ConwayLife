var Game = (function() 
{
		var module = {};		
		module.currentState = new Set();

		var stopped = false;

		module.startDrawing = function(drawFunction) {
				stopped = false;		
				generationLoop(drawFunction);
		};

		module.stopDrawing = function() {
				stopped = true;
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

		function generationLoop(drawFunction) {
				if(stopped) {
						return;
				} else {
						setTimeout(function() {
													 newGeneration();
													 drawFunction(module.currentState);
													 generationLoop(drawFunction);
											 }, 500);
				}
		}

		function newGeneration() {
				module.currentState = Life.nextGeneration(module.currentState);
		}

		function resetAllCells() {
				module.currentState = new Set();
		}

		function toggleCell(cell) {
				if(isAlive(cell)) {
						removeCell(cell);
				} else {
						addCell(cell);
				}
		}

		function isAlive(cell) {
				return module.currentState.contains(cell);
		}

		function removeCell(cell) {
				module.currentState.remove(cell);
		}

		function addCell(cell) {
				module.currentState.add(cell);
		}

		return module;
})();