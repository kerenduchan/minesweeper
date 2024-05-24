import { useEffect, useState } from 'react'
import { gameService } from '../services/game.service'

export function CustomForm({ onSubmit }) {
    const [draft, setDraft] = useState(gameService.getCustomSettings())

    useEffect(() => {
        gameService.getCustomSettings()
    })

    function onChange(e) {
        setDraft((prev) => {
            const { id, value } = e.target
            return { ...prev, [id]: +value }
        })
    }

    function onSubmitInternal(e) {
        e.preventDefault()
        onSubmit(draft)
    }

    return (
        <form className="custom-form" onSubmit={onSubmitInternal}>
            <label htmlFor="height">Height</label>
            <input
                type="text"
                id="rowCount"
                value={draft.rowCount}
                onChange={onChange}
            />

            <label htmlFor="width">Width</label>
            <input
                type="text"
                id="colCount"
                value={draft.colCount}
                onChange={onChange}
            />

            <label htmlFor="mines">Mines</label>
            <input
                type="text"
                id="mineCount"
                value={draft.mineCount}
                onChange={onChange}
            />

            <button>Apply</button>
        </form>
    )
}
