import { Cell } from './Cell'

export function Board({ game, onCellMouseDown, onCellMouseUp }) {
    const { solution } = game

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
                            onMouseUp={(e) => onCellMouseUp(e, rowIdx, colIdx)}
                        />
                    ))}
                </div>
            ))}
        </div>
    )
}
