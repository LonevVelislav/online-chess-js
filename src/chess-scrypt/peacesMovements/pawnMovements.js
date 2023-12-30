import { renderBoard } from "../chess";

export const onPawnHover = (e, board) => {
    document
        .querySelectorAll("div")
        .forEach((el) => (el.style.boxShadow = "none"));

    const operators = {
        white: (a, b) => a - b,
        black: (a, b) => a + b,
    };

    let startR = Number(e.target.parentElement.style.gridRowStart - 1);
    let startC = Number(e.target.parentElement.style.gridColumnStart - 1);
    const clickedPeace = board[startR][startC];
    const color = clickedPeace.type;
    let diagonals = [];

    if (startC === 7 && startC > 0 && startR < 7) {
        diagonals.push([operators[color](startR, 1), startC - 1]);
    } else if (startC === 0 && startR > 0 && startR < 7) {
        diagonals.push([operators[color](startR, 1), startC + 1]);
    } else if (startC < 7 && startC > 0 && startR > 0 && startR < 7) {
        diagonals.push([operators[color](startR, 1), startC - 1]);
        diagonals.push([operators[color](startR, 1), startC + 1]);
    }

    let validPositions = [];
    if (clickedPeace.turn === 0) {
        validPositions = [
            [operators[color](startR, 1), startC],
            [operators[color](startR, 2), startC],
        ];
    } else {
        validPositions = [[operators[color](startR, 1), startC]];
    }

    diagonals.forEach((pos) => {
        if (board[pos[0]][pos[1]]) {
            document.querySelectorAll(".square").forEach((div) => {
                if (
                    Number(div.style.gridRowStart) === pos[0] + 1 &&
                    Number(div.style.gridColumnStart) === pos[1] + 1 &&
                    board[pos[0]][pos[1]].type !== color
                ) {
                    div.style.boxShadow = "inset 0 0 0 7px #d00000";
                }
            });
        }
    });

    validPositions.forEach((pos) => {
        document.querySelectorAll(".square").forEach((div) => {
            if (
                Number(div.style.gridRowStart) === pos[0] + 1 &&
                Number(div.style.gridColumnStart) === pos[1] + 1
            ) {
                div.style.boxShadow = "inset 0 0 0 7px #80ed99";
            }
        });
    });
};

export const onPawnDrop = (e, board, dragging) => {
    const clickedPeace = dragging.peace;
    const color = clickedPeace.type;

    const operators = {
        white: (a, b) => a - b,
        black: (a, b) => a + b,
    };
    let validPositions = [];
    let diagonals = [];

    if (dragging.c === 7 && dragging.r > 0 && dragging.r < 7) {
        diagonals.push([operators[color](dragging.r, 1), dragging.c - 1]);
    } else if (dragging.c === 0 && dragging.r > 0 && dragging.r < 7) {
        diagonals.push([operators[color](dragging.r, 1), dragging.c + 1]);
    } else if (
        dragging.c < 7 &&
        dragging.c > 0 &&
        dragging.r > 0 &&
        dragging.r < 7
    ) {
        diagonals.push([operators[color](dragging.r, 1), dragging.c - 1]);
        diagonals.push([operators[color](dragging.r, 1), dragging.c + 1]);
    }

    if (clickedPeace.turn === 0) {
        validPositions = [
            [operators[color](dragging.r, 1), dragging.c],
            [operators[color](dragging.r, 2), dragging.c],
        ];
    } else {
        validPositions = [[operators[color](dragging.r, 1), dragging.c]];
    }

    if (diagonals.length > 0) {
        diagonals.forEach((pos) => {
            if (
                board[pos[0]][pos[1]].type !== color &&
                board[pos[0]][pos[1]] !== 0 &&
                Number(e.target.style.gridRowStart) === pos[0] + 1 &&
                Number(e.target.style.gridColumnStart) === pos[1] + 1
            ) {
                board[dragging.r][dragging.c] = 0;
                board[pos[0]][pos[1]] = clickedPeace;
                clickedPeace.turn++;
            }
        });
    }
    validPositions.forEach((pos) => {
        if (
            Number(e.target.style.gridRowStart) === pos[0] + 1 &&
            Number(e.target.style.gridColumnStart) === pos[1] + 1 &&
            board[pos[0]][pos[1]] === 0
        ) {
            board[dragging.r][dragging.c] = 0;
            board[pos[0]][pos[1]] = clickedPeace;
            clickedPeace.turn++;
        }
    });
};
