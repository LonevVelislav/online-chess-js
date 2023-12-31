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
    let validPositions = [];
    let diagonals = [];

    diagonals.push([operators[color](startR, 1), startC - 1]);
    diagonals.push([operators[color](startR, 1), startC + 1]);
    diagonals = diagonals.filter(
        (pos) =>
            pos[0] >= 0 &&
            pos[0] < board.length &&
            pos[1] >= 0 &&
            pos[1] < board.length &&
            board[pos[0]][pos[1]] !== 0 &&
            board[pos[0]][pos[1]].type !== color
    );

    console.log(diagonals);

    if (clickedPeace.turn === 0) {
        for (let i = 1; i <= 2; i++) {
            if (board[operators[color](startR, i)][startC] !== 0) {
                break;
            }
            validPositions.push([operators[color](startR, i), startC]);
        }
    } else {
        for (let i = 1; i <= 1; i++) {
            if (board[operators[color](startR, i)][startC] !== 0) {
                break;
            }
            validPositions.push([operators[color](startR, i), startC]);
        }
    }

    diagonals.forEach((pos) => {
        if (board[pos[0]][pos[1]]) {
            document.querySelectorAll(".square").forEach((div) => {
                if (
                    Number(div.style.gridRowStart) === pos[0] + 1 &&
                    Number(div.style.gridColumnStart) === pos[1] + 1
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

    diagonals.push([operators[color](dragging.r, 1), dragging.c - 1]);
    diagonals.push([operators[color](dragging.r, 1), dragging.c + 1]);
    diagonals = diagonals.filter(
        (pos) =>
            pos[0] >= 0 &&
            pos[0] < board.length &&
            pos[1] >= 0 &&
            pos[1] < board.length &&
            board[pos[0]][pos[1]] !== 0 &&
            board[pos[0]][pos[1]].type !== color
    );

    if (clickedPeace.turn === 0) {
        for (let i = 1; i <= 2; i++) {
            if (board[operators[color](dragging.r, i)][dragging.c] !== 0) {
                break;
            }
            validPositions.push([operators[color](dragging.r, i), dragging.c]);
        }
    } else {
        for (let i = 1; i <= 1; i++) {
            if (board[operators[color](dragging.r, i)][dragging.c] !== 0) {
                break;
            }
            validPositions.push([operators[color](dragging.r, i), dragging.c]);
        }
    }

    if (diagonals.length > 0) {
        diagonals.forEach((pos) => {
            if (
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
            Number(e.target.style.gridColumnStart) === pos[1] + 1
        ) {
            board[dragging.r][dragging.c] = 0;
            board[pos[0]][pos[1]] = clickedPeace;
            clickedPeace.turn++;
        }
    });
};
