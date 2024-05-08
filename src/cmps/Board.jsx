import { useEffect, useCallback } from 'react'
import { Cell } from './Cell'

export function Board({ game, onCellMouseDown, onCellMouseUp, onBodyMouseUp }) {
    const { status, solution } = game

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

    return (
        <div className="board">
            {solution.map((row, rowIdx) => (
                <div className="row" key={rowIdx}>
                    {row.map((cellSolution, colIdx) => (
                        <Cell
                            key={colIdx}
                            game={game}
                            rowIdx={rowIdx}
                            colIdx={colIdx}
                            onMouseDown={() => onCellMouseDown(rowIdx, colIdx)}
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
