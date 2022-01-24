// import e from "cors";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory("");

  function getFormData(e) {
    e.preventDefault();
  }

  function getLogin() {
    var data = {
      email,
      password,
    };
    console.warn(data);
    axios.post("http://localhost:8080/login", data).then((result) => {
      console.log(result);
      if (result) {
        console.log(result.data.token);
        localStorage.setItem("token", result.data.token);
        history.push({
          pathname: "/UserPost",
          state: result.data.email,
        });
      }
      else{
        <h1>Error</h1>
      }
    });
  }
  return (
    <div>
      <h3>Login </h3>
      <br />
      <form onSubmit={getFormData}>
        <input
          type="email"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <br />
        <input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <br />
        <button onClick={() => getLogin()}>Save</button>
      </form>
    </div>
  );
}

export default Login;
