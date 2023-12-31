import colorValidPositions from "../utils/colorValidPositions";
import dropValidPositions from "../utils/dropVadlidPositions";
import { LshapedPositions } from "../utils/basicMovements";

export const onKnightHover = (e, board) => {
    document
        .querySelectorAll("div")
        .forEach((el) => (el.style.boxShadow = "none"));

    const startR = Number(e.target.parentElement.style.gridRowStart - 1);
    const startC = Number(e.target.parentElement.style.gridColumnStart - 1);
    const validPositions = LshapedPositions(startR, startC, board);

    colorValidPositions(validPositions, startR, startC, board);
};

export const onKnightDrop = (e, board, dragging) => {
    const validPositions = LshapedPositions(dragging.r, dragging.c, board);

    dropValidPositions(e, validPositions, board, dragging);
};
