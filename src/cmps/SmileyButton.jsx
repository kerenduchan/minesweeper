export function SmileyButton({ game, onClick }) {
    const { status } = game

    function onClickInternal(e) {
        e.stopPropagation()
        onClick()
    }

    function getButtonClassName() {
        switch (status) {
            case 'lost':
                return 'smiley-sad'
            case 'won':
                return 'smiley-sunglasses'
            case 'danger':
                return 'smiley-scared'
            default:
                return 'smiley-happy-unpressed'
        }
    }

    return (
        <button
            className={`smiley-button ${getButtonClassName()}`}
            onClick={onClickInternal}
        />
    )
}
