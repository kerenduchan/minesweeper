import { useState } from 'react'
import { useInterval } from 'usehooks-ts'
import { BevelledBox } from './BevelledBox'
import { Counter } from './Counter'
import { SmileyButton } from './SmileyButton'
import { gameService } from '../services/game.service'

export function BoardTopbar({ game, onResetGame }) {
    const [stopwatchValue, setStopwatchValue] = useState(0)

    useInterval(
        () => {
            setStopwatchValue(gameService.getStopwatchValue())
        },
        gameService.isGameOver() ? null : 1000
    )

    return (
        <div className="board-topbar">
            <BevelledBox isInset={true} bevelWidth={2} padding={4}>
                <Counter value={7} />
                <SmileyButton game={game} onClick={onResetGame} />
                <Counter value={stopwatchValue} />
            </BevelledBox>
        </div>
    )
}
