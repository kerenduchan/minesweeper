export function GameSetting({ setting, isSelected, onClick }) {
    return (
        <li
            className={`game-setting ${isSelected ? 'selected' : ''}`}
            onClick={onClick}
        >
            {setting.title}
        </li>
    )
}
