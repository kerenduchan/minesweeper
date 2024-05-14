import { SmileyButton } from './SmileyButton'

export function BoardTopbar({ game, onResetGame }) {
    return (
        <div className="board-topbar">
            <div className="outer-container" />

            <div className="corner-overlay">
                <div className="corner-tr" />
                <div className="corner-bl" />
            </div>

            <div className="inner-container">
                <SmileyButton game={game} onClick={onResetGame} />
            </div>
        </div>
    )
}
