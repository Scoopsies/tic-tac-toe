import { GameState, WinLose } from "../Types/types";

const availabileMoves = (gameState: GameState) => gameState.filter(value => value !== 'x' && value !== 'o')

export const computersTurn = (gameState: GameState):{ gameState: GameState; winStatus: WinLose } => {
  // Computer doesn't go again if human wins.
  if (checkWin(gameState)) return {gameState , winStatus : checkWin(gameState)} 

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
  let winMove = -1;
  let blockMove = -1;
  let bestMove = -1;
  let bestMoveIndex = -1;

  availabileMoves(gameState).forEach(move => {
    const newBoard = selectSquare(gameState, move as number, 'o');
    const score = miniMax(newBoard, 'x');

    if (checkWin(newBoard) === 'You Lose') {
      winMove = move as number
    }
    if (checkWin(selectSquare(gameState, move as number, 'x')) === 'You Win') {
      blockMove = move as number
    } 
    if (score > bestMove) {
      bestMove = score;
      bestMoveIndex = move as number;
    }
  })

  if (winMove !== -1) return selectSquare(gameState, winMove, 'o') // Returns move if imediate win
  if (blockMove !== -1) return selectSquare(gameState, blockMove, 'o') // Returns move if block
  return selectSquare(gameState, bestMoveIndex, 'o'); // Returns best move if none others possible
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

