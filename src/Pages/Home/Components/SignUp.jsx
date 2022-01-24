import axios from "axios";
import React, { useState, useEffect } from "react";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function getsave() {
    console.log({ name, email, password });
    var data = { name, email, password };
    // console.log(data)
    axios.post('http://localhost:8080/signup',data)
      .then((res)=>{
          console.log(res);
      })
  }


  return (
    <div>
      <h1>SignUp</h1>
      <input
        type="text"
        placeholder="Name"
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <br />
      <br />
      <input
        type="email"
        placeholder="email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <br />
      <br />
      <input
        type="password"
        placeholder="password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <br />
      <br />
      <button onClick={getsave}>Save</button>
    </div>
  );
}

export default SignUp;
