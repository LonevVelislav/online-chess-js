import { useContext } from "react";
import useForm from "../../hooks/useForm";
import AuthContext from "../../contexts/AuthContext";
import { Link } from "react-router-dom";

const LoginKeys = {
    Username: "username",
    Password: "password",
};

export default function Login() {
    const { loginHandler, errorMessage } = useContext(AuthContext);
    const { values, onChange, onSubmit } = useForm(loginHandler, {
        [LoginKeys.Username]: "",
        [LoginKeys.Password]: "",
    });
    return (
        <main className="login-container">
            <Link className="btn btn-connect" to="/">
                &larr; Home
            </Link>
            <h6>Login</h6>
            <form className="login-form" onSubmit={onSubmit}>
                <div>
                    <label htmlFor="text">username</label>
                    <input
                        type="text"
                        id="username"
                        name={LoginKeys.Username}
                        onChange={onChange}
                        value={values[LoginKeys.Username]}
                    />
                </div>
                <div>
                    <label htmlFor="password">password</label>
                    <input
                        type="password"
                        id="password"
                        name={LoginKeys.Password}
                        onChange={onChange}
                        value={values[LoginKeys.Password]}
                    />
                </div>

                {errorMessage && (
                    <div className="error-message">
                        <p>{errorMessage + "!"}</p>
                    </div>
                )}
                <input type="submit" value="login" />
            </form>
        </main>
    );
}
