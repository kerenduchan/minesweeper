export function SmileyButton({ game, onClick }) {
    const { status } = game

    function getButtonClassName() {
        switch (status) {
            case 'lost':
                return 'smiley-sad'
            case 'danger':
                return 'smiley-scared'
            default:
                return 'smiley-happy-unpressed'
        }
    }

    return (
        <button
            className={`smiley-button ${getButtonClassName()}`}
            onClick={onClick}
        />
    )
}
