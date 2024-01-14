import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import useAuthState from "../hooks/useAuthState";

const AuthContext = createContext();

export const AuthProveder = ({ children }) => {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");
    const [auth, setAuth] = useAuthState("auth", {});

    const registerHandler = async (values) => {
        fetch("http://192.168.103:3010/for-the-king/users/register", {
            method: "POST",
            body: JSON.stringify(values),
            headers: {
                "content-type": "application/json",
            },
        })
            .then((data) => data.json())
            .then((res) => {
                if (res.status === "success") {
                    setAuth({
                        _id: res.data.user._id,
                        username: res.data.user.username,
                        playing: res.data.user.playing,
                        inGame: res.data.user.inGame,
                        image: res.data.user.image,
                        token: res.token,
                    });
                    localStorage.setItem("token", res.token);
                    navigate("/");
                }
                if (res.status === "fail") {
                    setErrorMessage(res.message);
                    setTimeout(() => {
                        setErrorMessage("");
                    }, 3000);
                }
            })
            .catch((err) => navigate("/404"));
    };

    const loginHandler = async (values) => {
        fetch("http://192.168.103:3010/for-the-king/users/login", {
            method: "POST",
            body: JSON.stringify(values),
            headers: {
                "content-type": "application/json",
            },
        })
            .then((data) => data.json())
            .then((res) => {
                if (res.status === "success") {
                    setAuth({
                        _id: res.data.user._id,
                        username: res.data.user.username,
                        playing: res.data.user.playing,
                        image: res.data.user.image,
                        token: res.token,
                    });
                    localStorage.setItem("token", res.token);
                    navigate("/");
                }
                if (res.status === "fail") {
                    setErrorMessage(res.message);
                    setTimeout(() => {
                        setErrorMessage("");
                    }, 3000);
                }
            })
            .catch((err) => navigate("/404"));
    };

    const editAccountHandler = async (values) => {
        fetch("http://192.168.0.103:3010/for-the-king/users/updateUser", {
            method: "PATCH",
            body: values,
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
            .then((data) => data.json())
            .then((res) => {
                if (res.status === "success") {
                    setAuth((state) => {
                        return {
                            ...state,
                            image: res.data.user.image,
                            username: res.data.user.username,
                        };
                    });
                    navigate("/account");
                }
                if (res.status === "fail") {
                    setErrorMessage(res.message);
                    setTimeout(() => {
                        setErrorMessage("");
                    }, 3000);
                }
            })
            .catch((err) => {
                console.log(err);

                navigate("/404");
            });
    };

    const logoutHandler = () => {
        setAuth({});
        localStorage.removeItem("token");
    };

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
                    setAuth((state) => {
                        return {
                            ...state,
                            playing: true,
                        };
                    });
                    navigate(`/board/${res.data.newGame._id}`);
                }
                if (res.status === "fail") {
                    navigate(`/`);
                }
            })
            .catch((err) => {
                console.log(err.message);
                return navigate("/404");
            });
    };

    const joinGameHandler = async (id) => {
        fetch(`http://192.168.103:3010/for-the-king/games/join/${id}`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
            .then((data) => data.json())
            .then((res) => {
                if (res.status === "success") {
                    setAuth((state) => {
                        return {
                            ...state,
                            playing: true,
                        };
                    });
                    navigate(`/board/${id}`);
                }
                if (res.status === "fail") {
                    navigate("/404");
                }
            })
            .catch((err) => navigate("/404"));
    };

    const disconnectGameHandler = async (id) => {
        fetch(`http://192.168.103:3010/for-the-king/games/disconnect/${id}`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
            .then((data) => data.json())
            .then((res) => {
                if (res.status === "success") {
                    setAuth((state) => {
                        return {
                            ...state,
                            playing: false,
                        };
                    });
                    navigate(`/`);
                }
                if (res.status === "fail") {
                    navigate("/404");
                }
            })
            .catch((err) => navigate("/404"));
    };

    const leaveGameHandler = () => {
        setAuth((state) => {
            return { ...state, playing: false };
        });
        navigate("/");
    };

    const deleteGameHandler = (id) => {
        fetch(`http://192.168.103:3010/for-the-king/games/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
            .then((res) => {
                if (res.ok) {
                    setAuth((state) => {
                        return { ...state, playing: false };
                    });
                    navigate("/");
                }
            })
            .catch((err) => {
                return navigate("/404");
            });
    };

    const values = {
        editAccountHandler,
        createGameHandler,
        disconnectGameHandler,
        leaveGameHandler,
        joinGameHandler,
        deleteGameHandler,
        logoutHandler,
        registerHandler,
        loginHandler,
        errorMessage,
        username: auth.username,
        userId: auth._id,
        isAuth: !!auth.token,
        isPlaying: auth.playing,
        inGame: auth.inGame,
        image: auth.image,
    };

    return (
        <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
    );
};

AuthContext.displayName = "AuthContext";

export default AuthContext;
