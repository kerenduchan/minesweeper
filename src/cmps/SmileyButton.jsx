import { useState, useEffect } from 'react'

export function SmileyButton({ game }) {
    const [imgSrc, setImgSrc] = useState('smiley-happy-unpressed')

    useEffect(() => {
        if (game.cellMouseDown) {
            setImgSrc('smiley-scared')
        } else {
            setImgSrc('smiley-happy-unpressed')
        }
    }, [game.cellMouseDown])

    function onMouseDown() {
        setImgSrc('smiley-happy-pressed')
    }

    function onMouseUp() {
        setImgSrc('smiley-happy-unpressed')
    }

    return (
        <img
            className="smiley-button"
            src={`smileys/${imgSrc}.svg`}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
        />
    )
}
