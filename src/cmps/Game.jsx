import { useState } from 'react'
import { gameService } from '../services/game.service'
import { Board } from './Board'
import { SmileyButton } from './SmileyButton'

export function Game() {
    const [game, setGame] = useState(gameService.getGame())

    function onRestartGame() {
        gameService.resetGame()
        setGame(gameService.getGame())
    }

    function onMouseDown(rowIdx, colIdx) {
        setCellMouseDown([rowIdx, colIdx])
    }

    function onMouseOver(rowIdx, colIdx) {
        if (game.cellMouseDown) {
            setCellMouseDown([rowIdx, colIdx])
        }
    }

    function onMouseUp(rowIdx, colIdx) {
        if (rowIdx === undefined) {
            gameService.setCellMouseDown(null)
        } else {
            gameService.exposeCell(rowIdx, colIdx)
        }
        setGame(gameService.getGame())
    }

    function setCellMouseDown(val) {
        gameService.setCellMouseDown(val)
        setGame(gameService.getGame())
    }

    return (
        <div className="game">
            <SmileyButton game={game} onClick={onRestartGame} />
            <Board
                game={game}
                onMouseDown={onMouseDown}
                onMouseOver={onMouseOver}
                onMouseUp={onMouseUp}
            />
        </div>
    )
}
