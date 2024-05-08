import { useEffect, useCallback, useState } from 'react'
import { gameService } from '../services/game.service'

export function Board({ game, onCellMouseDown, onCellMouseUp, onBodyMouseUp }) {
    const { status, solution } = game

    const [mouseDownCell, setMouseDownCell] = useState(null)

    useEffect(() => {
        if (status === 'idle') {
            setMouseDownCell(null)
        }
    }, [status])

    useEffect(() => {
        document.addEventListener('mouseup', onBodyMouseUpInternal)
        return () => {
            document.removeEventListener('mouseup', onBodyMouseUpInternal)
        }
    }, [])

    const onBodyMouseUpInternal = useCallback(() => {
        onBodyMouseUp()
    })

    function onCellMouseUpInternal(e, rowIdx, colIdx) {
        e.stopPropagation()
        onCellMouseUp(rowIdx, colIdx)
    }

    function onCellMouseDownInternal(rowIdx, colIdx) {
        setMouseDownCell([rowIdx, colIdx])
        onCellMouseDown()
    }

    function onCellMouseOver(rowIdx, colIdx) {
        if (status === 'danger') {
            setMouseDownCell([rowIdx, colIdx])
        }
    }

    function onCellMouseOut() {
        setMouseDownCell(null)
    }

    function getImg(rowIdx, colIdx) {
        let cell = gameService.getGameCell(rowIdx, colIdx)

        if (
            mouseDownCell &&
            mouseDownCell[0] === rowIdx &&
            mouseDownCell[1] === colIdx &&
            cell === 'un'
        ) {
            cell = '00'
        }
        return `cells/${cell}.svg`
    }

    return (
        <div className="board">
            {solution.map((row, rowIdx) => (
                <div className="row" key={rowIdx}>
                    {row.map((cellSolution, colIdx) => (
                        <img
                            key={colIdx}
                            className="cell"
                            draggable="false"
                            src={getImg(rowIdx, colIdx)}
                            onMouseDown={() =>
                                onCellMouseDownInternal(rowIdx, colIdx)
                            }
                            onMouseOver={() => onCellMouseOver(rowIdx, colIdx)}
                            onMouseOut={onCellMouseOut}
                            onMouseUp={(e) =>
                                onCellMouseUpInternal(e, rowIdx, colIdx)
                            }
                        />
                    ))}
                </div>
            ))}
        </div>
    )
}
