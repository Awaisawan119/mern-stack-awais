import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LoginCard.css";

const LoginCard = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        if (!email || !password) {
            setMessage("Email and password are required");
            return;
        }

        setLoading(true);
        setMessage("");

        try {
            const response = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                // Save token in localStorage
                localStorage.setItem("token", data.token);
                setMessage("Login successful!");
                // Redirect to dashboard
                navigate("/dashboard");
            } else {
                setMessage(data.message || "Invalid credentials");
            }
        } catch (error) {
            setMessage("Something went wrong");
        }

        setLoading(false);
    };

    return (
        <div className="login__card__container">
            <div className="login__card">
                <div className="login__header">
                    <h1>Login</h1>
                </div>
                <div className="login__inputs">
                    <div className="email__input__container input__container">
                        <label className="email__label input__label">Email</label>
                        <input
                            type="email"
                            className="email__input login__input"
                            placeholder="example@gmail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="password__input__container input__container">
                        <label className="password__label input__label">Password</label>
                        <input
                            type="password"
                            className="password__input login__input"
                            placeholder="**********"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="login__button__container">
                        <button
                            className="login__button"
                            onClick={handleLogin}
                            disabled={loading}
                        >
                            {loading ? "Logging in..." : "LOGIN"}
                        </button>
                    </div>
                    {message && (
                        <div style={{ color: "red", marginTop: "10px" }}>{message}</div>
                    )}
                </div>
                <div className="login__other__actions">
                    <div className="login__forgot__password">Forgot password?</div>
                    <div className="login__new__account">
                        Don't have an account? <Link to="/account/register">Create account</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginCard;
