import { useContext } from 'react'
import { GameSetting } from './GameSetting'
import { GameContext } from '../contexts/GameContext'

export function GameSettings() {
    const allPossibleGameSettings = [
        { id: 'beginner', title: 'Beginner' },
        { id: 'intermediate', title: 'Intermediate' },
        { id: 'expert', title: 'Expert' },
    ]

    const { gameSettings, onChangeGameSettings } = useContext(GameContext)

    return (
        <ul className="game-settings">
            {allPossibleGameSettings.map((setting) => (
                <GameSetting
                    key={setting.id}
                    setting={setting}
                    isSelected={gameSettings.preset === setting.id}
                    onSelect={() => onChangeGameSettings(setting.id)}
                />
            ))}
        </ul>
    )
}
