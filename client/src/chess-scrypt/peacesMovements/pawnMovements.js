import {
    pawnBasicPositions,
    pawnDiagonalPositions,
    pawnPromotionPositions,
} from "../utils/basicMovements";

export const onPawnHover = (e, board) => {
    document
        .querySelectorAll("div")
        .forEach((el) => (el.style.boxShadow = "none"));

    let startR = Number(e.target.parentElement.style.gridRowStart - 1);
    let startC = Number(e.target.parentElement.style.gridColumnStart - 1);

    let validPositions = pawnBasicPositions(startR, startC, board);
    let diagonals = pawnDiagonalPositions(startR, startC, board);
    let promotions = pawnPromotionPositions(startR, startC, board);

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

            if (
                Number(div.style.gridRowStart) === pos[0] + 1 &&
                Number(div.style.gridColumnStart) === pos[1] + 1 &&
                promotions.some((el) => el[0] === pos[0] && el[1] === pos[1])
            ) {
                div.style.boxShadow = "inset 0 0 0 7px #ffd60a";
            }
        });
    });
};

export const onPawnDrop = (e, board, dragging) => {
    const clickedPeace = dragging.peace;
    let validPositions = pawnBasicPositions(dragging.r, dragging.c, board);
    let diagonals = pawnDiagonalPositions(dragging.r, dragging.c, board);
    let promotions = pawnPromotionPositions(dragging.r, dragging.c, board);

    if (diagonals.length > 0) {
        diagonals.forEach((pos) => {
            if (
                Number(e.target.style.gridRowStart) === pos[0] + 1 &&
                Number(e.target.style.gridColumnStart) === pos[1] + 1 &&
                board[pos[0]][pos[1]].id !== "king" &&
                board[pos[0]][pos[1]].id !== "KING"
            ) {
                if (
                    promotions.some(
                        (el) => el[0] === pos[0] && el[1] === pos[0]
                    )
                ) {
                    const type =
                        clickedPeace.type === "white"
                            ? "queen-white"
                            : "queen-black";

                    board[dragging.r][dragging.c] = 0;
                    board[pos[0]][pos[1]] = {
                        id: clickedPeace.type === "white" ? "QUEEN" : "queen",
                        type: clickedPeace.type,
                        url: `/img/peaces/${type}.png`,
                    };
                } else {
                    board[dragging.r][dragging.c] = 0;
                    board[pos[0]][pos[1]] = clickedPeace;
                    clickedPeace.turn++;
                }
            }
        });
    }
    validPositions.forEach((pos) => {
        if (
            Number(e.target.style.gridRowStart) === pos[0] + 1 &&
            Number(e.target.style.gridColumnStart) === pos[1] + 1
        ) {
            if (promotions.some((el) => el[0] === pos[0] && el[1] === pos[0])) {
                const type =
                    clickedPeace.type === "white"
                        ? "queen-white"
                        : "queen-black";

                board[dragging.r][dragging.c] = 0;
                board[pos[0]][pos[1]] = {
                    id: clickedPeace.type === "white" ? "QUEEN" : "queen",
                    type: clickedPeace.type,
                    url: `/img/peaces/${type}.png`,
                };
            } else {
                board[dragging.r][dragging.c] = 0;
                board[pos[0]][pos[1]] = clickedPeace;
                clickedPeace.turn++;
            }
        }
    });
};
