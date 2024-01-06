import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function GameElement({
    isAuth,
    isPlaying,
    userId,
    gameId,
    player1,
    player2,
}) {
    const navigate = useNavigate();
    const joinGameHandler = async () => {
        console.log("click");
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

    const canJoinGame = isAuth && !isPlaying && userId !== player1._id;

    return (
        <>
            <div className="game-card">
                <h6>{player1.username}</h6>
                <Link to={`/board/${gameId}`}>
                    <img
                        src="/img/images/jent-jiang-YnthMzeMtlU-unsplash.jpg"
                        alt="king image"
                    />
                </Link>
                {canJoinGame && (
                    <button className="btn" onClick={joinGameHandler}>
                        join
                    </button>
                )}
            </div>
        </>
    );
}
