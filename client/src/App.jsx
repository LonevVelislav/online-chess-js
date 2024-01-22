import { Routes, Route } from "react-router-dom";

import CastError from "./components/cast-error/CastError";
import Home from "./components/home/Home";
import Board from "./components/board/Board";
import Logout from "./components/logout/Logout";
import Delete from "./components/delete/Delete";
import JoinGame from "./components/join-game/JoinGame";
import Disconnect from "./components/disconnect-game/Disconnect";
import CreateGame from "./components/create-game/CreateGame";
import AccountPage from "./components/account-page/AccountPage";
import LeaveGame from "./components/leave-game/LeaveGame";

import { AuthProveder } from "./contexts/AuthContext";

function App() {
    return (
        <AuthProveder>
            <Routes>
                <Route path="*" element={<CastError />} />
                <Route path="/" element={<Home />} />
                <Route path="/board/:id" element={<Board />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/create" element={<CreateGame />} />
                <Route path="/delete/:id" element={<Delete />} />
                <Route path="/join/:id" element={<JoinGame />} />
                <Route path="/leave" element={<LeaveGame />} />
                <Route path="/disconnect/:id" element={<Disconnect />} />
                <Route path="/account" element={<AccountPage />} />
            </Routes>
        </AuthProveder>
    );
}

export default App;
