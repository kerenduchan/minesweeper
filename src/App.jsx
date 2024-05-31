import { GameContext } from './contexts/GameContext'
import { AppTopbar } from './cmps/AppTopbar'
import { Game } from './cmps/Game'
import { useState } from 'react'
import { gameService } from './services/game.service'

export function App() {
    const [game, setGame] = useState(gameService.getGame())
    const [gameSettingId, setGameSettingId] = useState(
        gameService.getGameSettingId()
    )

    function onChangeGameSettingId(settingId) {
        gameService.setGameSettingId(settingId)
        gameService.resetGame()

        setGameSettingId(gameService.getGameSettingId())
        setGame(gameService.getGame())
    }

    return (
        <GameContext.Provider
            value={{ game, setGame, gameSettingId, onChangeGameSettingId }}
        >
            <div className="app">
                <AppTopbar />
                <Game />
            </div>
        </GameContext.Provider>
    )
}
