import { useContext, useState } from 'react'
import { GameSetting } from './GameSetting'
import { GameContext } from '../contexts/GameContext'
import { CustomForm } from './CustomForm'
import { gameService } from '../services/game.service'

export function GameSettings() {
    const [showCustomForm, setShowCustomForm] = useState(false)
    const { gameSettings, onChangeGameSettings } = useContext(GameContext)

    function onSettingClick(settingId) {
        setShowCustomForm(settingId === 'custom')
        onChangeGameSettings(settingId)
    }

    const allPossibleGameSettings = [
        { id: 'beginner', title: 'Beginner' },
        { id: 'intermediate', title: 'Intermediate' },
        { id: 'expert', title: 'Expert' },
        { id: 'custom', title: 'Custom' },
    ]

    function isSelected(settingId) {
        return settingId === gameSettings.preset
    }

    function onCustomFormSubmit(draft) {
        gameService.setCustomSettings({ preset: 'custom', ...draft })
        onChangeGameSettings('custom')
    }

    return (
        <>
            <ul className="game-settings">
                {allPossibleGameSettings.map((setting) => (
                    <GameSetting
                        key={setting.id}
                        setting={setting}
                        isSelected={isSelected(setting.id)}
                        onClick={() => onSettingClick(setting.id)}
                    />
                ))}
            </ul>
            {showCustomForm && <CustomForm onSubmit={onCustomFormSubmit} />}
        </>
    )
}
