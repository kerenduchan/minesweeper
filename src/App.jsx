import { Board } from './cmps/Board'

export function App() {
    let board = [
        ['00', '01', '02', '03', '04', '05', '06', '07', '08'],
        ['bb', 'bx', 'br', 'un', 'un', '00', '00', '00', '00'],
    ]
    return <Board board={board} />
}
