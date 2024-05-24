export function GameSetting({ setting, isSelected, onSelect }) {
    return (
        <li
            className={`game-setting ${isSelected ? 'selected' : ''}`}
            onClick={onSelect}
        >
            {setting.title}
        </li>
    )
}
