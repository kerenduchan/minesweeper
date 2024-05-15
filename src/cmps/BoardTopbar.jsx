import { BevelledBox } from './BevelledBox'
import { Counter } from './Counter'
import { SmileyButton } from './SmileyButton'

export function BoardTopbar({ game, onResetGame }) {
    return (
        <div className="board-topbar">
            <BevelledBox isInset={true} bevelWidth={2} padding={4}>
                <Counter value={7} />
                <SmileyButton game={game} onClick={onResetGame} />
                <Counter value={0} />
            </BevelledBox>
        </div>
    )
}
