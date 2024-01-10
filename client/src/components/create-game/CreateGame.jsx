import { useEffect, useContext } from "react";
import AuthContext from "../../contexts/AuthContext";

export default function CreateGame() {
    const { createGameHandler } = useContext(AuthContext);

    useEffect(() => {
        createGameHandler();
    }, []);

    return null;
}
