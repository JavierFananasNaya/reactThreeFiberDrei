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
