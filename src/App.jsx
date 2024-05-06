import { useState } from 'react'
import { gameService } from './services/game.service'
import { Board } from './cmps/Board'

export function App() {
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
        <Board
            game={game}
            onMouseDown={onMouseDown}
            onMouseOver={onMouseOver}
            onMouseUp={onMouseUp}
        />
    )
}
