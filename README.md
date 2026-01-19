# Labyrinth-Generator
A labyrinth (maze) generator. Open-source code from a section (Self-Help) in House of Hikmah website (Labyrinth Therapy).

Also includes labyrinth solver!

Example of usage:
```
<body>
    <div>
        <p id="please-wait">Generating labyrinth...</p>
        <canvas id="maze" width="600" height="600"></canvas>
    </div>

    <script src="src/array.js"></script>
    <script src="src/cell.js"></script>
    <script src="src/graph.js"></script>
    <script src="src/labyrinthGenerator.js"></script>
    <script src="src/labyrinthSolver.js"></script>
    <script src="src/maze.js"></script>
    <script src="src/mazeGenerator.js"></script>
    <script>
      var maze = new Maze(document, 'maze');
      var generator = new labyrinthGenerator(15, 15);

      var waitElem = document.getElementById('please-wait');

      setTimeout(function() {
        generator.build();
        maze.draw(generator.graph);

        if (waitElem) {
          waitElem.remove();
        }
      }, 1000);
    </script>

</body>
```
