import { useEffect, useContext } from "react";
import AuthContext from "../../contexts/AuthContext";

export default function LeaveGame() {
    const { leaveGameHandler } = useContext(AuthContext);

    useEffect(() => {
        leaveGameHandler();
    }, []);

    return null;
}
