export const diagonalsPositions = (starterR, starterC, board, length) => {
    let positions = [];
    const color = board[starterR][starterC].type;

    let enemies1 = 0;
    let enemies2 = 0;
    let enemies3 = 0;
    let enemies4 = 0;

    for (let j = 1; j < length; j++) {
        if (
            starterR - j >= 0 &&
            starterR - j < board.length &&
            starterC - j >= 0 &&
            starterC - j < board.length
        ) {
            if (
                board[starterR - j][starterC - j].type === color &&
                board[starterR - j][starterC - j] !== 0
            ) {
                break;
            } else {
                if (
                    board[starterR - j][starterC - j].type !== color &&
                    board[starterR - j][starterC - j] !== 0
                ) {
                    enemies1++;
                }
                positions.push([starterR - j, starterC - j]);
                if (enemies1 > 0) {
                    break;
                }
            }
        }
    }

    for (let j = 1; j < length; j++) {
        if (
            starterR - j >= 0 &&
            starterR - j < board.length &&
            starterC + j >= 0 &&
            starterC + j < board.length
        ) {
            if (
                board[starterR - j][starterC + j].type === color &&
                board[starterR - j][starterC + j] !== 0
            ) {
                break;
            } else {
                if (
                    board[starterR - j][starterC + j].type !== color &&
                    board[starterR - j][starterC + j] !== 0
                ) {
                    enemies2++;
                }
                positions.push([starterR - j, starterC + j]);
                if (enemies2 > 0) {
                    break;
                }
            }
        }
    }
    for (let j = 1; j < length; j++) {
        if (
            starterR + j >= 0 &&
            starterR + j < board.length &&
            starterC - j >= 0 &&
            starterC - j < board.length
        ) {
            if (
                board[starterR + j][starterC - j].type === color &&
                board[starterR + j][starterC - j] !== 0
            ) {
                break;
            } else {
                if (
                    board[starterR + j][starterC - j].type !== color &&
                    board[starterR + j][starterC - j] !== 0
                ) {
                    enemies3++;
                }
                positions.push([starterR + j, starterC - j]);
                if (enemies3 > 0) {
                    break;
                }
            }
        }
    }
    for (let j = 1; j < length; j++) {
        if (
            starterR + j >= 0 &&
            starterR + j < board.length &&
            starterC + j >= 0 &&
            starterC + j < board.length
        ) {
            if (
                board[starterR + j][starterC + j].type === color &&
                board[starterR + j][starterC + j] !== 0
            ) {
                break;
            } else {
                if (
                    board[starterR + j][starterC + j].type !== color &&
                    board[starterR + j][starterC + j] !== 0
                ) {
                    enemies4++;
                }
                positions.push([starterR + j, starterC + j]);
                if (enemies4 > 0) {
                    break;
                }
            }
        }
    }

    return positions;
};

export const shapedLPositions = (starterR, starterC, board) => {
    const color = board[starterR][starterC].type;
    let positions = [];
    positions.push([starterR + 1, starterC + 2]);
    positions.push([starterR - 1, starterC + 2]);
    positions.push([starterR + 1, starterC - 2]);
    positions.push([starterR - 1, starterC - 2]);
    positions.push([starterR + 2, starterC - 1]);
    positions.push([starterR + 2, starterC + 1]);
    positions.push([starterR - 2, starterC - 1]);
    positions.push([starterR - 2, starterC + 1]);

    positions = positions
        .filter(
            (el) =>
                el[0] >= 0 &&
                el[0] < board.length &&
                el[1] >= 0 &&
                el[1] < board.length
        )
        .filter((el) => board[el[0]][el[1]].type !== color);

    return positions;
};

export const linesPositions = (starterR, starterC, board, length) => {
    let positions = [];
    const color = board[starterR][starterC].type;
    let enemies1 = 0;
    let enemies2 = 0;
    let enemies3 = 0;
    let enemies4 = 0;

    for (let j = 1; j < length; j++) {
        if (starterR - j >= 0 && starterR - j < board.length) {
            if (
                board[starterR - j][starterC].type === color &&
                board[starterR - j][starterC] !== 0
            ) {
                break;
            } else {
                if (
                    board[starterR - j][starterC].type !== color &&
                    board[starterR - j][starterC] !== 0
                ) {
                    enemies1++;
                }
                positions.push([starterR - j, starterC]);
                if (enemies1 > 0) {
                    break;
                }
            }
        }
    }

    for (let j = 1; j < length; j++) {
        if (starterR + j >= 0 && starterR + j < board.length) {
            if (
                board[starterR + j][starterC].type === color &&
                board[starterR + j][starterC] !== 0
            ) {
                break;
            } else {
                if (
                    board[starterR + j][starterC].type !== color &&
                    board[starterR + j][starterC] !== 0
                ) {
                    enemies2++;
                }
                positions.push([starterR + j, starterC]);
                if (enemies2 > 0) {
                    break;
                }
            }
        }
    }
    for (let j = 1; j < length; j++) {
        if (starterC - j >= 0 && starterC - j < board.length) {
            if (
                board[starterR][starterC - j].type === color &&
                board[starterR][starterC - j] !== 0
            ) {
                break;
            } else {
                if (
                    board[starterR][starterC - j].type !== color &&
                    board[starterR][starterC - j] !== 0
                ) {
                    enemies3++;
                }
                positions.push([starterR, starterC - j]);
                if (enemies3 > 0) {
                    break;
                }
            }
        }
    }
    for (let j = 1; j < length; j++) {
        if (starterC + j >= 0 && starterC + j < board.length) {
            if (
                board[starterR][starterC + j].type === color &&
                board[starterR][starterC + j] !== 0
            ) {
                break;
            } else {
                if (
                    board[starterR][starterC + j].type !== color &&
                    board[starterR][starterC + j] !== 0
                ) {
                    enemies4++;
                }
                positions.push([starterR, starterC + j]);
                if (enemies4 > 0) {
                    break;
                }
            }
        }
    }

    return positions;
};

export const pawnBasicPositions = (starterR, starterC, board) => {
    let positions = [];
    const clickedPeace = board[starterR][starterC];
    const color = clickedPeace.type;
    const operators = {
        white: (a, b) => a - b,
        black: (a, b) => a + b,
    };

    if (clickedPeace.turn === 0) {
        for (let i = 1; i <= 2; i++) {
            if (board[operators[color](starterR, i)][starterC] !== 0) {
                break;
            }
            positions.push([operators[color](starterR, i), starterC]);
        }
    } else {
        for (let i = 1; i <= 1; i++) {
            if (
                operators[color](starterR, i) < board.length &&
                operators[color](starterR, i) >= 0
            ) {
                if (board[operators[color](starterR, i)][starterC] !== 0) {
                    break;
                }
                positions.push([operators[color](starterR, i), starterC]);
            }
        }
    }

    return positions;
};

export const pawnDiagonalPositions = (starterR, starterC, board) => {
    let diagonals = [];
    const color = board[starterR][starterC].type;

    const operators = {
        white: (a, b) => a - b,
        black: (a, b) => a + b,
    };

    diagonals.push([operators[color](starterR, 1), starterC - 1]);
    diagonals.push([operators[color](starterR, 1), starterC + 1]);
    diagonals = diagonals.filter(
        (pos) =>
            pos[0] >= 0 &&
            pos[0] < board.length &&
            pos[1] >= 0 &&
            pos[1] < board.length &&
            board[pos[0]][pos[1]] !== 0 &&
            board[pos[0]][pos[1]].type !== color
    );

    return diagonals;
};
