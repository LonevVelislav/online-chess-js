import { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import AuthContext from "../../contexts/AuthContext";

import GameElement from "./game-element/GameElement";
import Login from "../login/Login";

export default function Home() {
    const navigate = useNavigate();
    const { username, isAuth, isPlaying, userId } = useContext(AuthContext);
    const [games, setGames] = useState([]);

    useEffect(() => {
        fetch("http://192.168.103:3010/for-the-king/games")
            .then((data) => data.json())
            .then((res) => {
                setGames(res.data.games);
            })
            .catch((err) => navigate("/404"));
    }, [userId]);

    return (
        <>
            {isAuth && (
                <main className="home-page">
                    <div className="home-player-stats">
                        <div>
                            <span>{username}</span>
                        </div>
                        <div>
                            <Link className="btn" to="/create">
                                Create Game
                            </Link>
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
                                    el.host !== userId &&
                                    el.player2 === undefined &&
                                    isPlaying === false;

                                const myGame =
                                    el.player1._id === userId ||
                                    el.player2?._id === userId;

                                const host = el.player1._id === userId;

                                const secondPlayer =
                                    el.player1._id !== userId &&
                                    el.player2?._id === userId;

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
                                            secondPlayer={secondPlayer}
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
