export const gameService = {
    getGame,
    resetGame,
    cancelDangerStatus,
    getGameCell,
    isGameOver,
    isGameInitial,
    exposeCell,
    markCell,
    setDangerCoords,
    getStopwatchValue,
    getBombCounterValue,
}

// GAME MODEL

// status:
// - idle    = game in progress, no win or loss, no mouse down.
// - danger  = mouse down on one of the cells, and no mouse up yet
// - lost    = game over with a loss (stepped on bomb)
// - won     = game over with a win (all non-bomb cells have been exposed)

// solution:
// The cells of the board, if they were all exposed.
// 00-08 = non-bomb cells
// bb = bomb

// cellStates:
// 'un' = unexposed and unmarked
// 'fl' = unexposed and marked with a flag
// 'qq' = unexposed and marked with a question mark
// 'ex' = exposed

// bombsCount:
// How many bombs there are in the solution of the game.

// dangerCoords:
// Coordinates of the danger cell - mouse down was clicked, mouse is
// currently hovering over this cell, no mouse up yet)

// explodedBombCoords:
// Coordinates of the bomb that was stepped on that resulted in the game
// being lost.

// startTime:
// null if the game hasn't started yet, or the timestamp of when the first
// cell was exposed.

let gGame
resetGame()

function getGame() {
    return gGame
}

function resetGame() {
    const solution = [
        ['00', '01', 'bb', '01', '00', '00', '00', '00'],
        ['00', '01', '01', '01', '00', '00', '00', '00'],
        ['02', '02', '01', '00', '00', '00', '00', '00'],
        ['bb', 'bb', '01', '00', '01', '01', '01', '00'],
        ['02', '02', '01', '00', '01', 'bb', '02', '01'],
        ['00', '00', '00', '00', '01', '03', 'bb', '02'],
        ['00', '00', '00', '00', '00', '03', 'bb', '03'],
        ['00', '00', '00', '00', '00', '02', 'bb', '02'],
    ]

    gGame = {
        status: 'idle',

        solution,

        cellStates: [
            ['un', 'un', 'un', 'un', 'un', 'un', 'un', 'un'],
            ['un', 'un', 'un', 'un', 'un', 'un', 'un', 'un'],
            ['un', 'un', 'un', 'un', 'un', 'un', 'un', 'un'],
            ['un', 'un', 'un', 'un', 'un', 'un', 'un', 'un'],
            ['un', 'un', 'un', 'un', 'un', 'un', 'un', 'un'],
            ['un', 'un', 'un', 'un', 'un', 'un', 'un', 'un'],
            ['un', 'un', 'un', 'un', 'un', 'un', 'un', 'un'],
            ['un', 'un', 'un', 'un', 'un', 'un', 'un', 'un'],
        ],

        bombsCount: _countBombs(solution),
        dangerCoords: null,
        explodedBombCoords: null,
        startTime: null,
    }
}

function cancelDangerStatus() {
    gGame = { ...gGame, status: 'idle', dangerCoords: null }
}

function exposeCell(rowIdx, colIdx) {
    const cellState = gGame.cellStates[rowIdx][colIdx]

    // don't expose a flagged cell or an exposed cell
    if (['fl', 'ex'].includes(cellState)) {
        cancelDangerStatus()
        return
    }

    // handle the case where a bomb was stepped on
    const cellSolution = gGame.solution[rowIdx][colIdx]
    if (cellSolution === 'bb') {
        gGame = {
            ...gGame,
            status: 'lost',
            explodedBombCoords: [rowIdx, colIdx],
        }
        return
    }

    // recursively expose this cell and its neighbors as needed
    const newGame = structuredClone(gGame)
    _exposeCell(newGame, rowIdx, colIdx)

    if (!newGame.startTime) {
        newGame.startTime = Date.now()
    }

    const isGameWon = _isGameWon(newGame)
    newGame.status = isGameWon ? 'won' : 'idle'

    if (isGameWon) {
        _flagAllBombs(newGame)
    }

    gGame = newGame
}

function getGameCell(rowIdx, colIdx) {
    const { status, solution, cellStates, dangerCoords, explodedBombCoords } =
        gGame

    const cellState = cellStates[rowIdx][colIdx]
    const cellSolution = solution[rowIdx][colIdx]

    if (status === 'lost') {
        // when the game is lost, all bombs are exposed.
        // the bomb that was stepped on, which caused the loss, is red.
        // a non-bomb cell that was flagged is displayed as a bomb with a red x.
        // a bomb cell that was flagged is displayed as a flag.

        if (cellSolution === 'bb') {
            if (
                explodedBombCoords[0] == rowIdx &&
                explodedBombCoords[1] === colIdx
            ) {
                // the bomb that was stepped on, which caused the loss, is red
                return 'br'
            }
            if (cellState === 'fl') {
                // a bomb cell that was flagged is displayed as a flag.
                return 'fl'
            }
            // expose the bomb
            return 'bb'
        }
        if (cellState === 'fl') {
            // a non-bomb cell that was flagged is displayed as a bomb with
            // a red x.
            return 'bx'
        }
    }

    // exposed cell
    if (cellState === 'ex') {
        return cellSolution
    }

    // danger cell
    if (
        dangerCoords &&
        dangerCoords[0] === rowIdx &&
        dangerCoords[1] === colIdx
    ) {
        switch (cellState) {
            case 'un':
                return '00'
            case 'qq':
                return 'qp'
        }
    }

    return cellState
}

function isGameOver() {
    return ['lost', 'won'].includes(gGame.status)
}

function isGameInitial() {
    const { status, startTime } = gGame
    return status === 'idle' && !startTime
}

function markCell(rowIdx, colIdx) {
    const curCellState = gGame.cellStates[rowIdx][colIdx]
    let newCellState
    switch (curCellState) {
        case 'un':
            newCellState = 'fl'
            break
        case 'fl':
            newCellState = 'un'
            break
    }

    if (!newCellState) {
        return
    }

    const newGame = { ...gGame, cellStates: structuredClone(gGame.cellStates) }
    newGame.cellStates[rowIdx][colIdx] = newCellState
    gGame = newGame
}

function setDangerCoords(coords) {
    gGame = {
        ...gGame,
        status: 'danger',
        dangerCoords: coords,
    }
}

function _exposeCell(game, rowIdx, colIdx) {
    game.cellStates[rowIdx][colIdx] = 'ex'
    if (game.solution[rowIdx][colIdx] !== '00') {
        return
    }

    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            const newRowIdx = rowIdx + i
            const newColIdx = colIdx + j
            if (
                (i === 0 && j === 0) ||
                newRowIdx < 0 ||
                newRowIdx >= game.solution.length ||
                newColIdx < 0 ||
                newColIdx >= game.solution[0].length ||
                game.cellStates[newRowIdx][newColIdx] !== 'un'
            ) {
                continue
            }
            _exposeCell(game, newRowIdx, newColIdx)
        }
    }
}

function getStopwatchValue() {
    const { startTime } = gGame
    if (!startTime) {
        return 0
    }
    return Math.ceil((Date.now() - startTime) / 1000)
}

function getBombCounterValue() {
    return gGame.bombsCount - _countFlags()
}

function _countBombs(solution) {
    return _countCells(solution, 'bb')
}

function _countFlags() {
    return _countCells(gGame.cellStates, 'fl')
}

function _countCells(matrix, value) {
    const res = matrix.reduce(
        (acc, row) =>
            acc +
            row.reduce((rowAcc, cell) => rowAcc + (cell === value ? 1 : 0), 0),
        0
    )
    return res
}

function _isGameWon(game) {
    const { solution, cellStates } = game
    return solution.every((row, rowIdx) =>
        row.every(
            (cell, colIdx) =>
                cell === 'bb' || cellStates[rowIdx][colIdx] === 'ex'
        )
    )
}

function _flagAllBombs(game) {
    game.solution.forEach((row, rowIdx) =>
        row.forEach((cell, colIdx) => {
            if (cell === 'bb') {
                game.cellStates[rowIdx][colIdx] = 'fl'
            }
        })
    )
}
