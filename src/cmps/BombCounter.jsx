import { useEffect, useState } from 'react'
import { gameService } from '../services/game.service'
import { Counter } from './Counter'

export function BombCounter({ game }) {
    const [value, setValue] = useState(0)

    useEffect(() => {
        setValue(gameService.getBombCounterValue())
    }, [game])

    return <Counter value={value} />
}
