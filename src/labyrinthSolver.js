var labyrinthSolver = function() {
  var self = this;

  this.solve = function(graph, targetCell) {
    var closedSet = [];
    var startCell = graph.fetchCellAt(0, 0); // top left cell

    if (!targetCell) {
      targetCell = graph.fetchCellAt(
        graph.width - 1,
        graph.height - 1
      ); // bottom right cell
    }

    var openSet = [startCell];
    var searchCell = startCell;
    var path;

    while (openSet.length > 0) {
      var neighbors = graph.findUnlinkedNeighbors(searchCell);

      for (var i = 0; i < neighbors.length; i++) {
        var neighbor = neighbors[i];

        if (neighbor === targetCell) {
          neighbor.parent = searchCell;
          path = neighbor.pathToOrigin();
          openSet = [];
          return path;
        }

        if (!closedSet.includes(neighbor)) {
          if (!openSet.includes(neighbor)) {
            openSet.push(neighbor);
            neighbor.parent = searchCell;
            neighbor.heuristic =
              neighbor.score() +
              graph.computeCellDistance(neighbor, targetCell);
          }
        }
      }

      closedSet.push(searchCell);

      var index = openSet.indexOf(searchCell);
      if (index !== -1) {
        openSet.splice(index, 1);
      }

      searchCell = null;

      openSet.forEach(function(cell) {
        if (!searchCell || searchCell.heuristic > cell.heuristic) {
          searchCell = cell;
        }
      });
    }
  };
};