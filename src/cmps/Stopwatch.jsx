import { useEffect, useRef, useState } from 'react'
import { gameService } from '../services/game.service'
import { Counter } from './Counter'

export function Stopwatch({ game }) {
    const [value, setValue] = useState(0)
    const intervalId = useRef(null)

    useEffect(() => {
        if (gameService.isGameInitial()) {
            setValue(0)
            stop()
            return
        }

        if (gameService.isGameOver()) {
            stop()
            return
        }

        if (game.status === 'idle' && !intervalId.current) {
            setValue(1)
            start()
        }
    }, [game])

    useEffect(() => stop, [])

    function stop() {
        clearInterval(intervalId.current)
        intervalId.current = null
    }

    function start() {
        intervalId.current = setInterval(() => {
            setValue(gameService.getStopwatchValue())
        }, 1000)
    }

    return <Counter value={value} />
}
