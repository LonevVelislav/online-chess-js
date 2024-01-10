import { useEffect, useState, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

//peace movements
import {
    onPawnDrop,
    onPawnHover,
} from "../../chess-scrypt/peacesMovements/pawnMovements";
import {
    onBishopDrop,
    onBishopHover,
} from "../../chess-scrypt/peacesMovements/bishopMovements";
import {
    onKnightDrop,
    onKnightHover,
} from "../../chess-scrypt/peacesMovements/knightMovement";
import {
    onRookDrop,
    onRookHover,
} from "../../chess-scrypt/peacesMovements/rookMovements";
import {
    onQeenHover,
    onQueenDrop,
} from "../../chess-scrypt/peacesMovements/queenMovements";

import {
    onKingDrop,
    onKingHover,
} from "../../chess-scrypt/peacesMovements/kingMovement";

//-----------

import io from "socket.io-client";

const socket = io.connect("http://192.168.103:3010");

import AuthContext from "../../contexts/AuthContext";

export default function Board() {
    const navigate = useNavigate();

    const { userId } = useContext(AuthContext);
    const { id } = useParams();

    const [player1, setPlayer1] = useState("");
    const [player2, setPlayer2] = useState("");
    const [boardState, setBoardState] = useState([]);
    const [turnState, setTurnState] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        socket.emit("join_room", id);
        fetch(`http://192.168.103:3010/for-the-king/games/${id}`)
            .then((data) => data.json())
            .then((res) => {
                if (res.status === "success") {
                    setPlayer1(res.data.game.player1);
                    setPlayer2(res.data.game.player2);
                    setBoardState(res.data.game.board);
                    setTurnState(res.data.game.turn);
                    setLoading(false);
                }
                if (res.status === "fail") {
                    return navigate("/404");
                }
            })
            .catch((err) => {
                return navigate("/leave");
            });
    }, []);

    useEffect(() => {
        socket.on("recieve_game", (data) => {
            setBoardState(data.board);
            setTurnState(data.turn);
        });
    }, [socket]);

    function sendData(board, colorTurn) {
        let data = {
            board,
            turn: colorTurn === "white" ? "black" : "white",
            room: id,
        };
        patchServerBoard(data.board, data.turn);
        setBoardState(data.board);
        setTurnState(data.turn);

        socket.emit("send_game", data);
    }

    const patchServerBoard = (board, turn) => {
        fetch(`http://192.168.103:3010/for-the-king/games/move/${id}`, {
            method: "PATCH",
            body: JSON.stringify({
                board: board,
                turn: turn,
            }),
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "content-type": "application/json",
            },
        })
            .then((data) => data.json())
            .then((res) => {
                navigate(`/board/${id}`);
            })
            .catch((err) => navigate("/404"));
    };

    function renderBoard() {
        const players = {
            white: player1,
            black: player2,
        };
        let colorTurn = turnState;
        let board = boardState;

        let dragging = {};
        let clickedImage = {};

        const boardDomElement = document.querySelector(".board");
        boardDomElement.innerHTML = "";

        const black = "#666877";
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
                if (
                    e.target.tagName === "IMG" &&
                    e.target.dataset.type === colorTurn &&
                    players[colorTurn]._id === userId
                ) {
                    boardDomElement.style.cursor = "none";
                    clickedImage = image;
                    image.style.position = "absolute";
                    document
                        .querySelectorAll(".peace")
                        .forEach(
                            (peace) => (peace.style.pointerEvents = "none")
                        );

                    offsetX = e.clientX - image.getBoundingClientRect().left;
                    offsetY = e.clientY - image.getBoundingClientRect().top;

                    let r =
                        Number(e.target.parentElement.style.gridRowStart) - 1;
                    let c =
                        Number(e.target.parentElement.style.gridColumnStart) -
                        1;
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
                const dropedR = Number(e.target.style.gridRowStart) - 1;
                const dropedC = Number(e.target.style.gridColumnStart) - 1;
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

                if (
                    clickedImage.id === "QUEEN" ||
                    clickedImage.id === "queen"
                ) {
                    onQueenDrop(e, board, dragging);
                }
                if (clickedImage.id === "KING" || clickedImage.id === "king") {
                    onKingDrop(e, board, dragging);
                }

                clickedImage.style.position = "static";

                document
                    .querySelectorAll(".peace")
                    .forEach((peace) => (peace.style.pointerEvents = "all"));

                boardDomElement.style.cursor = "pointer";

                boardDomElement.removeEventListener(
                    "click",
                    dropClickedHandler
                );

                const moved =
                    board[dropedR][dropedC] === dragging.peace &&
                    (dragging.r !== dropedR || dragging.c !== dropedC);
                if (moved) {
                    sendData(board, colorTurn);
                    renderBoard();
                } else {
                    renderBoard();
                }
            }
        }

        boardDomElement.addEventListener("click", dropClickedHandler);

        colorBoard();
        fillBoard();
    }

    if (!loading) {
        renderBoard();
    }

    return (
        <>
            <Link className="home-btn" to="/">
                &larr; home
            </Link>
            <span className="board-player2">{player2 && player2.username}</span>
            <div className="board"></div>
            <span className="board-player1">{player1 && player1.username}</span>
        </>
    );
}
