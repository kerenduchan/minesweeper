import { useState } from 'react'
import { Board } from './cmps/Board'

export function App() {
    const defaultBoard = {
        cells: [
            ['00', '01', '02', '03', '04', '05', '06', '07', '08'],
            ['bb', 'bx', 'br', 'un', 'un', 'fl', '00', '00', '00'],
        ],
        cellMouseDown: null,
    }

    const [board, setBoard] = useState(defaultBoard)

    function onMouseDown(rowIdx, colIdx) {
        setCellMouseDown([rowIdx, colIdx])
    }

    function onMouseOver(rowIdx, colIdx) {
        if (board.cellMouseDown) {
            setCellMouseDown([rowIdx, colIdx])
        }
    }

    function onMouseUp(rowIdx, colIdx) {
        // TODO: expose cell
        setCellMouseDown(null)
    }

    function setCellMouseDown(val) {
        setBoard((prev) => ({ ...prev, cellMouseDown: val }))
    }

    return (
        <Board
            board={board}
            onMouseDown={onMouseDown}
            onMouseOver={onMouseOver}
            onMouseUp={onMouseUp}
        />
    )
}
