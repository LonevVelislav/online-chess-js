import { useState } from "react";
import { Link, redirect } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function GameElement({
    gameId,
    player1,
    player2,
    canJoin,
    myGame,
    host,
}) {
    const navigate = useNavigate();
    const joinGameHandler = async () => {
        fetch(`http://192.168.103:3010/for-the-king/games/join/${gameId}`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
            .then((data) => data.json())
            .then((res) => {
                if (res.status === "success") {
                    navigate(`/board/${gameId}`);
                }
                if (res.status === "fail") {
                    navigate("/404");
                }
            })
            .catch((err) => navigate("/404"));
    };

    return (
        <li className="game-list-item">
            <div>
                <span>{host ? "my game" : `host: ${player1.username}`}</span>
            </div>
            {!canJoin && (
                <div>
                    <Link className="btn-connect" to={`/board/${gameId}`}>
                        {myGame ? "reconnect" : "connect"}
                    </Link>
                </div>
            )}

            {canJoin && (
                <button className="btn btn-connect" onClick={joinGameHandler}>
                    join
                </button>
            )}
            {host && (
                <Link className="btn-delete" to={`/delete/${gameId}`}>
                    delete
                </Link>
            )}
        </li>
    );
}
