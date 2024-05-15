import { BevelledBox } from './BevelledBox'
import { Cell } from './Cell'

export function Board({
    game,
    onLeftMouseDown,
    onRightMouseDown,
    onMouseOver,
    onMouseUp,
    onBoardMouseOut,
}) {
    const { solution } = game

    return (
        <div className="board" onMouseOut={onBoardMouseOut}>
            <BevelledBox isInset={true} bevelWidth={3}>
                {solution.map((row, rowIdx) => (
                    <div className="row" key={rowIdx}>
                        {row.map((cellSolution, colIdx) => (
                            <Cell
                                key={colIdx}
                                rowIdx={rowIdx}
                                colIdx={colIdx}
                                onLeftMouseDown={() =>
                                    onLeftMouseDown(rowIdx, colIdx)
                                }
                                onRightMouseDown={() =>
                                    onRightMouseDown(rowIdx, colIdx)
                                }
                                onMouseOver={() => onMouseOver(rowIdx, colIdx)}
                                onMouseUp={(e) => onMouseUp(e, rowIdx, colIdx)}
                            />
                        ))}
                    </div>
                ))}
            </BevelledBox>
        </div>
    )
}
