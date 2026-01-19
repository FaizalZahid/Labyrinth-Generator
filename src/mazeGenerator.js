var MazeGenerator = function(rows, cols) {
	this.graph = new Graph(rows, cols);
	this.cellStack = [];

	var self = this;

	var walk = function(cell) {
		cell.visit();
		var neighbors = self.graph.findUnvisitedNeighbors(cell);
		if (neighbors.length > 0) {
			var randomNeighbor = neighbors[Math.floor(Math.random() * neighbors.length)];
			self.cellStack.push(cell);
			self.graph.cutEdgeBetween(cell, randomNeighbor);
			walk(randomNeighbor);
		} else {
			var backtrackCell = self.cellStack.pop();
			if (backtrackCell) {
				walk(backtrackCell);
			}
		}
	};

	this.build = function() {
		var startCell = this.graph.fetchCellAt(0, 0);
		walk(startCell);
	};
};