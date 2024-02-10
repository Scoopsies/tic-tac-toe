import { ButtonProps } from "../Types/types"

const Button = ({setGameState, setWinLose, winLose, newGame} : ButtonProps) => {

  return (
    <div className='buttonContainer'>
        <button className='button' onClick={() => {
          setGameState(newGame)
          setWinLose('')
        }}>
            {winLose ? 'New Game' : 'Reset'}
        </button>
    </div>
  )
}
export default Button