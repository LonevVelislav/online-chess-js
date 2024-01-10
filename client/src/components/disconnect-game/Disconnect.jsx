import { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";

export default function JoinGame() {
    const { disconnectGameHandler } = useContext(AuthContext);

    const { id } = useParams();

    useEffect(() => {
        disconnectGameHandler(id);
    }, []);

    return null;
}
