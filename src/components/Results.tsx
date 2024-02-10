import { ResultProps } from "../Types/types"

const Results = ({winLose, resultCounter} : ResultProps) => {
  return (
    <div className="results">
        <div className="resultMessage">
            {winLose}
        </div>

        <div className='resultCounter'>
            <div>{`wins: ${resultCounter.wins}`}</div>
            <div>{`losses: ${resultCounter.losses}`}</div>
            <div>{`ties: ${resultCounter.ties}`}</div>
        </div>
    </div>
  )
}
export default Results