import { useContext, useState, useEffect, createContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import AuthContext from "../../contexts/AuthContext";

import GameElement from "./game-element/GameElement";
import Login from "../login/Login";

export default function Home() {
    const navigate = useNavigate();
    const { username, isAuth, isPlaying, userId, inGame } =
        useContext(AuthContext);
    const [games, setGames] = useState([]);

    useEffect(() => {
        fetch("http://192.168.103:3010/for-the-king/games")
            .then((data) => data.json())
            .then((res) => {
                setGames(res.data.games);
            })
            .catch((err) => navigate("/404"));
    }, [userId]);

    const createGameHandler = async () => {
        fetch("http://192.168.103:3010/for-the-king/games", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "content-type": "application/json",
            },
        })
            .then((data) => data.json())
            .then((res) => {
                if (res.status === "success") {
                    navigate(`/board/${res.data.newGame._id}`);
                }
            })
            .catch((err) => {
                console.log(err.message);
                return navigate("/404");
            });
    };

    return (
        <>
            {isAuth && (
                <main className="home-page">
                    <div className="home-player-stats">
                        <div>
                            <span>{username}</span>
                        </div>
                        <div>
                            <button className="btn" onClick={createGameHandler}>
                                Create Game
                            </button>
                        </div>
                        <div>
                            <span>Friends</span>
                        </div>
                        <div>
                            <Link to="/logout">logout</Link>
                        </div>
                    </div>
                    <div className="home-games-list-container">
                        <ul className="home-games-list">
                            {games.map((el) => {
                                const canJoin =
                                    el.player1._id !== userId &&
                                    el.player2 === undefined &&
                                    isPlaying === false;

                                const myGame =
                                    el.player1._id === userId ||
                                    el.player2?._id === userId;

                                const host = el.player1._id === userId;

                                if (myGame || canJoin) {
                                    return (
                                        <GameElement
                                            key={el._id}
                                            gameId={el._id}
                                            player1={el.player1}
                                            player2={el.player2}
                                            canJoin={canJoin}
                                            myGame={myGame}
                                            host={host}
                                        />
                                    );
                                }
                            })}
                        </ul>
                    </div>
                </main>
            )}

            {!isAuth && <Login />}
        </>
    );
}
