import { useState } from "react";
import "./login.css";

export default function Login({ goToRegister }) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

//    const handleLogin = async () => {
//     try {

//         const apiUrl = "https://todo-login-backend.onrender.com";

//         const res = await fetch(apiUrl + "/login", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify({
//                 username,
//                 password
//             })
//         });

//         const data = await res.json();

//         if (res.ok) {
//             localStorage.setItem("token", data.token);
//             alert("Login successful");
//             window.location.reload();
//         } else {
//             alert(data.message);
//         }
//     } catch (err) {
//         console.log(err);
//         alert("Unable to connect to server");
//     }
// };
const handleLogin = async () => {
    try {

        const apiUrl = "https://todo-login-backend.onrender.com";

        const res = await fetch(apiUrl + "/login", {
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

        console.log("Status:", res.status);
        console.log("Data:", data);

        if (res.ok) {

            console.log("Token:", data.token);

            localStorage.setItem("token", data.token);

            console.log("Stored:", localStorage.getItem("token"));

            alert("Login successful");
            window.location.reload();

        } else {
            alert(data.message);
        }

    } catch (err) {
        console.log(err);
        alert("Unable to connect to server");
    }
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