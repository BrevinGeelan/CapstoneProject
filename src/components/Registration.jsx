import { useState } from "react";
import {Link} from "react-router-dom"
import { useNavigate } from "react-router-dom";
import "../login.css"

export default function Register() {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword]= useState("");
    const [pass2, setPass2] = useState("")
    const navigate = useNavigate();

    async function handleRegister(event) {
        event.preventDefault();

        try {
            const response = await fetch('https://fakestoreapi.com/users', {
                method:"POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(
                    {
                        email: email,
                        username: username,
                        password: password,
                    }
                )
            })
            const result = await response.json();
            console.log(result)
            alert("Successful registration, returning to Home.\n(Backend in progress/unfinished, please continue to use API provided Logins) ", )
            navigate("/")
        } catch(error) {
            console.error(error)
        }
}

return (
    <div className="register">
        <div className="register-form">
        <form onSubmit={handleRegister}>
        <h2 className="register-title">Register</h2>
            <label className="register-label">
                Email: 
                <input 
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                />
            </label>
            <label className="register-label">
                Username:
                <input 
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                 />
            </label>
            <label className="register-label">
                Password: 
                <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                 />
            </label>
            <label className="register-label">
                Confirm Password: 
                <input 
                type="password"
                value={pass2}
                onChange={(e) => setPass2(e.target.value)}
                required
                 />
            </label>
            <button className="login-button" type="submit">Register!</button>
        </form>
    </div>
    </div>
)
}