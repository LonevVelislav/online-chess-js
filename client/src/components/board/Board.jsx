import { useEffect, useState, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { game } from "../../chess-scrypt/chess.js";

import io from "socket.io-client";

const socket = io.connect("http://192.168.103:3010");

import AuthContext from "../../contexts/AuthContext";

export default function Board() {
    const navigate = useNavigate();

    const { userId } = useContext(AuthContext);
    const { id } = useParams();
    const [board, setBoard] = useState([]);
    const [turn, setTurn] = useState("");
    const [player1, setPlayer1] = useState({});
    const [player2, setPlayer2] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`http://192.168.103:3010/for-the-king/games/${id}`)
            .then((data) => data.json())
            .then((res) => {
                if (res.status === "success") {
                    setLoading(false);
                    setBoard(res.data.game.board);
                    setTurn(res.data.game.turn);
                    setPlayer1(res.data.game.player1);
                    setPlayer2(res.data.game.player2);
                }
                if (res.status === "fail") {
                    navigate("/404");
                }
            })
            .catch((err) => {
                navigate("/404");
            });
    }, []);

    useEffect(() => {
        socket.on("recieve_data", (data) => {
            setBoard(data.result.board);
            setTurn(data.result.turn);

            game(
                data.result.board,
                data.result.turn,
                player1,
                player2,
                movePeaceHandler,
                userId
            );
        });
    }, [socket]);

    function sendData(data) {
        socket.emit("send_data", { result: data });
    }

    const movePeaceHandler = async (board) => {
        fetch(`http://192.168.103:3010/for-the-king/games/move/${id}`, {
            method: "PATCH",
            body: JSON.stringify({
                board: board,
            }),
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "content-type": "application/json",
            },
        })
            .then((data) => data.json())
            .then((res) => {
                if (res.status === "success") {
                    sendData({
                        board: res.data.game.board,
                        turn: res.data.game.turn,
                    });
                }
                if (res.status === "fail") {
                    navigate("/404");
                }
            })
            .catch((err) => navigate("/404"));
    };

    if (!loading) {
        game(board, turn, player1, player2, movePeaceHandler, userId);
    }
    return (
        <>
            <span className="board-player2">{player2 && player2.username}</span>
            <div className="board"></div>
            <span className="board-player1">{player1 && player1.username}</span>
        </>
    );
}
