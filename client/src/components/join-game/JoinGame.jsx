import { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";

export default function JoinGame() {
    const { joinGameHandler } = useContext(AuthContext);

    const { id } = useParams();

    useEffect(() => {
        joinGameHandler(id);
    }, []);

    return null;
}
