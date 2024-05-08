import { useEffect, useState } from 'react'
import { gameService } from '../services/game.service'

export function Cell({
    rowIdx,
    colIdx,
    mouseDownCell,
    onMouseDown,
    onMouseOver,
    onMouseUp,
}) {
    const [isMouseDownOnCell, setIsMouseDownOnCell] = useState(false)

    useEffect(() => {
        setIsMouseDownOnCell(
            mouseDownCell &&
                rowIdx === mouseDownCell[0] &&
                colIdx === mouseDownCell[1]
        )
    }, [mouseDownCell])

    function getImg() {
        let cell = gameService.getGameCell(rowIdx, colIdx)

        if (isMouseDownOnCell && cell === 'un') {
            cell = '00'
        }
        return `cells/${cell}.svg`
    }

    return (
        <button
            className="cell"
            onMouseDown={onMouseDown}
            onMouseOver={onMouseOver}
            onMouseUp={onMouseUp}
        >
            <img draggable="false" src={getImg()} />
        </button>
    )
}
