export const gameService = {
    getGame,
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
}

function getGame() {
    const { solution, cellMouseDown } = gGame
    const cells = solution.map((row, rowIdx) =>
        row.map((cell, colIdx) => _getGameCell(rowIdx, colIdx))
    )
    return {
        cells,
        cellMouseDown,
    }
}

function setCellMouseDown(val) {
    gGame.cellMouseDown = val
    return getGame()
}

function exposeCell(rowIdx, colIdx) {
    // TODO: expose cell
    return setCellMouseDown(null)
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
