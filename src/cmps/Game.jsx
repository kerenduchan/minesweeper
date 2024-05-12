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
        loadGame()
    }

    function onLeftMouseDown(rowIdx, colIdx) {
        if (gameService.isGameOver()) {
            return
        }
        gameService.setDangerCoords([rowIdx, colIdx])
        loadGame()
    }

    function onMouseOver(rowIdx, colIdx) {
        if (game.status !== 'danger') {
            return
        }
        gameService.setDangerCoords([rowIdx, colIdx])
        loadGame()
    }

    function onMouseUp(e, rowIdx, colIdx) {
        e.stopPropagation()
        if (game.status !== 'danger') {
            return
        }
        if (game.cellStates[rowIdx][colIdx] === 'fl') {
            // don't expose a flagged cell
            gameService.setGameStatus('idle')
        } else {
            gameService.exposeCell(rowIdx, colIdx)
        }
        loadGame()
    }

    function onRightMouseDown(rowIdx, colIdx) {
        if (gameService.isGameOver()) {
            return
        }

        gameService.markCell(rowIdx, colIdx)
        loadGame()
    }

    function onBoardMouseOut() {
        if (game.status !== 'danger') {
            return
        }
        gameService.setDangerCoords(null)
        loadGame()
    }
    function loadGame() {
        setGame(gameService.getGame())
    }

    return (
        <div className="game">
            <SmileyButton game={game} onClick={onResetGame} />
            <Board
                game={game}
                onLeftMouseDown={onLeftMouseDown}
                onMouseOver={onMouseOver}
                onMouseUp={onMouseUp}
                onRightMouseDown={onRightMouseDown}
                onBoardMouseOut={onBoardMouseOut}
            />
        </div>
    )
}
