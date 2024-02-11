type Gamestate = ('x' | 'o' | number)[]

export const computersTurn = (gameState: Gamestate) => {
  const gameOver = checkWin(gameState)
  if (gameOver) return {gameState , winStatus : gameOver} // Computer doesn't go again if human wins.


  // Checks if imediate win is possible and takes it.
  const availableMoves = gameState.filter(value => value !== 'x' && value !== 'o');
  const imediateWins : number[] = []
  availableMoves.forEach(move => {
    const instantWinCheck = selectSquare(gameState, move as number, 'o')
    if (checkWin(instantWinCheck) === 'You Lose') imediateWins.push(move as number)
  })
  if (imediateWins.length) {
    console.log('imediate win found')
    return {gameState: selectSquare(gameState, imediateWins[0], 'o'), winStatus : 'You Lose'}
  } 
  
  const computersMove = aiLogic(gameState)
  return {gameState: computersMove, winStatus : checkWin(computersMove)}
};

export const checkWin = (gameState: Gamestate) => {
  const winConditions = [
    [0, 1, 2], [3, 4, 5],[6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ]

  let winStatus = ''
  let winAchieved = false;

  winConditions.forEach((condition) => { 
    if (!condition.filter(value => gameState[value] !== 'x').length || //Human wins
    !condition.filter(value => gameState[value] !== 'o').length  //Computer wins
    ) {
      winAchieved = true;
    }
  })

  winConditions.forEach((condition) => {
  if (!condition.filter(value => gameState[value] !== 'x').length) winStatus = 'You Win';
  if (!condition.filter(value => gameState[value] !== 'o').length) winStatus = 'You Lose';
  else if (
    !gameState.filter(value => value != 'x' && value != 'o').length &&
    !winAchieved
    ) winStatus = 'Draw'
  })

  return winStatus;
}

export const selectSquare = (gameState: Gamestate, posistion: number, player : 'x' | 'o') => {
  const board = [...gameState];
  board[posistion] = player;
  return board;
};

export const aiLogic = (gameState: Gamestate) => {  
  const availableMoves = gameState.filter(value => value !== 'x' && value !== 'o');
  let bestMove = -Infinity;
  let bestMoveIndex = -1;

  availableMoves.forEach(move => {
    const newBoard = selectSquare(gameState, move as number, 'o');
    const score = miniMax(newBoard, 'x');
    if (score > bestMove) {
      bestMove = score;
      bestMoveIndex = move as number;
    }
  });

  return selectSquare(gameState, bestMoveIndex, 'o');
}

const miniMax = (gameState : Gamestate, player : 'x' | 'o') => {
  if (checkWin(gameState) === 'You Win') return -10; // Human / x wins
  if (checkWin(gameState) === 'You Lose') return 10; // Computer / o wins
  if (checkWin(gameState) === 'Draw') return 0;

  const availableMoves = gameState.filter(value => value !== 'x' && value !== 'o');

  if (player === 'o') { //Computer / Max player
    let bestScore = -Infinity;
    availableMoves.forEach(move => {
      const newBoard = selectSquare(gameState, move as number, 'o');
      const score = miniMax(newBoard, 'x');
      bestScore = Math.max(bestScore, score);
    });
    return bestScore;
  }

  let bestScore = Infinity; //Human / Min player
  availableMoves.forEach(move => {
    const newBoard = selectSquare(gameState, move as number, 'x');
    const score = miniMax(newBoard, 'o');
    bestScore = Math.min(bestScore, score);
  });
  return bestScore;
}