var Canvas = (function() {

		var module = {};

		function transformCellCoordinatesIntoCanvasCoordinates(cellSideInPixels, cell) {
				var centerX = Math.floor((cell.x * cellSideInPixels) + (cellSideInPixels/2));
				var centerY = Math.floor((cell.y * cellSideInPixels) + (cellSideInPixels/2));
				return [centerX, centerY];
		}
		
		function cellIsWithinViewableCanvas(width, height, canvasCoordinatePair) {
				return (canvasCoordinatePair[0] >= 0) && (canvasCoordinatePair[1] <= width) && (canvasCoordinatePair[1] >= 0) && (canvasCoordinatePair[1] <= height);
		}

		function drawSmallCircleAtPoint(ctx, cellSideInPixels, canvasCoordinatePair) {
				var radius = Math.floor((cellSideInPixels - 2) / 2);
				var startAngle = 0;
				var endAngle = Math.PI * 2;
				ctx.beginPath();
				ctx.arc(canvasCoordinatePair[0], canvasCoordinatePair[1], radius, startAngle, endAngle, true);
				ctx.closePath();
				ctx.stroke();
		}

		function drawLife(context, width, height, cellSide, gameState) {
				context.save();
				context.clearRect(0, 0, width, height);
				context.fillStyle = "#8EE5EE";
				context.fillRect(0, 0, width, height);
				context.save();

				context.strokeStyle = "black";
				context.fillStyle = "black";
				context.lineWidth = 1;

				gameState.foreach( function(cell) {
						var canvasCoordinatesOfCell = transformCellCoordinatesIntoCanvasCoordinates(cellSide, cell);
						if (cellIsWithinViewableCanvas(width, height, canvasCoordinatesOfCell)) {
								drawSmallCircleAtPoint(context, cellSide, canvasCoordinatesOfCell);
						}
				});
				context.save();
		}

		function transformCanvasCoordinatesIntoCellCoordinates(canvasX, canvasY, cellSide, cellXOffset, cellYOffset) {
				var x = Math.floor( (canvasX / cellSide) - cellXOffset );
				var y = Math.floor( (canvasY / cellSide) - cellYOffset );
				return new Life.Cell(x,y);
		}

		function adjustInitArrayAndRedraw(context, width, height, cellSide, cellXOffset, cellYOffset, evt) {
				var cell = transformCanvasCoordinatesIntoCellCoordinates(evt.clientX, evt.clientY, cellSide, cellXOffset, cellYOffset);
				var drawLifeFunction = function(gameState) {
						drawLife(context, width, height, cellSide, gameState);
				}
				Game.toggleCellAndRedraw(cell, drawLifeFunction);
		}

		var canvas = document.createElement('canvas'); 
		var context = canvas.getContext("2d"); 

		module.Go = null;
		module.Stop = null;
		module.Reset = null;

		module.initialize = function(width, height, cellSide, cellXOffset, cellYOffset) {
				if(typeof(canvas.getContext) == 'undefined') {
						G_vmlCanvasManager.initElement(canvas); //for IE6 
				}
				canvas.width = width;
				canvas.height = height;

				var clickReporter = function(evt) {
						adjustInitArrayAndRedraw(context, width, height, cellSide, cellXOffset, cellYOffset, evt);
				};
				context.canvas.addEventListener('click', clickReporter, false);
				drawLife(context, width, height, cellSide, Game.currentState);
				module.Go = function(evt) {
						Game.startDrawing(function(state) { drawLife(context, width, height, cellSide, state);	});
				};
				module.Stop = function(evt) { Game.stopDrawing(); };
				module.Reset = function(evt) {
						Game.stopDrawingAndReset(function(state) { drawLife(context, width, height, cellSide, state); });
				};
		};

		module.nodes = function() {
				var outerDiv = document.createElement('div');
				outerDiv.setAttribute('width', canvas.width);
				outerDiv.setAttribute('style', 'float:left; clear:both;');
				
				var innerDiv = document.createElement('div');
				innerDiv.setAttribute('style', 'float:center;');
				innerDiv.appendChild(canvas);
				outerDiv.appendChild(innerDiv);

				return outerDiv;
		};

		return module;
})();