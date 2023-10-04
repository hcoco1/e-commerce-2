import { useState } from "react";

function UserForm() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password_hash, setPassword_hash] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        fetch("http://localhost:5555/register", {
            method: "POST",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: username,
                email: email,
                password_hash: password_hash,
            }),
        })
            .then((r) => r.json())
            .then((newUser) => {
                console.log("User added:", newUser);
                // you can add other logic here if needed
            });
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="username">Username: </label>
                <input 
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
            </div>

            <div>
                <label htmlFor="email">Email: </label>
                <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>

            <div>
                <label htmlFor="password">Password: </label>
                <input
                    id="password"
                    type="password"
                    value={password_hash}
                    onChange={(e) => setPassword_hash(e.target.value)}
                    required
                />
            </div>

            <button type="submit">Register</button>
        </form>
    );
}

export default UserForm;



import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

function UserLogin({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password_hash, setPassword_hash] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    fetch("http://localhost:5555/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password_hash: password_hash,
      }),
      credentials: 'include',
    })
      .then((r) => r.json())
      .then((user) => {
        if (user.message) {
          alert(user.message);
        } else {
          console.log("Logged in as:", user);
          onLogin(user);
          navigate('/user'); // Navigate to the user route
        }
      });
  }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="email">Email: </label>
                <input 
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>

            <div>
                <label htmlFor="password_hash">Password: </label>
                <input
                    id="password_hash"
                    type="password"
                    value={password_hash}
                    onChange={(e) => setPassword_hash(e.target.value)}
                    required
                />
            </div>

            <button type="submit">Login</button>
        </form>
    );
}

export default UserLogin;
