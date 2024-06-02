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

    function getImgClass() {
        return 'cell-' + gameService.getGameCell(rowIdx, colIdx)
    }

    return (
        <button
            className={'cell ' + getImgClass()}
            onMouseDown={onMouseDown}
            onMouseOver={onMouseOver}
            onMouseUp={onMouseUp}
            onContextMenu={onContextMenu}
        />
    )
}
