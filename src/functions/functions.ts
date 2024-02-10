
export const newGame = () => {
  return [0, 1, 2, 3, 4, 5, 6, 7, 8];
};

const human = 'x';
const computer = 'o'

export const checkWin = (gameState: (string | number)[]) => {
  const winConditions = [
    [0, 1, 2], [3, 4, 5],[6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ]
  
  let result = false;

  winConditions.forEach((condition) => {
    if (!condition.filter(value => gameState[value] !== human).length) {
      console.log('win');  
      result = true;
    }
    if (!condition.filter(value => gameState[value] !== computer).length) {
      console.log('lose') 
      result = true
    }
  })
  console.log(result)
  return result;
}

export const computersTurn = (gameState: (string | number)[]) => {
  

  // const humanPlacements = gameState
  // .map((value, index) => value === 'x' ? index : 'o')
  // .filter(value => value != 'o')

  // const compPlacements = gameState
  // .map((value, index) => value === 'o' ? index : 'x')
  // .filter(value => value != 'x')

  const availableMoves = gameState.filter(value => value != 'x' && value != 'o')

  if (!availableMoves.length) return {gameState, winStatus : 'Draw'}

  if (checkWin(gameState)) return {gameState , winStatus : 'You Win'} // Checks if human won before executing rest.

  const randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)]
  const computersMove = selectSquare(gameState, randomMove as number, 'o')
  console.log('computers move', computersMove)
  const winStatus = checkWin(computersMove) ? 'You Lose' : ''
  return {gameState: computersMove, winStatus}
};

export const selectSquare = (gameState: (string | number)[], num: number, player : string) => {
  const newState = [...gameState];
  newState[num] = player;
  checkWin(gameState)
  return newState;
};