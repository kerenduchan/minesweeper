import { useContext, useEffect, useState } from 'react'
import { GameSetting } from './GameSetting'
import { gameService } from '../services/game.service'
import { GameContext } from '../contexts/GameContext'

export function GameSettings() {
    const settings = [
        {
            id: 'beginner',
            title: 'Beginner',
            rowCount: 8,
            colCount: 8,
            bombCount: 10,
        },
        {
            id: 'intermediate',
            title: 'Intermediate',
            rowCount: 16,
            colCount: 16,
            bombCount: 40,
        },
        {
            id: 'expert',
            title: 'Expert',
            rowCount: 16,
            colCount: 30,
            bombCount: 99,
        },
    ]

    const [selected, setSelected] = useState(settings[0])
    const { setGame } = useContext(GameContext)

    useEffect(() => {
        const { bombCount, rowCount, colCount } = selected
        gameService.resetGame(bombCount, rowCount, colCount)
        setGame(gameService.getGame())
    }, [selected])

    function onSelect(setting) {
        setSelected(setting)
    }

    return (
        <ul className="game-settings">
            {settings.map((setting) => (
                <GameSetting
                    key={setting.id}
                    setting={setting}
                    isSelected={selected.id === setting.id}
                    onSelect={onSelect}
                />
            ))}
        </ul>
    )
}
