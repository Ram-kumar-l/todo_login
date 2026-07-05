import { useState } from "react";
import "./login.css";

export default function Login({ goToRegister }) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        fetch("https://todo-login-backend.onrender.com", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username,
                password
            })
        })
        .then(res => res.json())
        .then(data => {
            localStorage.setItem("token", data.token);
            window.location.reload();
        });
    };

    return (
        <div className="login-container">

            <p>
    Don't have an account?
    <button onClick={goToRegister}>
        Register
    </button>
</p>
            <div className="login-card">
                <h1>Login</h1>

                <input
                    className="login-input"
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <input
                    className="login-input"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    className="login-btn"
                    onClick={handleLogin}
                >
                    Login
                </button>
            </div>
        </div>
    );
}