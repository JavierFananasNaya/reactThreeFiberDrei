export function getPlayerInitialPosition(firstCorridorArray) {
  // Generate a random index
  const randomIndex = Math.floor(Math.random() * firstCorridorArray.length);

  // Check if the value at the random index is "1"
  if (firstCorridorArray[randomIndex] === 1) {
    return randomIndex;
  } else {
    return getPlayerInitialPosition(firstCorridorArray);
  }
}

export function getPickUpsPositions(numberOfPickUps, mazeData) {
  let pickUpsPositions = [];
  for (let i = 0; i < numberOfPickUps; i++) {
    let position = getNextPosition(mazeData);
    if (position) {
      pickUpsPositions.push({ position, visible: true });
    }
  }
  return pickUpsPositions;
}

export function getNextPosition(mazeData) {
  // Limiting the number of attempts
  for (let attempts = 0; attempts < 100; attempts++) {
    const row = Math.floor(Math.random() * mazeData.length);
    const col = Math.floor(Math.random() * mazeData[0].length); // Fixed to accommodate varying column lengths
    if (mazeData[row][col] === 1) {
      return { row, col };
    }
  }
  return null;
}
