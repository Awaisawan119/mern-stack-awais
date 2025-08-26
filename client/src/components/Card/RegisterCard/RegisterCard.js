import { useState } from "react";
import { Link } from "react-router-dom";
import "./RegisterCard.css";

const RegisterCard = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleRegister = async () => {
        if (!firstName || !lastName || !email || !password) {
            setMessage("All fields are required");
            return;
        }
        setLoading(true);
        setMessage("");

        try {
            const response = await fetch("http://localhost:5000/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    email,
                    password,
                }),
            });

            const data = await response.json();
            if (response.ok) {
                setMessage("Account created successfully!");
            } else {
                setMessage(data.message || "Registration failed");
            }
        } catch (error) {
            setMessage("Something went wrong");
        }

        setLoading(false);
    };

    return (
        <div className="register__card__container">
            <div className="register__card">
                <div className="register__header">
                    <h1>Create Account</h1>
                </div>
                <div className="register__inputs">
                    <div className="fname__input__container reg__input__container">
                        <label className="fname__label input__label">First name</label>
                        <input
                            type="text"
                            className="fname__input register__input"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>
                    <div className="lname__input__container reg__input__container">
                        <label className="lname__label input__label">Last name</label>
                        <input
                            type="text"
                            className="lname__input register__input"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>
                    <div className="email__input__container reg__input__container">
                        <label className="email__label input__label">Email</label>
                        <input
                            type="email"
                            className="email__input register__input"
                            placeholder="example@gmail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="password__input__container reg__input__container">
                        <label className="password__label input__label">Password</label>
                        <input
                            type="password"
                            className="password__input register__input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="register__button__container">
                        <button
                            className="register__button"
                            onClick={handleRegister}
                            disabled={loading}
                        >
                            {loading ? "Creating..." : "Create Account"}
                        </button>
                    </div>
                    {message && (
                        <div style={{ color: "red", marginTop: "10px" }}>{message}</div>
                    )}
                </div>
                <div className="register__other__actions">
                    <div className="register__login__account">
                        Already have account? <Link to="/account/login">Login</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterCard;
