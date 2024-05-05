import { Board } from './cmps/Board'

export function App() {
    let board = [
        ['n-1', 'n-2', 'n-3', 'n-4', 'n-5', 'n-0', 'n-1'],
        ['n-0', 'n-4', 'n-0', 'n-2', 'n-3', 'n-0', 'n-0'],
    ]
    return <Board board={board} />
}
