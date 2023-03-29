import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SIGNUP_URL } from "../api/Api";

function SignUpPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setError] = useState(false);
  const navigate = useNavigate();

  function handleSignUp(e: React.FormEvent) {
    e.preventDefault();
    fetch(SIGNUP_URL, {
      method: "POST",
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        email: email,
        role: "admin",
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
        setError(false);
        navigate("/");
      })
      .catch((error) => {
        setError(true);
      });
  }

  return (
    <div>
      <h1>Sign Up</h1>
      <form>
        <input
          type="text"
          value={firstName}
          placeholder="first name"
          onChange={(e) => setFirstName(e.target.value)}
        />
        <br></br>
        <input
          type="text"
          value={lastName}
          placeholder="last name"
          onChange={(e) => setLastName(e.target.value)}
        />
        <br></br>
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
        <input onClick={handleSignUp} type="submit" value="Sign Up" />
      </form>
      {isError ? <p>Error during sign up</p> : <></>}
    </div>
  );
}

export default SignUpPage;
