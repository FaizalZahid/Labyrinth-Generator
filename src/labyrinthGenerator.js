var labyrinthGenerator = function(rows, cols) {
    var self = this;

    var generator = new MazeGenerator(rows, cols);
    var originalGraph;

    this.graph = new Graph(rows * 2, cols * 2);

    var mapCellsToGrid = function(cell) {
        var x = cell.x * 2;
        var y = cell.y * 2;

        return {
            topLeft: self.graph.fetchCellAt(x, y),
            topRight: self.graph.fetchCellAt(x + 1, y),
            bottomLeft: self.graph.fetchCellAt(x, y + 1),
            bottomRight: self.graph.fetchCellAt(x + 1, y + 1)
        };            
    };

    var connectCells = function(cell1, cell2) {
        var cells1 = mapCellsToGrid(cell1);
        var cells2 = mapCellsToGrid(cell2);

        if (!originalGraph.cellsAreLinked(cell1, cell2)) {
            if (cell1.x < cell2.x) {
                self.graph.restoreEdgeBetween(cells1.topRight, cells1.bottomRight);
                self.graph.restoreEdgeBetween(cells2.topLeft, cells2.bottomLeft);

            } else if (cell1.x > cell2.x) {
                self.graph.restoreEdgeBetween(cells1.topLeft, cells1.bottomLeft);
                self.graph.restoreEdgeBetween(cells2.topRight, cells2.bottomRight);

            } else if (cell1.y > cell2.y) {
                self.graph.restoreEdgeBetween(cells1.topLeft, cells1.topRight);
                self.graph.restoreEdgeBetween(cells2.bottomLeft, cells2.bottomRight);

            } else if (cell1.y < cell2.y) {
                self.graph.restoreEdgeBetween(cells1.bottomLeft, cells1.bottomRight);
                self.graph.restoreEdgeBetween(cells2.topLeft, cells2.topRight);
            }

        } else {
            if (cell1.x < cell2.x) {
                self.graph.restoreEdgeBetween(cells1.topRight, cells2.topLeft);
                self.graph.restoreEdgeBetween(cells1.bottomRight, cells2.bottomLeft);

            } else if (cell1.x > cell2.x) {
                self.graph.restoreEdgeBetween(cells1.topLeft, cells2.topRight);
                self.graph.restoreEdgeBetween(cells1.bottomLeft, cells2.bottomRight);

            } else if (cell1.y > cell2.y) {
                self.graph.restoreEdgeBetween(cells1.topLeft, cells2.bottomLeft);
                self.graph.restoreEdgeBetween(cells1.topRight, cells2.bottomRight);

            } else if (cell1.y < cell2.y) {
                self.graph.restoreEdgeBetween(cells1.bottomLeft, cells2.topLeft);
                self.graph.restoreEdgeBetween(cells1.bottomRight, cells2.topRight);
            }
        }
    };

    this.build = function() {
        self.graph.cutAllEdges();
        generator.build();
        originalGraph = generator.graph;

        self.graph.restoreEdgeBetween(
            self.graph.fetchCellAt(0, 0),
            self.graph.fetchCellAt(1, 0)
        );

        for (var x = 0; x < rows; x++) {
            for (var y = 0; y < cols; y++) {
                var cell1 = originalGraph.fetchCellAt(x, y);
                var cell2 = originalGraph.fetchCellAt(x + 1, y);
                var cell3 = originalGraph.fetchCellAt(x, y + 1);

                if (cell2) {
                    connectCells(cell1, cell2);
                }
                if (cell3) {
                    connectCells(cell1, cell3);
                }
            }
        }
    };
};