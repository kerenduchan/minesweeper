export function Board({ board }) {
    return (
        <div className="board">
            {board.map((row) => (
                <div className="row">
                    {row.map((cell) => (
                        <img className="cell" src={`${cell}.svg`} />
                    ))}
                </div>
            ))}
        </div>
    )
}
