export const diagonalsPositions = (starterR, starterC, board) => {
    let positions = [];
    const color = board[starterR][starterC];
    let enemies1 = 0;
    let enemies2 = 0;
    let enemies3 = 0;
    let enemies4 = 0;

    for (let j = 1; j < board.length; j++) {
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

    for (let j = 1; j < board.length; j++) {
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
    for (let j = 1; j < board.length; j++) {
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
    for (let j = 1; j < board.length; j++) {
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

export const LshapedPositions = (starterR, starterC, board) => {
    let positions = [];
    positions.push([starterR + 1, starterC + 2]);
    positions.push([starterR - 1, starterC + 2]);
    positions.push([starterR + 1, starterC - 2]);
    positions.push([starterR - 1, starterC - 2]);
    positions.push([starterR + 2, starterC - 1]);
    positions.push([starterR + 2, starterC + 1]);
    positions.push([starterR - 2, starterC - 1]);
    positions.push([starterR - 2, starterC + 1]);

    positions = positions.filter(
        (el) =>
            el[0] >= 0 &&
            el[0] < board.length &&
            el[1] >= 0 &&
            el[1] < board.length
    );

    return positions;
};

export const linesPositions = (starterR, starterC, board) => {
    let positions = [];
    const color = board[starterR][starterC];
    let enemies1 = 0;
    let enemies2 = 0;
    let enemies3 = 0;
    let enemies4 = 0;

    for (let j = 1; j < board.length; j++) {
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

    for (let j = 1; j < board.length; j++) {
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
    for (let j = 1; j < board.length; j++) {
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
    for (let j = 1; j < board.length; j++) {
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
