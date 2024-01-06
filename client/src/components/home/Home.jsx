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
                            <button className="btn">Create Game</button>
                        </div>
                        <div>
                            <span>Friends</span>
                        </div>
                    </div>
                    <div className="home-games-list">
                        {games.map((el) => {
                            return (
                                <GameElement
                                    key={el._id}
                                    isAuth={isAuth}
                                    isPlaying={isPlaying}
                                    userId={userId}
                                    gameId={el._id}
                                    player1={el.player1}
                                    player2={el.player2}
                                />
                            );
                        })}
                    </div>
                </main>
            )}

            {!isAuth && <Login />}
        </>
    );
}
