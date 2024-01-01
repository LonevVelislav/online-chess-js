import { diagonalsPositions, linesPositions } from "../utils/basicMovements";
import colorValidPositions from "../utils/colorValidPositions";
import dropValidPositions from "../utils/dropVadlidPositions";

export const onKingHover = (e, board) => {
    document
        .querySelectorAll("div")
        .forEach((el) => (el.style.boxShadow = "none"));

    const startR = Number(e.target.parentElement.style.gridRowStart - 1);
    const startC = Number(e.target.parentElement.style.gridColumnStart - 1);
    const validPositions = diagonalsPositions(startR, startC, board, 2).concat(
        linesPositions(startR, startC, board, 2)
    );

    colorValidPositions(validPositions, startR, startC, board);
};

export const onKingDrop = (e, board, dragging) => {
    const validPositions = diagonalsPositions(
        dragging.r,
        dragging.c,
        board,
        2
    ).concat(linesPositions(dragging.r, dragging.c, board, 2));
    dropValidPositions(e, validPositions, board, dragging);
};
