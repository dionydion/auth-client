import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HIDDENCONTENT_URL } from "./api/Api";
import "./App.css";

function App() {
  const [content, setContent] = useState();

  // const token =
  //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MjNlOTI0OTUyMjM5ZGQ1YzA5MjkyOCIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY4MDA4MTY1NywiZXhwIjoxNjgwMDg1MjU3fQ.TtrpPsyS162TLfW_OcMRaaK_aP0vwqaLZd8NN9V_QI0";
  const navigate = useNavigate();

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
