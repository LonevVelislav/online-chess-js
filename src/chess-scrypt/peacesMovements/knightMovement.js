export const onKnightHover = (e, board) => {
    document
        .querySelectorAll("div")
        .forEach((el) => (el.style.boxShadow = "none"));

    let startR = Number(e.target.parentElement.style.gridRowStart - 1);
    let startC = Number(e.target.parentElement.style.gridColumnStart - 1);
    const clickedPeace = board[startR][startC];
    const color = clickedPeace.type;
    let validPositions = [];

    validPositions.push([startR + 1, startC + 2]);
    validPositions.push([startR - 1, startC + 2]);
    validPositions.push([startR + 1, startC - 2]);
    validPositions.push([startR - 1, startC - 2]);
    validPositions.push([startR + 2, startC - 1]);
    validPositions.push([startR + 2, startC + 1]);
    validPositions.push([startR - 2, startC - 1]);
    validPositions.push([startR - 2, startC + 1]);

    validPositions = validPositions.filter(
        (el) =>
            el[0] >= 0 &&
            el[0] < board.length &&
            el[1] >= 0 &&
            el[1] < board.length
    );

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

export const onKnightDrop = (e, board, dragging) => {
    const clickedPeace = dragging.peace;
    const color = clickedPeace.type;
    let validPositions = [];

    validPositions.push([dragging.r + 1, dragging.c + 2]);
    validPositions.push([dragging.r - 1, dragging.c + 2]);
    validPositions.push([dragging.r + 1, dragging.c - 2]);
    validPositions.push([dragging.r - 1, dragging.c - 2]);
    validPositions.push([dragging.r + 2, dragging.c - 1]);
    validPositions.push([dragging.r + 2, dragging.c + 1]);
    validPositions.push([dragging.r - 2, dragging.c - 1]);
    validPositions.push([dragging.r - 2, dragging.c + 1]);

    validPositions = validPositions.filter(
        (el) =>
            el[0] >= 0 &&
            el[0] < board.length &&
            el[1] >= 0 &&
            el[1] < board.length
    );

    validPositions.forEach((pos) => {
        if (
            Number(e.target.style.gridRowStart) === pos[0] + 1 &&
            Number(e.target.style.gridColumnStart) === pos[1] + 1 &&
            board[pos[0]][pos[1]] === 0
        ) {
            board[dragging.r][dragging.c] = 0;
            board[pos[0]][pos[1]] = clickedPeace;
        }

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
