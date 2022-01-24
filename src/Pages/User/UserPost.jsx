import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { Card } from "react-bootstrap";
import "../../App.css";
import ImageMain from "../Home/Components/ImageMain";

function UserPost() {
  const token = localStorage.getItem("token");
  const [Image, setImage] = useState("");
  const [userimage, setUserImage] = useState("");
  const [title, settitle] = useState("");
  const [comment, setcomment] = useState("");
  const [reload, setReload] = useState(true);
  const pagereload = () => {
    setReload(!reload);
    console.log("changed");
  };

  function onHandler(e) {
    setImage(e.target.files[0]);
    console.log(e.target.files[0]);
    //   console.log(Image);
  }
  const postData = [
    {
      title: JSON.stringify(title),
      comment: JSON.stringify(comment),
    },
  ];
  console.log(postData);

  function getSave(e) {
    e.preventDefault();
    const datafile = new FormData();

    // console.log(data)
    datafile.append("file", Image);
    datafile.append("title", title);
    datafile.append("comment", comment);

    console.log(datafile);

    axios({
      url: "http://localhost:8080/upload",
      method: "post",
      data: datafile,
      headers: {
        Authentication: token,
      },
    }).then((res) => {
      console.log(res);
      // setReload(!reload)
    });
  }
  useEffect(async () => {
    try {
      await axios
        .get("http://localhost:8080/getImage", {
          headers: {
            Authentication: token,
          },
        })
        .then((d) => {
          setUserImage(d.data);
        });
    } catch {
      console.log("error");
    }
  }, [reload]);
  // console.log(userimage);
  return (
    <>
      <br />
      <br />
      <Card
        style={{ margin: "0 auto", backgroundColor: "oldlace" }}
        className=" col-lg-4 col-md-6 col-sm-8 col-11"
      >
        <h5>Share Post</h5>
        <input
          type="text"
          placeholder="Title"
          onChange={(e) => {
            settitle(e.target.value);
          }}
        />
        <br />
        <textarea
          placeholder="Comment"
          onChange={(e) => {
            setcomment(e.target.value);
          }}
          cols="30"
          rows="10"
        />
        <br />
        <h6>Upload Image*</h6>
        <input type="file" encType="multipart/form-data" onChange={onHandler} />
        <br />
        <button onClick={getSave}>Save</button>
      </Card>
      <br />
      <br />
      <div className="row">
        {userimage &&
          userimage.map((props, i) => (
            <tr>
              <ImageMain
                jdh={pagereload}
                image={props.Image}
                title={props.title}
                comment={props.comment}
                id={props._id}
              />
            </tr>
          ))}
      </div>
    </>
  );
}

export default UserPost;
