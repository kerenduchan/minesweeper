import { GameContext } from './contexts/GameContext'
import { AppTopbar } from './cmps/AppTopbar'
import { Game } from './cmps/Game'
import { useState } from 'react'
import { gameService } from './services/game.service'

export function App() {
    const [game, setGame] = useState(gameService.getGame())
    const [gameSettings, setGameSettings] = useState(
        gameService.getGameSettings()
    )

    function onChangeGameSettings(newGameSettings) {
        gameService.setGameSettingsAndResetGame(newGameSettings)
        setGameSettings(gameService.getGameSettings())
        setGame(gameService.getGame())
    }

    return (
        <GameContext.Provider value={{ game, setGame, gameSettings }}>
            <div className="app">
                <AppTopbar onChangeGameSettings={onChangeGameSettings} />
                <Game />
            </div>
        </GameContext.Provider>
    )
}
