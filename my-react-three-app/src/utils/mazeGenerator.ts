export class MazeGenerator {
  width: number;
  height: number;
  grid: number[][];

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.grid = this.initializeGrid();
  }

  private initializeGrid(): number[][] {
    const grid: number[][] = [];
    for (let i = 0; i < this.height; i++) {
      grid[i] = new Array(this.width).fill(0);
    }
    return grid;
  }

  generateMaze() {
    this.recursiveBacktracking(0, 0);
    this.connectEntrances();
    this.printMaze();
    return this.grid;
  }

  private recursiveBacktracking(x: number, y: number) {
    const directions = [
      { dx: 0, dy: -2 }, // Up
      { dx: 0, dy: 2 }, // Down
      { dx: -2, dy: 0 }, // Left
      { dx: 2, dy: 0 }, // Right
    ];

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

  private connectEntrances() {
    // Connect the top and bottom entrances
    const topEntrance = { x: Math.floor(Math.random() * this.width), y: 0 };
    const bottomEntrance = {
      x: Math.floor(Math.random() * this.width),
      y: this.height - 1,
    };

    this.grid[topEntrance.y][topEntrance.x] = 1;
    this.grid[bottomEntrance.y][bottomEntrance.x] = 1;

    // Connect the entrances with a path
    const pathX = topEntrance.x + Math.sign(bottomEntrance.x - topEntrance.x);
    this.grid[topEntrance.y + 1][pathX] = 1;
  }

  private shuffle<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  private isInside(x: number, y: number): boolean {
    return x >= 0 && x < this.width && y >= 0 && y < this.height;
  }

  printMaze() {
    for (let row of this.grid) {
      console.log(row.map((cell) => (cell === 1 ? "1" : "0")).join(""));
    }
  }
}

