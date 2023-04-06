import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HIDDENCONTENT_URL } from "./api/Api";
import "./App.css";

function App() {
  const [content, setContent] = useState();
  const navigate = useNavigate();

  console.log("hello");
  console.log("ci/cd tool should finally work now!!");

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);
    if (token) {
      console.log("here");
      fetch(HIDDENCONTENT_URL, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (res.ok) return res.json();
          navigate("/auth");
        })
        .then((data) => {
          console.log(data);
          setContent(data.message);
        })
        .catch((error) => {
          navigate("/auth");
        });
    } else {
      navigate("/auth");
    }
  }, []);

  return <div className="App">{content}</div>;
}

export default App;
