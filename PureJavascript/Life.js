
var Life = (function() {
		var module = {};

		module.Cell = function (x, y) {
				this.x = x;
				this.y = y;
		};

		module.Cell.prototype.toKey = function() {
				return this.x + '_' + this.y;
		};

		module.CellState = function(cell, isCellAlive, liveNeighborCount) {
				this.cell = cell;
				this.isCellAlive = isCellAlive;
				this.liveNeighborCount = liveNeighborCount;
		};

		module.CellState.prototype.toKey = function() {
				return this.cell.toKey() + '_' + this.isCellAlive + '_' + this.liveNeighborCount;
		};

		module.nextGeneration = function(setOfLivingCells) {
				var cellsInPlay = new Set();
				setOfLivingCells.foreach( function(cell){
						var cellNeighborhood = neighborhood(cell);
						cellNeighborhood.foreach( function(neighboringCell){
								cellsInPlay.add(neighboringCell);
						});
				});

				var stateOfCellsInPlay = new Set();
				cellsInPlay.foreach( function(cellInPlay) {
						var stateOfCell = cellState(setOfLivingCells, cellInPlay);
						stateOfCellsInPlay.add(stateOfCell);
				});

				var survivingCells = new Set();
				stateOfCellsInPlay.foreach( function(state) {
						if (survives(state)) {
								var survivingCell = state.cell;
								survivingCells.add(survivingCell);
						}
				});

				return survivingCells;
		};

		function neighborhood (cell) {
				var x = cell.x;
				var y = cell.y;
				var neighborhood = new Set();
				for (var i=x-1; i<=x+1; i++){
						for (var j=y-1; j<=y+1; j++) {
								var neighbor = new module.Cell(i,j);
								neighborhood.add(neighbor);
						}
				}
				return neighborhood;
		}

		function neighbors(cell) {
				var myNeighbors = neighborhood(cell);
				myNeighbors.remove(cell);
				return myNeighbors;
		}

		function cellState(liveCells, cell) {
				var cellNeighbors = neighbors(cell);
				var liveNeighbors = cellNeighbors.intersection(liveCells);
				var liveNeighborCount = liveNeighbors.count();
				var isCellAlive = liveCells.contains(cell);
				return new module.CellState(cell, isCellAlive, liveNeighborCount);
		}

		function survives(state) {
				if (state.liveNeighborCount == 3) {
						return true;
				} else if (state.isCellAlive && state.liveNeighborCount == 2) {
						return true;
				} else {
						return false;
				}
		}

		return module;
})();