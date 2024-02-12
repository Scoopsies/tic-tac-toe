import { GameState, WinLose } from "../Types/types";

const availabileMoves = (gameState: GameState) => gameState.filter(value => value !== 'x' && value !== 'o') as number[]

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

  for (let i = 0; i < winConditions.length; i++) {
    const first = winConditions[i][0];
    const second = winConditions[i][1]
    const third = winConditions[i][2]

    if (gameState[first] === gameState[second] && gameState[second] === gameState[third]) {
      return gameState[first] === 'x' ? 'You Win' : 'You Lose'
    }
    
  }

  if (!availabileMoves(gameState).length) return 'Draw';

  return '';

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
    const newBoard = selectSquare(gameState, move, 'o');
    const score = miniMax(newBoard, 'x');

    if (checkWin(newBoard) === 'You Lose') {
      winMove = move
    }
    if (checkWin(selectSquare(gameState, move, 'x')) === 'You Win') {
      blockMove = move
    } 
    if (score > bestMove) {
      bestMove = score;
      bestMoveIndex = move;
    }
  })

  if (winMove !== -1) return selectSquare(gameState, winMove, 'o') // Returns move if imediate win
  if (blockMove !== -1) return selectSquare(gameState, blockMove, 'o') // Returns move if block
  return selectSquare(gameState, bestMoveIndex, 'o'); // Returns best move if none others possible
}

const miniMax = (gameState : GameState, player : 'x' | 'o') => {
  if (checkWin(gameState) === 'You Win') return -10; // Human / x wins
  if (checkWin(gameState) === 'You Lose') return 10; // Computer / o wins
  if (checkWin(gameState) === 'Draw') return 0;

  if (player === 'o') { // Computer / Max player
    let bestScore = -Infinity;
    availabileMoves(gameState).forEach(move => {
      const newBoard = selectSquare(gameState, move, 'o');
      const score = miniMax(newBoard, 'x');
      bestScore = Math.max(bestScore, score);
    });
    return bestScore;
  }

  let bestScore = Infinity; // Human / Min player
  availabileMoves(gameState).forEach(move => {
    const newBoard = selectSquare(gameState, move, 'x');
    const score = miniMax(newBoard, 'o');
    bestScore = Math.min(bestScore, score);
  });
  return bestScore;
}

