import { useEffect, useState } from 'react';
import './CSS/App.css';
import Board from './components/Board';
import Results from './components/Results';
import Button from './components/Button';

function App() {
  const newGame = [0,1,2,3,4,5,6,7,8]

  const [gameState, setGameState] = useState<(string | number)[]>(newGame);
  const [winLose, setWinLose] = useState('')
  const [resultCounter, setResultCounter] = useState(
    {
      wins : 0,
      losses : 0,
      ties : 0
    }
  )

  useEffect(() => { //Increments result counter when game is over.
    if (winLose === 'You Win') setResultCounter(prevState => ({
      ...prevState,
      wins: prevState.wins++
    }))
    else if (winLose === 'You Lose') setResultCounter(prevState => ({
      ...prevState,
      losses: prevState.losses++
    }))
    else if (winLose === 'Draw') setResultCounter(prevState => ({
      ...prevState,
      ties: prevState.ties++
    }))
  }, [winLose])

  
  return (
    <div>
      <Board 
      gameState={gameState} 
      setGameState={setGameState}
      winLose={winLose}
      setWinLose = {setWinLose}
      />

      <Results 
      winLose={winLose}
      resultCounter={resultCounter}
      />

      <Button
      setGameState={setGameState}
      setWinLose={setWinLose}
      winLose={winLose}
      newGame={newGame}
      />
    </div>
  );
}

export default App;