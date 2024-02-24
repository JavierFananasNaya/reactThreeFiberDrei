const directions = [
  { dx: 0, dy: -2 }, // Up
  { dx: 0, dy: 2 }, // Down
  { dx: -2, dy: 0 }, // Left
  { dx: 2, dy: 0 }, // Right
];

class MazeGenerator {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.grid = this.initializeGrid();
  }

  initializeGrid() {
    const grid = [];
    for (let i = 0; i < this.height; i++) {
      grid[i] = new Array(this.width).fill(0);
    }
    return grid;
  }

  generateMaze() {
    this.recursiveBacktracking(1, 1);
    this.createRandomPaths(40);
    return this.grid;
  }

  recursiveBacktracking(x, y) {
    this.grid[y][x] = 1; // Mark the current cell as visited

    for (const dir of this.shuffle(directions)) {
      const newX = x + dir.dx;
      const newY = y + dir.dy;

      if (this.isInside(newX, newY) && this.grid[newY][newX] === 0) {
        // Carve a path
        this.grid[y + dir.dy / 2][x + dir.dx / 2] = 1;
        this.recursiveBacktracking(newX, newY);
      }
    }
  }

  createRandomPaths(numberOfPaths) {
    let availableWalls = [];

    // Identify potential walls to convert into paths, excluding the border
    for (let i = 2; i < this.height - 2; i += 2) {
      for (let j = 2; j < this.width - 2; j += 2) {
        if (this.grid[i][j] === 0) {
          availableWalls.push({ x: j, y: i });
        }
      }
    }

    // Shuffle the array of walls to ensure randomness
    this.shuffle(availableWalls);

    // Convert the specified number of walls into paths and ensure connectivity
    for (let i = 0; i < Math.min(numberOfPaths, availableWalls.length); i++) {
      let wall = availableWalls[i];
      this.grid[wall.y][wall.x] = 1; // Convert the wall into a path

      // Ensure connectivity by checking adjacent cells and converting one if necessary
      let neighbors = [
        { dx: 0, dy: -1 }, // Up
        { dx: 0, dy: 1 }, // Down
        { dx: -1, dy: 0 }, // Left
        { dx: 1, dy: 0 }, // Right
      ];

      this.shuffle(neighbors); // Shuffle neighbors to randomize the direction of connectivity

      for (const dir of neighbors) {
        const newX = wall.x + dir.dx;
        const newY = wall.y + dir.dy;

        // Check if the neighbor is a wall and within bounds, then convert it into a path
        if (this.isInside(newX, newY) && this.grid[newY][newX] === 0) {
          this.grid[newY][newX] = 1;
          break; // Break after converting one neighbor to ensure only one path is created for connectivity
        }
      }
    }
  }

  shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  isInside(x, y) {
    return x >= 0 && x < this.width && y >= 0 && y < this.height;
  }
}

export { MazeGenerator };
