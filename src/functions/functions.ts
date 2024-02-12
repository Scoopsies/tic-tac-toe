import { GameState, WinLose } from "../Types/types";

const availabileMoves = (gameState: GameState) => gameState.filter(value => value !== 'x' && value !== 'o')

export const computersTurn = (gameState: GameState):{ gameState: GameState; winStatus: WinLose } => {
  // Computer doesn't go again if human wins.
  if (checkWin(gameState)) return {gameState , winStatus : checkWin(gameState)} 

  // Checks if next move can result in win and takes it if so.
  const imediateWins : number[] = []
  availabileMoves(gameState).forEach(move => {
    const instantWinCheck = selectSquare(gameState, move as number, 'o')
    if (checkWin(instantWinCheck) === 'You Lose') imediateWins.push(move as number)
  })
  if (imediateWins.length) {
    return {gameState: selectSquare(gameState, imediateWins[0], 'o'), winStatus : 'You Lose'}
  } 
  
  // Returns best possible move if imediate win can't be played.
  const computersMove = aiLogic(gameState)
  return {gameState: computersMove, winStatus : checkWin(computersMove)}
};

export const checkWin = (gameState: GameState) => {
  const winConditions = [
    [0, 1, 2], [3, 4, 5],[6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagnals
  ]

  let winStatus = ''

  winConditions.forEach((condition) => { 
    if (!condition.filter(value => gameState[value] !== 'x').length) winStatus = 'You Win'  //Human wins
    if (!condition.filter(value => gameState[value] !== 'o').length) winStatus = 'You Lose' //Computer wins
    else if (!availabileMoves(gameState).length) winStatus = 'Draw'
  })

  return winStatus as WinLose;
}

export const selectSquare = (gameState: GameState, posistion: number, player : 'x' | 'o') => {
  const board = [...gameState];
  board[posistion] = player;
  return board;
};

export const aiLogic = (gameState: GameState) => {  
  let bestMove = -Infinity;
  let bestMoveIndex = -1;


  availabileMoves(gameState).forEach(move => {
    const newBoard = selectSquare(gameState, move as number, 'o');
    const score = miniMax(newBoard, 'x');
    if (checkWin(selectSquare(gameState, move as number, 'x')) === 'You Win') {
      bestMoveIndex = move as number
    }
    else if (score > bestMove) {
      bestMove = score;
      bestMoveIndex = move as number;
    }
  });

  return selectSquare(gameState, bestMoveIndex, 'o');
}

const miniMax = (gameState : GameState, player : 'x' | 'o') => {
  if (checkWin(gameState) === 'You Win') return -1; // Human / x wins
  if (checkWin(gameState) === 'You Lose') return 1; // Computer / o wins
  if (checkWin(gameState) === 'Draw') return 0;

  if (player === 'o') { // Computer / Max player
    let bestScore = -Infinity;
    availabileMoves(gameState).forEach(move => {
      const newBoard = selectSquare(gameState, move as number, 'o');
      const score = miniMax(newBoard, 'x');
      bestScore = Math.max(bestScore, score);
    });
    return bestScore;
  }

  let bestScore = Infinity; // Human / Min player
  availabileMoves(gameState).forEach(move => {
    const newBoard = selectSquare(gameState, move as number, 'x');
    const score = miniMax(newBoard, 'o');
    bestScore = Math.min(bestScore, score);
  });
  return bestScore;
}

