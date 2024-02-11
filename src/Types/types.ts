import React from "react"

export type GameState = ('x' | 'o' | number)[]
export type WinLose = ('You Win' | 'You Lose' | 'Draw' | '')

export type BoardProps = {
    gameState: GameState,
    setGameState: React.Dispatch<React.SetStateAction<('x' | 'o' | number)[]>>,
    setWinLose: React.Dispatch<React.SetStateAction<WinLose>>, 
    winLose: WinLose 
}

export type ComputersReturn = {
    winLose : string,
    setWinLose : React.Dispatch<React.SetStateAction<WinLose>>
}

export type ResultProps = {
    resultCounter: {
        wins: number;
        losses: number;
        ties: number;
    },
    winLose : WinLose
}

export type ButtonProps = {
    setGameState: React.Dispatch<React.SetStateAction<( 'x' | 'o' | number)[]>>,
    setWinLose: React.Dispatch<React.SetStateAction<WinLose>>,
    winLose: string,
    newGame: number[]
}


