import { useEffect, useState } from 'react'
import { gameService } from '../services/game.service'

export function Cell({ game, rowIdx, colIdx, onMouseUp, onMouseDown }) {
    const { status } = game

    const [isMouseDownOnCell, setIsMouseDownOnCell] = useState(false)

    useEffect(() => {
        if (status === 'idle') {
            setIsMouseDownOnCell(false)
        }
    }, [status])

    function onMouseDownInternal() {
        setIsMouseDownOnCell(true)
        onMouseDown()
    }

    function onMouseOver() {
        if (status === 'danger') {
            setIsMouseDownOnCell(true)
        }
    }

    function onMouseOut() {
        setIsMouseDownOnCell(false)
    }

    function onMouseUpInternal(e) {
        setIsMouseDownOnCell(false)
        onMouseUp(e)
    }

    function getImg() {
        let cell = gameService.getGameCell(rowIdx, colIdx)

        if (isMouseDownOnCell && cell === 'un') {
            cell = '00'
        }
        return `cells/${cell}.svg`
    }

    return (
        <img
            className="cell"
            draggable="false"
            src={getImg()}
            onMouseDown={onMouseDownInternal}
            onMouseOver={onMouseOver}
            onMouseOut={onMouseOut}
            onMouseUp={onMouseUpInternal}
        />
    )
}
