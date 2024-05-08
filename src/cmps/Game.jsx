import { useState, useEffect, useCallback } from 'react'
import { gameService } from '../services/game.service'
import { Board } from './Board'
import { SmileyButton } from './SmileyButton'

export function Game() {
    const [game, setGame] = useState(gameService.getGame())

    useEffect(() => {
        document.addEventListener('mouseup', onBodyMouseUp)
        return () => {
            document.removeEventListener('mouseup', onBodyMouseUp)
        }
    }, [])

    const onBodyMouseUp = useCallback(() => {
        if (gameService.isGameOver()) {
            return
        }

        gameService.setGameStatus('idle')
        setGame(gameService.getGame())
    })

    function onResetGame() {
        gameService.resetGame()
        setGame(gameService.getGame())
    }

    function onCellMouseDown() {
        gameService.setGameStatus('danger')
        setGame(gameService.getGame())
    }

    function onCellMouseUp(e, rowIdx, colIdx) {
        e.stopPropagation()
        gameService.exposeCell(rowIdx, colIdx)
        setGame(gameService.getGame())
    }

    function onCellMark(rowIdx, colIdx) {
        gameService.markCell(rowIdx, colIdx)
        setGame(gameService.getGame())
    }

    return (
        <div className="game">
            <SmileyButton game={game} onClick={onResetGame} />
            <Board
                game={game}
                onCellMouseDown={onCellMouseDown}
                onCellMouseUp={onCellMouseUp}
                onCellMark={onCellMark}
            />
        </div>
    )
}
