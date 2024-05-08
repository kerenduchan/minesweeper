import { useState } from 'react'
import { gameService } from '../services/game.service'
import { Board } from './Board'
import { SmileyButton } from './SmileyButton'

export function Game() {
    const [game, setGame] = useState(gameService.getGame())

    function onResetGame() {
        gameService.resetGame()
        setGame(gameService.getGame())
    }

    function onCellMouseDown() {
        gameService.setGameStatus('danger')
        setGame(gameService.getGame())
    }

    function onCellMouseUp(rowIdx, colIdx) {
        gameService.exposeCell(rowIdx, colIdx)
        setGame(gameService.getGame())
    }

    function onBodyMouseUp() {
        gameService.setGameStatus('idle')
        setGame(gameService.getGame())
    }

    return (
        <div className="game">
            <SmileyButton game={game} onClick={onResetGame} />
            <Board
                game={game}
                onCellMouseDown={onCellMouseDown}
                onCellMouseUp={onCellMouseUp}
                onBodyMouseUp={onBodyMouseUp}
            />
        </div>
    )
}
