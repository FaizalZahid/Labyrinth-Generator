var Graph = function(width, height) {
  this.width = width;
  this.height = height;
  this.cells = [];
  this.removedEdges = [];

  var self = this;

  this.fetchCellAt = function(x, y) {
    if (x >= this.width || y >= this.height || x < 0 || y < 0) {
      return null;
    }
    if (!this.cells[x]) {
      return null;
    }
    return this.cells[x][y];
  };

  this.computeCellDistance = function(cell1, cell2) {
    var xDist = Math.abs(cell1.x - cell2.x);
    var yDist = Math.abs(cell1.y - cell2.y);
    return Math.sqrt(xDist * xDist + yDist * yDist);
  };

  // Returns true if there is an edge between cell1 and cell2
  this.cellsAreLinked = function(cell1, cell2) {
    if (!cell1 || !cell2) {
      return false;
    }
    if (
      Math.abs(cell1.x - cell2.x) > 1 ||
      Math.abs(cell1.y - cell2.y) > 1
    ) {
      return false;
    }

    var removedEdge = this.removedEdges.find(function(edge) {
      return edge.includes(cell1) && edge.includes(cell2);
    });

    return removedEdge === undefined;
  };

  this.findUnvisitedNeighbors = function(cell) {
    return this.findLinkedNeighbors(cell).filter(function(c) {
      return !c.visited;
    });
  };

  // Returns neighbors that ARE separated by an edge
  this.findLinkedNeighbors = function(cell) {
    return this.listNeighbors(cell).filter(function(c) {
      return self.cellsAreLinked(cell, c);
    });
  };

  // Returns neighbors that are NOT separated by an edge
  this.findUnlinkedNeighbors = function(cell) {
    return this.listNeighbors(cell).filter(function(c) {
      return !self.cellsAreLinked(cell, c);
    });
  };

  // Returns all neighbors regardless of connectivity
  this.listNeighbors = function(cell) {
    var neighbors = [];

    var topCell = this.fetchCellAt(cell.x, cell.y - 1);
    var rightCell = this.fetchCellAt(cell.x + 1, cell.y);
    var bottomCell = this.fetchCellAt(cell.x, cell.y + 1);
    var leftCell = this.fetchCellAt(cell.x - 1, cell.y);

    if (cell.y > 0 && topCell) neighbors.push(topCell);
    if (cell.x < this.width && rightCell) neighbors.push(rightCell);
    if (cell.y < this.height && bottomCell) neighbors.push(bottomCell);
    if (cell.x > 0 && leftCell) neighbors.push(leftCell);

    return neighbors;
  };

  this.cutEdgeBetween = function(cell1, cell2) {
    this.removedEdges.push([cell1, cell2]);
  };

  this.cutAllEdges = function() {
    for (var i = 0; i < this.width; i++) {
      for (var j = 0; j < this.height; j++) {
        var cell1 = this.fetchCellAt(i, j);
        var cell2 = this.fetchCellAt(i + 1, j);
        var cell3 = this.fetchCellAt(i, j + 1);

        if (cell2) this.removedEdges.push([cell1, cell2]);
        if (cell3) this.removedEdges.push([cell1, cell3]);
      }
    }
  };

  this.restoreEdgeBetween = function(cell1, cell2) {
    this.removedEdges = this.removedEdges.filter(function(edge) {
      return !(
        (edge[0] === cell1 && edge[1] === cell2) ||
        (edge[0] === cell2 && edge[1] === cell1)
      );
    });
  };

  for (var i = 0; i < this.width; i++) {
    this.cells.push([]);
    var row = this.cells[i];

    for (var j = 0; j < this.height; j++) {
      var cell = new Cell(i, j, this);
      row.push(cell);
    }
  }
};