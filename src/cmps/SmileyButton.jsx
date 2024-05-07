export function SmileyButton({ game, onClick }) {
    const { cellMouseDown, status } = game

    function getButtonClassName() {
        if (status === 'lost') {
            return 'smiley-sad'
        }

        if (cellMouseDown) {
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
