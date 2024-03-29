import config from "../../config";
import { useState, useContext } from "react";

import AuthContext from "../../contexts/AuthContext";
import { Link } from "react-router-dom";

export default function AccountPage() {
    const { username, image, userId, errorMessage, editAccountHandler, guest } =
        useContext(AuthContext);
    const [usernameValue, setUsernameValue] = useState(username);

    const onUsernameChange = (e) => {
        setUsernameValue(e.target.value);
    };

    const submitEditHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        const imageFile = document.getElementById("image").files.length > 0;
        if (imageFile) {
            formData.append("image", document.getElementById("image").files[0]);
        }
        formData.append("username", document.getElementById("username").value);
        await editAccountHandler(formData);
    };

    return (
        <main className="login-container">
            <form className="login-form" onSubmit={submitEditHandler}>
                {!guest && (
                    <div>
                        <label htmlFor="image">Profile picture</label>

                        <input type="file" id="image" name="image" />

                        <img
                            className="avatar-account"
                            src={
                                image === "default.jpeg"
                                    ? `${config.host}/photos/${image}`
                                    : `${config.host}/photos/${userId}/${image}`
                            }
                            alt={image}
                        />
                    </div>
                )}

                <div>
                    <label htmlFor="username">username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={usernameValue}
                        onChange={onUsernameChange}
                    />
                </div>
                <div>
                    <input
                        type="submit"
                        className="btn btn-connect"
                        value="change"
                    />
                    <Link className="btn btn-connect" to={"/"}>
                        main menu &rarr;
                    </Link>
                </div>
                {errorMessage && (
                    <div className="error-message">
                        <p>{errorMessage + "!"}</p>
                    </div>
                )}
            </form>
        </main>
    );
}
