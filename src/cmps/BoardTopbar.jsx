import { BevelledBox } from './BevelledBox'
import { SmileyButton } from './SmileyButton'

export function BoardTopbar({ game, onResetGame }) {
    return (
        <div className="board-topbar">
            <BevelledBox isInset={true} bevelWidth={2} padding={4}>
                <SmileyButton game={game} onClick={onResetGame} />
            </BevelledBox>
        </div>
    )
}
