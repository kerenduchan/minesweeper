import { useEffect, useCallback, useState } from 'react'
import { gameService } from '../services/game.service'
import { GameContext } from '../contexts/GameContext'
import { Board } from './Board'
import { BoardTopbar } from './BoardTopbar'
import { BevelledBox } from './BevelledBox'
import { GameSettings } from './GameSettings'

export function Game() {
    const [game, setGame] = useState(gameService.getGame())
    const [gameSettingId, setGameSettingId] = useState(
        gameService.getGameSettingId()
    )

    useEffect(() => {
        document.addEventListener('mouseup', onBodyMouseUp)
        return () => {
            document.removeEventListener('mouseup', onBodyMouseUp)
        }
    }, [])

    const onBodyMouseUp = useCallback(() => {
        if (gameService.isGameOver() || gameService.isGameInitial()) {
            return
        }

        gameService.cancelDangerStatus()
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
        gameService.exposeCell(rowIdx, colIdx)
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

    function onChangeGameSettingId(settingId) {
        gameService.setGameSettingId(settingId)
        gameService.resetGame()

        setGameSettingId(gameService.getGameSettingId())
        setGame(gameService.getGame())
    }

    function loadGame() {
        setGame(gameService.getGame())
    }

    return (
        <GameContext.Provider
            value={{ game, setGame, gameSettingId, onChangeGameSettingId }}
        >
            <GameSettings />
            <div className="game">
                <BevelledBox isInset={false} bevelWidth={3} padding={6}>
                    <BoardTopbar game={game} onResetGame={onResetGame} />
                    <Board
                        game={game}
                        onLeftMouseDown={onLeftMouseDown}
                        onMouseOver={onMouseOver}
                        onMouseUp={onMouseUp}
                        onRightMouseDown={onRightMouseDown}
                        onBoardMouseOut={onBoardMouseOut}
                    />
                </BevelledBox>
            </div>
        </GameContext.Provider>
    )
}
