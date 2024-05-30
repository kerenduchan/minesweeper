import { BevelledBox } from './BevelledBox'
import { SmileyButton } from './SmileyButton'
import { MineCounter } from './MineCounter'
import { Stopwatch } from './Stopwatch'

export function BoardTopbar({ game, onResetGame }) {
    return (
        <div className="board-topbar">
            <BevelledBox isInset={true} bevelWidth={2} padding={4}>
                <MineCounter game={game} />
                <SmileyButton game={game} onClick={onResetGame} />
                <Stopwatch game={game} />
            </BevelledBox>
        </div>
    )
}
