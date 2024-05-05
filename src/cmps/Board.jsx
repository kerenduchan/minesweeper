export function Board({ board }) {
    return (
        <div className="board">
            {board.map((row, rowIdx) => (
                <div className="row" key={rowIdx}>
                    {row.map((cell, cellIdx) => (
                        <img
                            key={cellIdx}
                            className="cell"
                            src={`cells/${cell}.svg`}
                        />
                    ))}
                </div>
            ))}
        </div>
    )
}
