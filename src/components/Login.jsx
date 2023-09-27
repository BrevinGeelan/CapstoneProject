import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import "../login.css"


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
        <>
            
            <div className="login-page">
            <div className="login-form">
            <h2 className="login-head">Login!</h2>
            <form onSubmit={handleLogin}>
                <label>
                    Username: 
                    <input 
                    className="login-input"
                    type="text"
                    value={username}
                    placeholder="johnd"
                    onChange={(e) => setUsername(e.target.value)}
                    required
                     />
                </label>
                <label>
                    Password:
                    <input 
                    className="login-input"
                    type="password"
                    value={password}
                    placeholder="m38rmF$"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                     />
                </label>
                <div className="buttons">
                <button className="login-button" type="submit">Login</button>
                <p>or</p>
                <button className="register-button" onClick={() => navigate("/Registration")}>Create an Account!</button>
                </div>
            </form>
            </div>
        </div>
       
        </>
    );
}