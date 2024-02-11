import { selectSquare, computersTurn } from "../functions/functions"
import { BoardProps} from "../Types/types";

const Board = ({
  gameState, 
  setGameState, 
  winLose,
  setWinLose
} : BoardProps) => {

  const handleSelectSquare = (num: number) => {
    const humansMove = selectSquare(gameState, num, 'x');
    const compMove = computersTurn(humansMove);
    setGameState(compMove.gameState);
    setWinLose(compMove.winStatus);
  };

  return (
    <div>
      <div className='board'>
        {gameState.map((value, index) => (
          <button 
            key={index} 
            className='square' 
            disabled={winLose != '' || gameState[index] != index} 
            onClick={() => handleSelectSquare(index)}
          >
            {value === index ? '' : value}
          </button>
        ))}
      </div>
    </div>
  )
}
export default Board