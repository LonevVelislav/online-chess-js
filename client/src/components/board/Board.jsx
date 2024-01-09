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
    const [player1, setPlayer1] = useState("");
    const [player2, setPlayer2] = useState("");

    useEffect(() => {
        fetch(`http://192.168.103:3010/for-the-king/games/${id}`)
            .then((data) => data.json())
            .then((res) => {
                if (res.status === "success") {
                    setPlayer1(res.data.game.player1);
                    setPlayer2(res.data.game.player2);
                    game(
                        res.data.game.board,
                        res.data.game.turn,
                        res.data.game.player1,
                        res.data.game.player2,
                        movePeaceHandler,
                        userId
                    );
                }
                if (res.status === "fail") {
                    navigate("/404");
                }
            })
            .catch((err) => {
                console.log(err);
                navigate("/404");
            });
    }, []);

    useEffect(() => {
        socket.on("recieve_data", (data) => {
            game(
                data.result.board,
                data.result.turn,
                data.result.player1,
                data.result.player2,
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
                        player1: res.data.game.player1,
                        player2: res.data.game.player2,
                    });
                }
                if (res.status === "fail") {
                    navigate("/404");
                }
            })
            .catch((err) => navigate("/404"));
    };

    return (
        <>
            <Link className="home-btn" to={"/"}>
                &larr; home
            </Link>
            <span className="board-player2">{player2 && player2.username}</span>
            <div className="board"></div>
            <span className="board-player1">{player1 && player1.username}</span>
        </>
    );
}
