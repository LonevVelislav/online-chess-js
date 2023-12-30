export const onBishopHover = (e, board) => {
    document
        .querySelectorAll("div")
        .forEach((el) => (el.style.boxShadow = "none"));

    let startR = Number(e.target.parentElement.style.gridRowStart - 1);
    let startC = Number(e.target.parentElement.style.gridColumnStart - 1);
    const clickedPeace = board[startR][startC];
    const color = clickedPeace.type;
    let validPositions = [];

    for (let y = 1; y < board.length; y++) {
        if (
            startR - y >= 0 &&
            startR - y < board.length &&
            startC - y >= 0 &&
            startC - y < board.length
        ) {
            if (
                board[startR - y][startC - y].type === color &&
                board[startR - y][startC - y] !== 0
            ) {
                break;
            } else {
                validPositions.push([startR - y, startC - y]);
            }
        }
    }

    for (let j = 1; j < board.length; j++) {
        if (
            startR - j >= 0 &&
            startR - j < board.length &&
            startC + j >= 0 &&
            startC + j < board.length
        ) {
            if (
                board[startR - j][startC + j].type === color &&
                board[startR - j][startC + j] !== 0
            ) {
                break;
            } else {
                validPositions.push([startR - j, startC + j]);
            }
        }
    }

    for (let y = 1; y < board.length; y++) {
        if (
            startR + y >= 0 &&
            startR + y < board.length &&
            startC - y >= 0 &&
            startC - y < board.length
        ) {
            if (
                board[startR + y][startC - y].type === color &&
                board[startR + y][startC - y] !== 0
            ) {
                break;
            } else {
                validPositions.push([startR + y, startC - y]);
            }
        }
    }

    for (let y = 1; y < board.length; y++) {
        if (
            startR + y >= 0 &&
            startR + y < board.length &&
            startC + y >= 0 &&
            startC + y < board.length
        ) {
            if (
                board[startR + y][startC + y].type === color &&
                board[startR + y][startC + y] !== 0
            ) {
                break;
            } else {
                validPositions.push([startR + y, startC + y]);
            }
        }
    }

    validPositions.forEach((pos) => {
        document.querySelectorAll(".square").forEach((div) => {
            if (
                Number(div.style.gridRowStart) === pos[0] + 1 &&
                Number(div.style.gridColumnStart) === pos[1] + 1 &&
                board[pos[0]][pos[1]] !== 0 &&
                board[pos[0]][pos[1]].type !== color
            ) {
                div.style.boxShadow = "inset 0 0 0 7px #d00000";
            }
            if (
                Number(div.style.gridRowStart) === pos[0] + 1 &&
                Number(div.style.gridColumnStart) === pos[1] + 1 &&
                board[pos[0]][pos[1]] == 0
            ) {
                div.style.boxShadow = "inset 0 0 0 7px #80ed99";
            }
        });
    });
};

export const onBishopDrop = (e, board, dragging) => {
    const clickedPeace = dragging.peace;
    const color = clickedPeace.type;
    let validPositions = [];
    let enemies1 = 0;
    let enemies2 = 0;
    let enemies3 = 0;
    let enemies4 = 0;

    for (let j = 1; j < board.length; j++) {
        if (
            dragging.r - j >= 0 &&
            dragging.r - j < board.length &&
            dragging.c - j >= 0 &&
            dragging.c - j < board.length
        ) {
            if (
                board[dragging.r - j][dragging.c - j].type === color &&
                board[dragging.r - j][dragging.c - j] !== 0
            ) {
                break;
            } else {
                if (
                    board[dragging.r - j][dragging.c - j].type !== color &&
                    board[dragging.r - j][dragging.c - j] !== 0
                ) {
                    enemies1++;
                }
                validPositions.push([dragging.r - j, dragging.c - j]);
                if (enemies1 > 0) {
                    break;
                }
            }
        }
    }

    for (let j = 1; j < board.length; j++) {
        if (
            dragging.r - j >= 0 &&
            dragging.r - j < board.length &&
            dragging.c + j >= 0 &&
            dragging.c + j < board.length
        ) {
            if (
                board[dragging.r - j][dragging.c + j].type === color &&
                board[dragging.r - j][dragging.c + j] !== 0
            ) {
                break;
            } else {
                if (
                    board[dragging.r - j][dragging.c + j].type !== color &&
                    board[dragging.r - j][dragging.c + j] !== 0
                ) {
                    enemies2++;
                }
                validPositions.push([dragging.r - j, dragging.c + j]);
                if (enemies2 > 0) {
                    break;
                }
            }
        }
    }
    for (let j = 1; j < board.length; j++) {
        if (
            dragging.r + j >= 0 &&
            dragging.r + j < board.length &&
            dragging.c - j >= 0 &&
            dragging.c - j < board.length
        ) {
            if (
                board[dragging.r + j][dragging.c - j].type === color &&
                board[dragging.r + j][dragging.c - j] !== 0
            ) {
                break;
            } else {
                if (
                    board[dragging.r + j][dragging.c - j].type !== color &&
                    board[dragging.r + j][dragging.c - j] !== 0
                ) {
                    enemies3++;
                }
                validPositions.push([dragging.r + j, dragging.c - j]);
                if (enemies3 > 0) {
                    break;
                }
            }
        }
    }
    for (let j = 1; j < board.length; j++) {
        if (
            dragging.r + j >= 0 &&
            dragging.r + j < board.length &&
            dragging.c + j >= 0 &&
            dragging.c + j < board.length
        ) {
            if (
                board[dragging.r + j][dragging.c + j].type === color &&
                board[dragging.r + j][dragging.c + j] !== 0
            ) {
                break;
            } else {
                if (
                    board[dragging.r + j][dragging.c + j].type !== color &&
                    board[dragging.r + j][dragging.c + j] !== 0
                ) {
                    enemies4++;
                }
                validPositions.push([dragging.r + j, dragging.c + j]);
                if (enemies4 > 0) {
                    break;
                }
            }
        }
    }

    validPositions.forEach((pos) => {
        if (
            Number(e.target.style.gridRowStart) === pos[0] + 1 &&
            Number(e.target.style.gridColumnStart) === pos[1] + 1 &&
            board[pos[0]][pos[1]] === 0
        ) {
            board[dragging.r][dragging.c] = 0;
            board[pos[0]][pos[1]] = clickedPeace;
        }

        // if (
        //     board[pos[0]][pos[1]].type !== color &&
        //     board[pos[0]][pos[1]] !== 0 &&
        //     e.target.tagName === "IMG"
        // ) {
        //     if (
        //         Number(e.target.parentElement.style.gridRowStart) ===
        //             pos[0] + 1 &&
        //         Number(e.target.parentElement.style.gridColumnStart) ===
        //             pos[1] + 1
        //     ) {
        //         board[dragging.r][dragging.c] = 0;
        //         board[pos[0]][pos[1]] = clickedPeace;
        //     }
        // }

        if (
            board[pos[0]][pos[1]].type !== color &&
            board[pos[0]][pos[1]] !== 0 &&
            e.target.tagName === "DIV"
        ) {
            if (
                Number(e.target.style.gridRowStart) === pos[0] + 1 &&
                Number(e.target.style.gridColumnStart) === pos[1] + 1
            ) {
                board[dragging.r][dragging.c] = 0;
                board[pos[0]][pos[1]] = clickedPeace;
            }
        }
    });
};
