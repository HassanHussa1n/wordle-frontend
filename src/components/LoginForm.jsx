import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [usernames, setUsernames] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsernames = async () => {
      try {
        const response = await axios.get("http://localhost:4000/users");
        console.log(response.data.data)
        const fetchedUsernames = response.data.data.map(user => user.username);
        setUsernames(fetchedUsernames);
      } catch (error) {
        console.error("Error fetching the usernames: ", error);
      }
    };

    fetchUsernames();
  }, []);

  //console.log(usernames);

  const handleLogin = (e) => {
    e.preventDefault();
    // Replace this with actual login logic
    if (usernames.includes(username)) {
      navigate("/welcome");
    }
    else {
      alert("Username not found!")
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <a href="/signup">Sign up</a>
      </p>
    </div>
  );
};

export default LoginForm;
