export default function Login() {
    return (
        <main className="login-container">
            <h6>Login</h6>
            <form className="login-form">
                <div>
                    <label htmlFor="email">username</label>
                    <input type="email" id="email" name="email" />
                </div>
                <div>
                    <label htmlFor="password">password</label>
                    <input type="password" id="password" name="password" />
                </div>
            </form>
        </main>
    );
}
