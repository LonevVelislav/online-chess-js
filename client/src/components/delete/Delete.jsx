import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function Delete() {
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        fetch(`http://192.168.103:3010/for-the-king/games/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
            .then((res) => {
                if (res.ok) {
                    return navigate("/");
                }
            })
            .catch((err) => {
                return navigate("/404");
            });
    }, []);

    return null;
}
