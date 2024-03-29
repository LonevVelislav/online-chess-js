import { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";

export default function Delete() {
    const { deleteGameHandler } = useContext(AuthContext);

    const { id } = useParams();

    useEffect(() => {
        deleteGameHandler(id);
    }, []);

    return null;
}
