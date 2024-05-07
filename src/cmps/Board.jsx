import { gameService } from '../services/game.service'

export function Board({ game, onMouseDown, onMouseOver, onMouseUp }) {
    const { cellMouseDown, cells } = game

    function getImg(rowIdx, colIdx) {
        let svgName = cells[rowIdx][colIdx]

        if (
            cellMouseDown &&
            cellMouseDown[0] === rowIdx &&
            cellMouseDown[1] === colIdx &&
            cells[rowIdx][colIdx] === 'un'
        ) {
            svgName = '00'
        }
        return `cells/${svgName}.svg`
    }

    return (
        <div className="board">
            {cells.map((row, rowIdx) => (
                <div className="row" key={rowIdx}>
                    {row.map((cell, colIdx) => (
                        <img
                            key={colIdx}
                            className="cell"
                            draggable="false"
                            src={getImg(rowIdx, colIdx)}
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
