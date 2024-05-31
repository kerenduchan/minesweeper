import { useContext, useState } from 'react'
import { GameSetting } from './GameSetting'
import { GameContext } from '../contexts/GameContext'
import { CustomForm } from './CustomForm'
import { gameService } from '../services/game.service'

export function GameSettings() {
    const [showCustomForm, setShowCustomForm] = useState(false)
    const { gameSettingId, onChangeGameSettingId } = useContext(GameContext)

    function onSettingClick(settingId) {
        setShowCustomForm(settingId === 'custom')
        onChangeGameSettingId(settingId)
    }

    const allPossibleGameSettings = [
        { id: 'beginner', title: 'Beginner' },
        { id: 'intermediate', title: 'Intermediate' },
        { id: 'expert', title: 'Expert' },
        { id: 'custom', title: 'Custom' },
    ]

    function onCustomFormSubmit(draft) {
        gameService.setCustomSettings(draft)
        onChangeGameSettingId('custom')
    }

    return (
        <>
            <ul className="game-settings">
                {allPossibleGameSettings.map((setting) => (
                    <GameSetting
                        key={setting.id}
                        setting={setting}
                        isSelected={setting.id === gameSettingId}
                        onClick={() => onSettingClick(setting.id)}
                    />
                ))}
            </ul>
            {showCustomForm && <CustomForm onSubmit={onCustomFormSubmit} />}
        </>
    )
}
