import { onPawnHover, onPawnDrop } from "./peacesMovements/pawnMovements";
import { onBishopDrop, onBishopHover } from "./peacesMovements/bishopMovements";
import { onKnightHover, onKnightDrop } from "./peacesMovements/knightMovement";
import { onRookDrop, onRookHover } from "./peacesMovements/rookMovements";
import { onQeenHover, onQueenDrop } from "./peacesMovements/queenMovements";
import { onKingDrop, onKingHover } from "./peacesMovements/kingMovement";

export const renderBoard = (board) => {
    let dragging = {};
    let clickedImage = {};

    const boardDomElement = document.querySelector(".board");
    boardDomElement.innerHTML = "";
    boardDomElement.style.cursor = "pointer";

    const black = "#404255";
    const white = "#fdf0d5";

    function drawSquares(x, y, color, id) {
        const square = document.createElement("div");
        square.id = id;
        square.className = "square";
        square.style.gridRowStart = x;
        square.style.gridColumnStart = y;
        square.style.backgroundColor = color;

        boardDomElement.appendChild(square);
    }

    function drawPeace(x, y, url, id, type, turn) {
        const image = document.createElement("img");
        image.className = "peace";
        image.style.zIndex = "1";
        image.src = url;
        image.id = id;
        if (turn !== undefined) {
            image.dataset.turn = turn;
        }
        image.dataset.type = type;

        let offsetX, offsetY;

        function drag(e) {
            if (dragging) {
                image.style.left = e.clientX - offsetX + "px";
                image.style.top = e.clientY - offsetY + "px";
            }
        }

        image.addEventListener("click", function (e) {
            if (e.target.tagName === "IMG") {
                boardDomElement.style.cursor = "none";
                clickedImage = image;
                image.style.position = "absolute";
                document
                    .querySelectorAll(".peace")
                    .forEach((peace) => (peace.style.pointerEvents = "none"));

                offsetX = e.clientX - image.getBoundingClientRect().left;
                offsetY = e.clientY - image.getBoundingClientRect().top;

                let r = Number(e.target.parentElement.style.gridRowStart) - 1;
                let c =
                    Number(e.target.parentElement.style.gridColumnStart) - 1;
                dragging = { peace: board[r][c], r, c };

                if (
                    e.target.id.includes("PAWN") ||
                    e.target.id.includes("pawn")
                ) {
                    onPawnHover(e, board);
                }

                if (
                    e.target.id.includes("BISHOP") ||
                    e.target.id.includes("bishop")
                ) {
                    onBishopHover(e, board);
                }

                if (
                    e.target.id.includes("KNIGHT") ||
                    e.target.id.includes("knight")
                ) {
                    onKnightHover(e, board);
                }

                if (
                    e.target.id.includes("ROOK") ||
                    e.target.id.includes("rook")
                ) {
                    onRookHover(e, board);
                }
                if (e.target.id === "QUEEN" || e.target.id === "queen") {
                    onQeenHover(e, board);
                }
                if (e.target.id === "KING" || e.target.id === "king") {
                    onKingHover(e, board);
                }
            }
        });

        boardDomElement.addEventListener("mousemove", drag);

        document.querySelectorAll(".square").forEach((square) => {
            if (
                Number(square.style.gridRowStart) === x &&
                Number(square.style.gridColumnStart) === y
            ) {
                square.appendChild(image);
            }
        });
    }

    function colorBoard() {
        const positions = ["a", "b", "c", "d", "e", "f", "g", "h"];
        for (let r = 0; r < board.length; r++) {
            for (let c = 0; c < board[r].length; c++) {
                let id = positions[c] + Number(board.length - r);
                if ((r + c) % 2 === 0) {
                    drawSquares(r + 1, c + 1, white, id);
                } else {
                    drawSquares(r + 1, c + 1, black, id);
                }
            }
        }
    }

    function fillBoard() {
        for (let r = 0; r < board.length; r++) {
            for (let c = 0; c < board[r].length; c++) {
                if (board[r][c] !== 0) {
                    const obj = board[r][c];
                    drawPeace(
                        r + 1,
                        c + 1,
                        obj.url,
                        obj.id,
                        obj.type,
                        obj.turn
                    );
                }
            }
        }
    }

    function dropClickedHandler(e) {
        if (e.target.tagName === "DIV" && clickedImage.tagName === "IMG") {
            if (
                clickedImage.id.includes("PAWN") ||
                clickedImage.id.includes("pawn")
            ) {
                onPawnDrop(e, board, dragging);
            }

            if (
                clickedImage.id.includes("BISHOP") ||
                clickedImage.id.includes("bishop")
            ) {
                onBishopDrop(e, board, dragging);
            }

            if (
                clickedImage.id.includes("KNIGHT") ||
                clickedImage.id.includes("knight")
            ) {
                onKnightDrop(e, board, dragging);
            }

            if (
                clickedImage.id.includes("ROOK") ||
                clickedImage.id.includes("rook")
            ) {
                onRookDrop(e, board, dragging);
            }

            if (clickedImage.id === "QUEEN" || clickedImage.id === "queen") {
                onQueenDrop(e, board, dragging);
            }
            if (clickedImage.id === "KING" || clickedImage.id === "king") {
                onKingDrop(e, board, dragging);
            }

            clickedImage.style.position = "static";

            document
                .querySelectorAll(".peace")
                .forEach((peace) => (peace.style.pointerEvents = "all"));
            renderBoard(board);
            console.log(board);
            boardDomElement.removeEventListener("click", dropClickedHandler);
        }
    }

    boardDomElement.addEventListener("click", dropClickedHandler);

    colorBoard();
    fillBoard();
};
