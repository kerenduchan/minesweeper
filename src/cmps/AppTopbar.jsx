import { GameSettings } from './GameSettings'

export function AppTopbar({ onChangeGameSettings }) {
    return (
        <div className="app-topbar">
            <GameSettings onChangeGameSettings={onChangeGameSettings} />
        </div>
    )
}
