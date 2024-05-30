import { gameService } from '../services/game.service'

export function Cell({
    rowIdx,
    colIdx,
    onLeftMouseDown,
    onRightMouseDown,
    onMouseOver,
    onMouseUp,
}) {
    function onMouseDown(e) {
        switch (e.button) {
            case 0:
                // left-mouse-button-down
                onLeftMouseDown()
                break
            case 2:
                // right-mouse-button-down
                onRightMouseDown()
                break
        }
    }

    function onContextMenu(e) {
        e.preventDefault()
    }

    function getImg() {
        let cell = gameService.getGameCell(rowIdx, colIdx)
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
