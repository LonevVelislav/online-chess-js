import { useReducer, useEffect, useState, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { game } from "../../chess-scrypt/chess.js";

import AuthContext from "../../contexts/AuthContext";
import boardReducer from "./boardReducer.js";
import turnReducer from "./turnReducer.js";

export default function Board() {
    const { userId } = useContext(AuthContext);
    const navigate = useNavigate();
    const { id } = useParams();
    const [board, boardDispatch] = useReducer(boardReducer, []);
    const [turn, turnDispatch] = useReducer(turnReducer, "");

    const [player1, setPlayer1] = useState({});
    const [player2, setPlayer2] = useState({});
    const [loading, setLoading] = useState(true);

    const movePeaceHandler = async (board) => {
        fetch(`http://192.168.103:3010/for-the-king/games/move/${id}`, {
            method: "PATCH",
            body: JSON.stringify({
                board: board,
                turn,
            }),
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "content-type": "application/json",
            },
        })
            .then((data) => data.json())
            .then((res) => {
                if (res.status === "success") {
                    console.log(res.data.game);
                    boardDispatch({
                        type: "change-board",
                        payload: res.data.game.board,
                    });
                    turnDispatch({
                        type: "change-turn",
                        payload: res.data.game.turn,
                    });
                }
                navigate(`/board/${id}`);
                if (res.status === "fail") {
                    navigate("/404");
                }
            })
            .catch((err) => navigate("/404"));
    };

    useEffect(() => {
        fetch(`http://192.168.103:3010/for-the-king/games/${id}`)
            .then((data) => data.json())
            .then((res) => {
                if (res.status === "success") {
                    setLoading(false);
                    boardDispatch({
                        type: "get-board",
                        payload: res.data.game.board,
                    });
                    turnDispatch({
                        type: "get-turn",
                        payload: res.data.game.turn,
                    });
                    setPlayer1(res.data.game.player1);
                    setPlayer2(res.data.game.player2);
                }
                if (res.status === "fail") {
                    navigate("/404");
                }
            })
            .catch((err) => console.log(err));
    }, []);
    if (!loading) {
        console.log("redenr");
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
