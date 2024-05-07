import { useState } from 'react'
import { gameService } from '../services/game.service'
import { Board } from './Board'
import { SmileyButton } from './SmileyButton'

export function Game() {
    const [game, setGame] = useState(gameService.getGame())

    function onMouseDown(rowIdx, colIdx) {
        setCellMouseDown([rowIdx, colIdx])
    }

    function onMouseOver(rowIdx, colIdx) {
        if (game.cellMouseDown) {
            setCellMouseDown([rowIdx, colIdx])
        }
    }

    function onMouseUp(rowIdx, colIdx) {
        const newGame = gameService.exposeCell(rowIdx, colIdx)
        setGame(newGame)
    }

    function setCellMouseDown(val) {
        const newGame = gameService.setCellMouseDown(val)
        setGame(newGame)
    }

    return (
        <div className="game">
            <SmileyButton game={game} />
            <Board
                game={game}
                onMouseDown={onMouseDown}
                onMouseOver={onMouseOver}
                onMouseUp={onMouseUp}
            />
        </div>
    )
}
