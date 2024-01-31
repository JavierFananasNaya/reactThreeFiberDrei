export function getPlayerInitialPosition(firstCorridorArray: string | any[]) {
  // Generate a random index
  const randomIndex = Math.floor(Math.random() * firstCorridorArray.length);

  // Check if the value at the random index is "1"
  if (firstCorridorArray[randomIndex] === 1) {
    return randomIndex;
  } else {
    getPlayerInitialPosition(firstCorridorArray);
  }
}
export function getPickUpsPositions(
  numberOfPickUps: number,
  mazeData: number[][]
): Array<{ row: number; col: number } | null> {
  let pickUpsPositions: Array<{ row: number; col: number } | null> = [];
  for (let i = 0; i < numberOfPickUps; i++) {
    let position = getNextPosition(mazeData);
    if (position) {
      pickUpsPositions.push(position);
    }
  }
  return pickUpsPositions;
}

function getNextPosition(mazeData: number[][]): { row: number; col: number } | null {
  // Limiting the number of attempts 
  for (let attempts = 0; attempts < 100; attempts++) {
    const row = Math.floor(Math.random() * mazeData.length);
    const col = Math.floor(Math.random() * mazeData.length); 
    if (mazeData[row][col] === 1) {
      return { row, col };
    }
  }
  return null;
}
