export default function Login() {
    return (
        <main className="login-container">
            <h3>Login</h3>
            <form className="login-form">
                <div>
                    <label htmlFor="email">username</label>
                    <input type="email" id="email" name="email" />
                </div>
                <div>
                    <label htmlFor="password">password</label>
                    <input type="password" id="password" name="password" />
                </div>
                {/* {errorMessage && (
                    <div className="errors">
                        <svg>
                            <use xlinkHref="/img/icons.svg#icon-alert-circle"></use>
                        </svg>
                        <p>{errorMessage}</p>
                    </div>
                )}
                <input className="btn" type="submit" value="login" />
                <p>
                    <span>
                        Sign up <Link to="/users/register">here</Link>
                    </span>
                </p> */}
            </form>
        </main>
    );
}
