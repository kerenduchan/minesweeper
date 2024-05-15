import { useState } from 'react'
import { useInterval } from 'usehooks-ts'
import { gameService } from '../services/game.service'
import { Counter } from './Counter'

export function Stopwatch() {
    const [value, setValue] = useState(0)

    useInterval(
        () => {
            setValue(gameService.getStopwatchValue())
        },
        gameService.isGameOver() ? null : 1000
    )

    return <Counter value={value} />
}
