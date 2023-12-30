import { Routes, Route } from "react-router-dom";

import CastError from "./components/cast-error/CastError";
import Home from "./components/home/Home";
import Board from "./components/board/Board";

function App() {
  return (
    <>
      <Routes>
        <Route path="*" element={<CastError />} />
        <Route path="/" element={<Home />} />
        <Route path="/board" element={<Board />} />
      </Routes>
    </>
  );
}

export default App;
