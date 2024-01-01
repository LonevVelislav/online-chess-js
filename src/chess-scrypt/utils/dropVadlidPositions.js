export default function dropValidPositions(e, positions, board, dragging) {
    const clickedPeace = dragging.peace;
    const color = clickedPeace.type;
    positions.forEach((pos) => {
        if (
            Number(e.target.style.gridRowStart) === pos[0] + 1 &&
            Number(e.target.style.gridColumnStart) === pos[1] + 1
        ) {
            board[dragging.r][dragging.c] = 0;
            board[pos[0]][pos[1]] = clickedPeace;
        }
        // if (
        //     board[pos[0]][pos[1]].type !== color &&
        //     board[pos[0]][pos[1]] !== 0 &&
        //     e.target.tagName === "DIV"
        // ) {
        //     console.log("drop second");
        //     if (
        //         Number(e.target.style.gridRowStart) === pos[0] + 1 &&
        //         Number(e.target.style.gridColumnStart) === pos[1] + 1
        //     ) {
        //         board[dragging.r][dragging.c] = 0;
        //         board[pos[0]][pos[1]] = clickedPeace;
        //     }
        // }
    });
}
