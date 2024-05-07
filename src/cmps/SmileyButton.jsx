export function SmileyButton({ game }) {
    function getImgSrc() {
        let type = 'smiley-happy-unpressed'
        if (game.cellMouseDown) {
            type = 'smiley-scared'
        }
        return `smileys/${type}.svg`
    }
    return <img className="smiley-button" src={getImgSrc()} />
}
