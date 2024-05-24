import { useContext, useState } from 'react'
import { GameSetting } from './GameSetting'
import { GameContext } from '../contexts/GameContext'
import { CustomForm } from './CustomForm'

export function GameSettings() {
    const [showCustomForm, setShowCustomForm] = useState(false)
    const { gameSettings, onChangeGameSettings } = useContext(GameContext)

    function onSettingClick(settingId) {
        if (settingId === 'custom') {
            setShowCustomForm(true)
            return
        }
        // beginner / intermediate / expert
        setShowCustomForm(false)
        onChangeGameSettings(settingId)
    }

    const allPossibleGameSettings = [
        { id: 'beginner', title: 'Beginner' },
        { id: 'intermediate', title: 'Intermediate' },
        { id: 'expert', title: 'Expert' },
        { id: 'custom', title: 'Custom' },
    ]

    function isSelected(settingId) {
        if (showCustomForm) {
            return settingId === 'custom'
        }
        return gameSettings.preset === settingId
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
            {showCustomForm && <CustomForm />}
        </>
    )
}
