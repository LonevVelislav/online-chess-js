import { Link } from "react-router-dom";

export default function CastError() {
    return (
        <>
            <h1 className="error-message ">Eror 404 &#9747;</h1>
            <Link
                className="btn btn-connect"
                style={{ fontSize: "2rem" }}
                to={"/"}
            >
                Home
            </Link>
        </>
    );
}
