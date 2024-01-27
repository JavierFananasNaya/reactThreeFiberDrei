export function getPlayerInitialPosition(firstCorridorArray) {
   // Generate a random index
   const randomIndex = Math.floor(Math.random() * firstCorridorArray.length);

   // Check if the value at the random index is "1"
    if(firstCorridorArray[randomIndex] === 1){
      return randomIndex
    } else {
      getPlayerInitialPosition(firstCorridorArray)
    }
}