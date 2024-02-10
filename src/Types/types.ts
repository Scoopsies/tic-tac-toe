import React from "react"

export type GameState = {
    gameState : (string | number)[],
    setGameState : React.Dispatch<React.SetStateAction<(string | number)[]>>,
    setWinLose : React.Dispatch<React.SetStateAction<string>>,
    winLose : string
}

export type WinLose = {
    winLose : string,
    setWinLose : React.Dispatch<React.SetStateAction<string>>
}

export type ResultProps = {
    resultCounter: {
        wins: number;
        losses: number;
        ties: number;
    },
    winLose : string
}

export type ButtonProps = {
    setGameState: React.Dispatch<React.SetStateAction<(string | number)[]>>,
    setWinLose: React.Dispatch<React.SetStateAction<string>>,
    winLose: string
}


