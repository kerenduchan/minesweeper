import { useEffect, useState } from 'react'
import { gameService } from '../services/game.service'

export function Cell({
    rowIdx,
    colIdx,
    mouseDownCell,
    onMouseLeftDown,
    onMouseOver,
    onMouseUp,
    onMouseRightDown,
}) {
    const [isMouseDownOnCell, setIsMouseDownOnCell] = useState(false)

    useEffect(() => {
        setIsMouseDownOnCell(
            mouseDownCell &&
                rowIdx === mouseDownCell[0] &&
                colIdx === mouseDownCell[1]
        )
    }, [mouseDownCell])

    function onMouseDown(e) {
        switch (e.button) {
            case 0:
                // left-click
                onMouseLeftDown()
                break
            case 2:
                onMouseRightDown()
                break
        }
    }

    function onContextMenu(e) {
        e.preventDefault()
    }

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
            onContextMenu={onContextMenu}
        >
            <img draggable="false" src={getImg()} />
        </button>
    )
}
