import { useState } from "react";
import {Link} from "react-router-dom"
import { useNavigate } from "react-router-dom";

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
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
            <label>
                Email: 
                <input 
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
            </label>
            <label>
                Username:
                <input 
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                 />
            </label>
            <label>
                Password:
                <input 
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                 />
            </label>
            <label>
                Confirm Password:
                <input 
                type="text"
                value={pass2}
                onChange={(e) => setPass2(e.target.value)}
                 />
            </label>
            <button type="submit">Register!</button>
        </form>
    </div>
)
}