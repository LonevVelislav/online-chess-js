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
        console.log(values);
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

    const values = {
        registerHandler,
        loginHandler,
        errorMessage,
        username: auth.username,
        userId: auth._id,
        isAuth: !!auth.token,
        isPlaying: auth.playing,
    };

    return (
        <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
    );
};

AuthContext.displayName = "AuthContext";

export default AuthContext;
