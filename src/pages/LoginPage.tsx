import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LOGIN_URL } from "../api/Api";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setError] = useState(false);
  const navigate = useNavigate();

  function handleLogIn(e: React.FormEvent) {
    e.preventDefault();
    fetch(LOGIN_URL, {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) return res.json();
        setError(true);
      })
      .then(async (data) => {
        console.log(data);
        await localStorage.setItem("token", data.accessToken);
        setError(true);
        navigate("/");
      })
      .catch((error) => {
        setError(true);
      });
  }

  return (
    <div>
      <Link to="/signup">Oops, I want to sign up instead.</Link>
      <h1>Log In</h1>
      <form>
        <input
          type="text"
          value={email}
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <br></br>
        <input
          type="password"
          value={password}
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <br></br>
        {isError ? <p>Wrong email or password</p> : <></>}
        <br></br>
        <input type="submit" onClick={handleLogIn} value="Log In" />
      </form>
    </div>
  );
}

export default LoginPage;
