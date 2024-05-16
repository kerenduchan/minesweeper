import { BevelledBox } from './BevelledBox'
import { SmileyButton } from './SmileyButton'
import { BombCounter } from './BombCounter'
import { Stopwatch } from './Stopwatch'

export function BoardTopbar({ game, onResetGame }) {
    return (
        <div className="board-topbar">
            <BevelledBox isInset={true} bevelWidth={2} padding={4}>
                <BombCounter game={game} />
                <SmileyButton game={game} onClick={onResetGame} />
                <Stopwatch game={game} />
            </BevelledBox>
        </div>
    )
}
