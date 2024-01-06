import { Routes, Route } from "react-router-dom";

import CastError from "./components/cast-error/CastError";
import Home from "./components/home/Home";
import Board from "./components/board/Board";
import Login from "./components/login/Login";
import Register from "./components/register/Resiter";

import { AuthProveder } from "./contexts/AuthContext";

function App() {
    return (
        <AuthProveder>
            <Routes>
                <Route path="*" element={<CastError />} />
                <Route path="/" element={<Home />} />
                <Route path="/board/:id" element={<Board />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </AuthProveder>
    );
}

export default App;
