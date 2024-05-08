import { useState } from 'react'
import { Cell } from './Cell'
import { gameService } from '../services/game.service'

export function Board({ game, onCellMouseDown, onCellMouseUp, onCellMark }) {
    const { solution, status } = game

    const [mouseDownCell, setMouseDownCell] = useState(null)

    function onMouseLeftDown(rowIdx, colIdx) {
        if (gameService.isGameOver()) {
            return
        }

        setMouseDownCell([rowIdx, colIdx])
        onCellMouseDown(rowIdx, colIdx)
    }

    function onCellMouseOver(rowIdx, colIdx) {
        if (status !== 'danger') {
            return
        }
        setMouseDownCell([rowIdx, colIdx])
    }

    function onCellMouseUpInternal(e, rowIdx, colIdx) {
        if (status !== 'danger') {
            return
        }
        setMouseDownCell(null)
        onCellMouseUp(e, rowIdx, colIdx)
    }

    function onBoardMouseOut() {
        if (gameService.isGameOver()) {
            return
        }
        setMouseDownCell(null)
    }

    return (
        <div className="board" onMouseOut={onBoardMouseOut}>
            {solution.map((row, rowIdx) => (
                <div className="row" key={rowIdx}>
                    {row.map((cellSolution, colIdx) => (
                        <Cell
                            key={colIdx}
                            rowIdx={rowIdx}
                            colIdx={colIdx}
                            mouseDownCell={mouseDownCell}
                            onMouseLeftDown={() =>
                                onMouseLeftDown(rowIdx, colIdx)
                            }
                            onMouseRightDown={() => onCellMark(rowIdx, colIdx)}
                            onMouseOver={() => onCellMouseOver(rowIdx, colIdx)}
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
