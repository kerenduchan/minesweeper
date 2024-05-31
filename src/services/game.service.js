export const gameService = {
    getGame,
    getGameSettings,
    getCustomSettings,
    setCustomSettings,
    setGameSettingsAndResetGame,
    resetGame,
    cancelDangerStatus,
    getGameCell,
    isGameOver,
    isGameInitial,
    exposeCell,
    markCell,
    setDangerCoords,
    getStopwatchValue,
    getMineCounterValue,
}

// GAME MODEL (gGame)

// status:
// - idle    = game in progress, no win or loss, no mouse down.
// - danger  = mouse down on one of the cells, and no mouse up yet
// - lost    = game over with a loss (stepped on mine)
// - won     = game over with a win (all non-mine cells have been exposed)

// solution:
// The cells of the board, if they were all exposed.
// 00-08 = non-mine cells
// mm = mine

// cellStates:
// 'un' = unexposed and unmarked
// 'fl' = unexposed and marked with a flag
// 'qq' = unexposed and marked with a question mark
// 'ex' = exposed

// mineCount:
// How many mines there are in the solution of the game.

// dangerCoords:
// Coordinates of the danger cell - mouse down was clicked, mouse is
// currently hovering over this cell, no mouse up yet)

// explodedMineCoords:
// Coordinates of the mine that was stepped on that resulted in the game
// being lost.

// startTime:
// null if the game hasn't started yet, or the timestamp of when the first
// cell was exposed.

const _presets = {
    beginner: {
        rowCount: 8,
        colCount: 8,
        mineCount: 10,
    },
    intermediate: {
        rowCount: 16,
        colCount: 16,
        mineCount: 40,
    },
    expert: {
        rowCount: 16,
        colCount: 30,
        mineCount: 99,
    },
}

// preset (beginner/intermediate/expert/custom), rowCount, colCount, mineCount
// of the current game
let gGameSettings

// rowCount, colCount, mineCount for custom mode
let gCustomSettings = _presets.beginner

// the current game. See GAME MODEL comment above.
let gGame

setGameSettingsAndResetGame('beginner')

function getGame() {
    return gGame
}

function getGameSettings() {
    return gGameSettings
}

function getCustomSettings() {
    return gCustomSettings
}

function setCustomSettings(settings) {
    gCustomSettings = settings
}

function setGameSettingsAndResetGame(settingId) {
    const settings =
        settingId === 'custom' ? getCustomSettings() : _presets[settingId]

    gGameSettings = { settingId, ...settings }
    resetGame()
}

// reset the game based on the current game settings
function resetGame() {
    const { rowCount, colCount, mineCount } = gGameSettings
    const solution = _generateGameSolution(mineCount, rowCount, colCount)
    let cellStates = []
    for (let i = 0; i < rowCount; i++) {
        cellStates.push(new Array(colCount).fill('un'))
    }

    gGame = {
        status: 'idle',
        solution,
        cellStates,
        mineCount,
        dangerCoords: null,
        explodedMineCoords: null,
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

    // handle the case where a mine was stepped on
    const cellSolution = gGame.solution[rowIdx][colIdx]
    if (cellSolution === 'mm') {
        gGame = {
            ...gGame,
            status: 'lost',
            explodedMineCoords: [rowIdx, colIdx],
        }
        return
    }

    // Post condition: cell is not a mine, not flagged and not exposed.
    // Iteratively expose this cell and its neighbors as needed
    const newGame = structuredClone(gGame)
    _exposeCell(newGame, rowIdx, colIdx)

    // Start the game timer in case it hasn't been started yet
    if (!newGame.startTime) {
        newGame.startTime = Date.now()
    }

    // Check if the game has been won
    const isGameWon = _isGameWon(newGame)
    newGame.status = isGameWon ? 'won' : 'idle'
    if (isGameWon) {
        _flagAllMines(newGame)
    }

    // Update the game model
    gGame = newGame
}

function getGameCell(rowIdx, colIdx) {
    const { status, solution, cellStates, dangerCoords, explodedMineCoords } =
        gGame

    const cellState = cellStates[rowIdx][colIdx]
    const cellSolution = solution[rowIdx][colIdx]

    if (status === 'lost') {
        // when the game is lost, all mines are exposed.
        // the mine that was stepped on, which caused the loss, is red.
        // a non-mine cell that was flagged is displayed as a mine with a red x.
        // a mine cell that was flagged is displayed as a flag.

        if (cellSolution === 'mm') {
            if (
                explodedMineCoords[0] == rowIdx &&
                explodedMineCoords[1] === colIdx
            ) {
                // the mine that was stepped on, which caused the loss, is red
                return 'mr'
            }
            if (cellState === 'fl') {
                // a mine cell that was flagged is displayed as a flag.
                return 'fl'
            }
            // expose the mine
            return 'mm'
        }
        if (cellState === 'fl') {
            // a non-mine cell that was flagged is displayed as a mine with
            // a red x.
            return 'mx'
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

function getStopwatchValue() {
    const { startTime } = gGame
    if (!startTime) {
        return 0
    }
    return Math.ceil((Date.now() - startTime) / 1000)
}

function getMineCounterValue() {
    return gGame.mineCount - _countFlags()
}

function _generateGameSolution(mineCount, rowCount, colCount) {
    let solution = []
    for (let i = 0; i < rowCount; i++) {
        solution.push(new Array(colCount).fill(0))
    }

    // add mines
    let minesAdded = 0
    while (minesAdded < mineCount) {
        const mineRow = Math.floor(Math.random() * rowCount)
        const mineCol = Math.floor(Math.random() * colCount)
        if (solution[mineRow][mineCol] === 'mm') {
            // there's already a mine in this cell
            continue
        }
        solution[mineRow][mineCol] = 'mm'
        minesAdded++
    }

    // add numbers around mines
    for (let i = 0; i < rowCount; ++i) {
        for (let j = 0; j < colCount; ++j) {
            solution[i][j] = _calcCellValue(solution, i, j)
        }
    }

    return solution
}

function _calcCellValue(solution, rowIdx, colIdx) {
    if (solution[rowIdx][colIdx] === 'mm') {
        return 'mm'
    }

    let val = 0
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            const curRowIdx = rowIdx + i
            const curColIdx = colIdx + j
            if (
                _isValidNeighbor(solution, i, j, curRowIdx, curColIdx) &&
                solution[curRowIdx][curColIdx] === 'mm'
            ) {
                ++val
            }
        }
    }
    return `0${val}`
}

function _exposeCell(game, rowIdx, colIdx) {
    const { solution } = game

    game.cellStates[rowIdx][colIdx] = 'ex'
    if (solution[rowIdx][colIdx] !== '00') {
        return
    }

    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            const newRowIdx = rowIdx + i
            const newColIdx = colIdx + j
            if (
                !_isValidNeighbor(solution, i, j, newRowIdx, newColIdx) ||
                game.cellStates[newRowIdx][newColIdx] !== 'un'
            ) {
                continue
            }
            _exposeCell(game, newRowIdx, newColIdx)
        }
    }
}

function _isValidNeighbor(solution, i, j, newRowIdx, newColIdx) {
    return (
        (i !== 0 || j !== 0) &&
        newRowIdx >= 0 &&
        newRowIdx < solution.length &&
        newColIdx >= 0 &&
        newColIdx < solution[0].length
    )
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
                cell === 'mm' || cellStates[rowIdx][colIdx] === 'ex'
        )
    )
}

function _flagAllMines(game) {
    game.solution.forEach((row, rowIdx) =>
        row.forEach((cell, colIdx) => {
            if (cell === 'mm') {
                game.cellStates[rowIdx][colIdx] = 'fl'
            }
        })
    )
}
