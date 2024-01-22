import config from "../../config";
import { v4 as uuidv4 } from "uuid";

import { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import io from "socket.io-client";

import AuthContext from "../../contexts/AuthContext";
import useDidMountEffect from "../../hooks/didMountHook";

import GameElement from "./game-element/GameElement";

const socket = io.connect(config.host);
export default function Home() {
    const navigate = useNavigate();
    const { username, isAuth, isPlaying, userId, image, registerHandler } =
        useContext(AuthContext);
    const [games, setGames] = useState([]);
    const [message, setMessage] = useState("");
    const [messageElement, setMessageElement] = useState({});
    useEffect(() => {
        if (!isAuth) {
            registerHandler({
                username: `guest-${uuidv4()}`,
            });
        }
    }, []);

    useEffect(() => {
        fetch(`${config.host}/for-the-king/games`)
            .then((data) => data.json())
            .then((res) => {
                setGames(res.data.games);
            })
            .catch((err) => navigate("/404"));
    }, [userId]);

    useEffect(() => {
        socket.on("recieve_message", (payload) => {
            setMessageElement(payload);
        });
    }, [socket]);
    useDidMountEffect(() => {
        if (messageElement.message) {
            const element = createChatElement(messageElement);
            document.querySelector(".home-chat-room").appendChild(element);
            setMessageElement({});
        }
    }, [messageElement.message]);

    const sendMessage = (e) => {
        e.preventDefault();
        if (message) {
            let payload = {
                userId: userId,
                image: image,
                username: username,
                message: message,
            };
            setMessage("");
            setMessageElement(payload);

            socket.emit("send_message", payload);
        }
    };

    function createChatElement(data) {
        const div = document.createElement("div");
        div.className = "chat-list-item";
        const imageElement = document.createElement("img");
        const span = document.createElement("span");
        const p = document.createElement("p");
        imageElement.src =
            data.image === "default.jpeg"
                ? `${config.host}/photos/${data.image}`
                : `${config.host}/photos/${data.userId}/${data.image}`;
        imageElement.className = "avatar";
        span.textContent = `${data.username}:`;
        p.textContent = data.message;
        div.appendChild(imageElement);
        div.appendChild(span);
        div.appendChild(p);
        setTimeout(() => removeElement(div), 11000);
        return div;
    }

    function removeElement(element) {
        element.remove();
        clearTimeout(removeElement);
    }

    return (
        <main className="home-page">
            <div className="home-player-stats">
                <Link className="account-link" to="/account">
                    <img
                        className="avatar"
                        src={
                            image === "default.jpeg"
                                ? `${config.host}/photos/${image}`
                                : `${config.host}/photos/${userId}/${image}`
                        }
                        alt={image}
                    />
                    <span>{username}</span>
                </Link>
                <Link className="btn btn-connect" to="/create">
                    Create Game
                </Link>
            </div>

            <div className="home-games-list-container">
                <button
                    className="btn btn-connect refresh"
                    onClick={() => location.reload()}
                >
                    &#x21bb;
                </button>
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
            <div className="home-chat-room">
                <form onSubmit={sendMessage}>
                    <input
                        className="btn btn-connect"
                        type="submit"
                        value="send"
                    ></input>
                    <input
                        className="chat-room-input"
                        type="text"
                        placeholder="message..."
                        onChange={(e) => {
                            setMessage(e.target.value);
                        }}
                        value={message}
                    />
                </form>
            </div>
        </main>
    );
}
