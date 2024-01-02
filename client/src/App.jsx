import { Routes, Route } from "react-router-dom";

import CastError from "./components/cast-error/CastError";
import Home from "./components/home/Home";
import Board from "./components/board/Board";
import Login from "./components/login/Login";

function App() {
    return (
        <>
            <Routes>
                <Route path="*" element={<CastError />} />
                <Route path="/" element={<Home />} />
                <Route path="/board" element={<Board />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </>
    );
}

export default App;
