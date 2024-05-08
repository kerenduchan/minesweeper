export const gameService = {
    getGame,
    resetGame,
    setGameStatus,
    getGameCell,
    isGameOver,
    exposeCell,
    markCell,
    setTentativeCoords,
}

// GAME MODEL

// status:
// - idle   = game in progress, no win or loss, no mouse down.
// - danger = mouse down on one of the cells, and no mouse up yet
// - lost   = game over with a loss (stepped on bomb)
// - won    =  game over with a win (all non-bomb cells have been exposed)

// solution:
// The cells of the board, if they were all exposed.
// 00-08 = non-bomb cells
// bb = bomb

// cellStates:
// 'un' = unexposed and unmarked
// 'fl' = unexposed and marked with a flag
// 'qq' = unexposed and marked with a question mark
// 'ex' = exposed

// tentativeCoords:
// Coordinates of the tentative cell - mouse down was clicked, mouse is
// currently hovering over this cell, no mouse up yet)

// explodedBombCoords:
// Coordinates of the bomb that was stepped on that resulted in the game
// being lost.

let gGame
resetGame()

function getGame() {
    return gGame
}

function resetGame() {
    gGame = {
        status: 'idle',

        solution: [
            ['00', '01', 'bb', '01'],
            ['00', '01', '01', '01'],
            ['02', '02', '01', '00'],
            ['bb', 'bb', '01', '00'],
        ],

        cellStates: [
            ['un', 'un', 'un', 'un'],
            ['un', 'un', 'un', 'un'],
            ['un', 'un', 'un', 'un'],
            ['un', 'un', 'un', 'un'],
        ],

        tentativeCoords: null,
        explodedBombCoords: null,
    }
}

function setGameStatus(status) {
    gGame = { ...gGame, status }
}

function exposeCell(rowIdx, colIdx) {
    const newGame = structuredClone(gGame)

    _exposeCell(newGame, rowIdx, colIdx)
    newGame.status = 'idle'
    if (newGame.solution[rowIdx][colIdx] === 'bb') {
        newGame.status = 'lost'
        newGame.explodedBombCoords = [rowIdx, colIdx]
    }

    gGame = newGame
}

function getGameCell(rowIdx, colIdx) {
    const {
        status,
        solution,
        cellStates,
        tentativeCoords,
        explodedBombCoords,
    } = gGame

    const cellState = cellStates[rowIdx][colIdx]
    const cellSolution = solution[rowIdx][colIdx]

    if (status === 'lost' && cellSolution === 'bb') {
        // when the game is lost, all bombs are exposed.
        // the bomb that was stepped on, which caused the loss, is red.
        if (
            explodedBombCoords[0] == rowIdx &&
            explodedBombCoords[1] === colIdx
        ) {
            return 'br'
        }
        return 'bb'
    }

    // exposed cell
    if (cellState === 'ex') {
        return cellSolution
    }

    // tentative cell
    if (
        tentativeCoords &&
        tentativeCoords[0] === rowIdx &&
        tentativeCoords[1] === colIdx
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

function setTentativeCoords(coords) {
    gGame = {
        ...gGame,
        status: 'danger',
        tentativeCoords: coords,
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
