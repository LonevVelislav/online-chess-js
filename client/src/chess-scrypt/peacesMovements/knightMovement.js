import colorValidPositions from "../utils/colorValidPositions";
import dropValidPositions from "../utils/dropVadlidPositions";
import { shapedLPositions } from "../utils/basicMovements";

export const onKnightHover = (e, board) => {
    document
        .querySelectorAll("div")
        .forEach((el) => (el.style.boxShadow = "none"));

    const startR = Number(e.target.parentElement.style.gridRowStart - 1);
    const startC = Number(e.target.parentElement.style.gridColumnStart - 1);
    const validPositions = shapedLPositions(startR, startC, board);

    colorValidPositions(validPositions, startR, startC, board);
};

export const onKnightDrop = (e, board, dragging) => {
    const validPositions = shapedLPositions(dragging.r, dragging.c, board);

    dropValidPositions(e, validPositions, board, dragging);
};
