import dropValidPositions from "../utils/dropVadlidPositions";
import { linesPositions } from "../utils/basicMovements";
import colorValidPositions from "../utils/colorValidPositions";

export const onRookHover = (e, board) => {
    document
        .querySelectorAll("div")
        .forEach((el) => (el.style.boxShadow = "none"));

    let startR = Number(e.target.parentElement.style.gridRowStart - 1);
    let startC = Number(e.target.parentElement.style.gridColumnStart - 1);

    const validPositions = linesPositions(startR, startC, board);

    colorValidPositions(validPositions, startR, startC, board);
};

export const onRookDrop = (e, board, dragging) => {
    const validPositions = linesPositions(dragging.r, dragging.c, board);
    dropValidPositions(e, validPositions, board, dragging);
};
