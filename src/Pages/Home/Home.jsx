import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import ImageMain from "./Components/ImageMain";
import Login from "./Components/Login";
import Navigation from "./Components/Navigation";
import SignUp from "./Components/SignUp";

const Home = () => {
  const [UserData, setUserData] = useState("");
  const token = localStorage.getItem('token')
  console.log("token", token);
  useEffect(() => {
    axios.get("http://localhost:8080/getImage", {
      headers: {
        "Authentication": token
      }
    }).then((result) => {
      setUserData(result.data);
    });
  }, []);
  console.log(UserData);
  return (
    <div className="row">
      {UserData &&
        UserData.map((item) => (
          <div className="col-4">
            <Card style={{ margin: '10px',display:'flex' }}>
              <Card.Img variant="top" src={item.Image} />
              <Card.Title style={{ margin: '10px' }}>{item.title}</Card.Title>
              <Card.Text style={{ margin: '10px' }}>{item.comment}</Card.Text>
            </Card>
          </div>
        ))}
    </div>
  );
};

export default Home;
