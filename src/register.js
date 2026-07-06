import { useState } from "react";
import "./register.css";

export default function Register({ goToLogin }) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleRegister = async () => {

        setMessage("");
        setError("");

        try {
           const apiUrl = "https://todo-login-backend.onrender.com";

const res = await fetch(apiUrl + "/register", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        username,
        password
    })
});

            const data = await res.json();

            if (res.ok) {
                setMessage(data.message);
                setUsername("");
                setPassword("");
                setTimeout(()=>{
        goToLogin();
    },1500);
            } else {
                setError(data.message);
            }

        } catch (err) {
            setError("Unable to connect to server");
            console.log(err);
        }
    };

    return (
        <div className="register-container">

            <div className="register-card">

                <h1>Create Account</h1>

                {message && (
                    <p className="success-message">{message}</p>
                )}

                {error && (
                    <p className="error-message">{error}</p>
                )}

                <input
                    type="text"
                    placeholder="Enter Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="register-input"
                />

                <input
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="register-input"
                />

                <button
                    onClick={handleRegister}
                    className="register-btn"
                >
                    Register
                </button>

            </div>
                         
<div>
       <p>
    Already have an account?
    <button onClick={goToLogin}>
        Login
    </button>
</p>
</div>
            
        </div>
        
    );
}