import { SmileyButton } from './SmileyButton'

export function BoardTopbar({ game, onResetGame }) {
    return <SmileyButton game={game} onClick={onResetGame} />
}
