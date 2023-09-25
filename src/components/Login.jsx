import React, {useState} from "react";
import {useNavigate} from "react-router-dom";


export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [token, setToken] = useState("")
    const navigate = useNavigate()



    //"id": 1,
  //  "email": "john@gmail.com",
   // "username": "johnd",
    //"password": "m38rmF$",
   // "name": {
   //     "firstname": "john",
    //    "lastname": "doe"
   // },
    //"phone": "1-570-236-7033",
    async function handleLogin(event) {
        event.preventDefault();   
        try {
            const response = await fetch("https://fakestoreapi.com/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: 'johnd',
                    password: "m38rmF$"
                }),
            });

            if (response.ok) {
                const result = await response.json();
                const token = result.token;

                localStorage.setItem("token", result.token);
                console.log("Authentication Successful");
                console.log("received token", token)
                setToken(result.token)
                navigate("/")
                window.location.reload()
            } else{
                console.error("Authentication failed");
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            <h2>Login!</h2>
            <form onSubmit={handleLogin}>
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
                <button type="submit">Login</button>
            </form>
        </div>
    );
}