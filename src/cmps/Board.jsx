export function Board({ board, onMouseDown, onMouseOver, onMouseUp }) {
    function getImg(cell, rowIdx, colIdx) {
        let svgName = cell
        if (
            board.cellMouseDown &&
            board.cellMouseDown[0] === rowIdx &&
            board.cellMouseDown[1] === colIdx &&
            cell === 'un'
        ) {
            svgName = '00'
        }
        return `cells/${svgName}.svg`
    }

    return (
        <div className="board">
            {board.cells.map((row, rowIdx) => (
                <div className="row" key={rowIdx}>
                    {row.map((cell, colIdx) => (
                        <img
                            key={colIdx}
                            className="cell"
                            draggable="false"
                            src={getImg(cell, rowIdx, colIdx)}
                            onMouseDown={() => onMouseDown(rowIdx, colIdx)}
                            onMouseOver={() => onMouseOver(rowIdx, colIdx)}
                            onMouseUp={() => onMouseUp(rowIdx, colIdx)}
                        />
                    ))}
                </div>
            ))}
        </div>
    )
}
