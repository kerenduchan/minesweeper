import { useContext, useState } from 'react'
import { GameSetting } from './GameSetting'
import { GameContext } from '../contexts/GameContext'
import { CustomForm } from './CustomForm'

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
