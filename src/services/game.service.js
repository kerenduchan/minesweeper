export const gameService = {
    getGame,
    resetGame,
    setCellMouseDown,
    exposeCell,
}

const gGame = {
    solution: [
        ['00', '01', 'bb', '01'],
        ['00', '01', '01', '01'],
        ['02', '02', '01', '00'],
        ['bb', 'bb', '01', '00'],
    ],

    // 'un' = unexposed and unflagged
    // 'fl' = unexposed and flagged
    // 'ex' = exposed
    state: [
        ['un', 'un', 'un', 'un'],
        ['un', 'un', 'un', 'un'],
        ['un', 'un', 'un', 'un'],
        ['un', 'un', 'un', 'un'],
    ],

    cellMouseDown: null,
    status: 'playing',
}

function getGame() {
    const { solution, cellMouseDown, status } = gGame
    const cells = solution.map((row, rowIdx) =>
        row.map((cell, colIdx) => _getGameCell(rowIdx, colIdx))
    )
    return {
        cells,
        cellMouseDown,
        status,
    }
}

function resetGame() {
    gGame.cellMouseDown = null
    gGame.state = [
        ['un', 'un', 'un', 'un'],
        ['un', 'un', 'un', 'un'],
        ['un', 'un', 'un', 'un'],
        ['un', 'un', 'un', 'un'],
    ]
}

function setCellMouseDown(val) {
    gGame.cellMouseDown = val
}

function exposeCell(rowIdx, colIdx) {
    _exposeCell(rowIdx, colIdx)
    setCellMouseDown(null)
    if (gGame.solution[rowIdx][colIdx] === 'bb') {
        gGame.status = 'lost'
    }
}

function _getGameCell(rowIdx, colIdx) {
    const { solution, state } = gGame
    const cellState = state[rowIdx][colIdx]
    switch (cellState) {
        case 'ex':
            // TODO: translate wrong bombs
            return solution[rowIdx][colIdx]
        default:
            return cellState
    }
}

function _exposeCell(rowIdx, colIdx) {
    gGame.state[rowIdx][colIdx] = 'ex'
    if (gGame.solution[rowIdx][colIdx] !== '00') {
        return
    }

    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            const newRowIdx = rowIdx + i
            const newColIdx = colIdx + j
            if (
                (i === 0 && j === 0) ||
                newRowIdx < 0 ||
                newRowIdx >= gGame.solution.length ||
                newColIdx < 0 ||
                newColIdx >= gGame.solution[0].length ||
                gGame.state[newRowIdx][newColIdx] !== 'un'
            ) {
                continue
            }
            _exposeCell(newRowIdx, newColIdx)
        }
    }
}
