export function SmileyButton({ game, onClick }) {
    function getButtonClassName() {
        if (game.cellMouseDown) {
            return 'smiley-scared'
        }
        return 'smiley-happy-unpressed'
    }

    return (
        <button
            className={`smiley-button ${getButtonClassName()}`}
            onClick={onClick}
        />
    )
}
