import { GameContext } from './contexts/GameContext'
import { AppTopbar } from './cmps/AppTopbar'
import { Game } from './cmps/Game'
import { useState } from 'react'
import { gameService } from './services/game.service'

export function App() {
    const [game, setGame] = useState(gameService.getGame())

    return (
        <GameContext.Provider value={{ game, setGame }}>
            <div className="app">
                <AppTopbar />
                <Game />
            </div>
        </GameContext.Provider>
    )
}
