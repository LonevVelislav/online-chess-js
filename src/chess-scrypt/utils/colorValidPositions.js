export default function colorValidPositions(
    postions,
    starterR,
    starterC,
    board
) {
    const color = board[starterR][starterC].type;

    postions.forEach((pos) => {
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
}
