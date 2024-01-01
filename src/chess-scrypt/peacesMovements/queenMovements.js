import { diagonalsPositions, linesPositions } from "../utils/basicMovements";
import colorValidPositions from "../utils/colorValidPositions";
import dropValidPositions from "../utils/dropVadlidPositions";

export const onQeenHover = (e, board) => {
    document
        .querySelectorAll("div")
        .forEach((el) => (el.style.boxShadow = "none"));

    const startR = Number(e.target.parentElement.style.gridRowStart - 1);
    const startC = Number(e.target.parentElement.style.gridColumnStart - 1);
    const validPositions = diagonalsPositions(
        startR,
        startC,
        board,
        board.length
    ).concat(linesPositions(startR, startC, board, board.length));
    colorValidPositions(validPositions, startR, startC, board);
};

export const onQueenDrop = (e, board, dragging) => {
    const validPositions = diagonalsPositions(
        dragging.r,
        dragging.c,
        board,
        board.length
    ).concat(linesPositions(dragging.r, dragging.c, board, board.length));
    dropValidPositions(e, validPositions, board, dragging);
};
