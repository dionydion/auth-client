import { Link } from "react-router-dom";

function AuthPage() {
  return (
    <div>
      <Link to="/signup">Signup</Link>
      <br />
      <Link to="/login">Login</Link>
    </div>
  );
}

export default AuthPage;
