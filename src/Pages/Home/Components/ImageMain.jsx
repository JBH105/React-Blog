import { faEdit, faUserMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useState } from "react";
import { Button, Card } from "react-bootstrap";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";

const ImageMain = (props) => {
  const [userTitle, setuserTitle] = useState("");
  const [userComment, setuserComment] = useState("");
  const [title, settitle] = useState("");
  const [comment, setcomment] = useState("");

  function deletedUser() {
    // props.jdh
    axios.delete(`http://localhost:8080/${props.id}`).then((result) => {
      console.warn(result);
      props.jdh();
    });
  }

  function getUser() {
    axios.get(`http://localhost:8080/${props.id}`).then((result) => {
      //   alert(result);
      //   console.warn(result);
      setuserTitle(result.data.title);
      setuserComment(result.data.comment);
    });
  }

  function userUpdete() {
    const data = {
      title,
      comment,
    };
    console.log(data);
    axios.put(`http://localhost:8080/${props.id}`, data).then((result) => {
      console.warn(result, "abc");
    });
  }
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpen1 = () => {
    setOpen1(true);
  };

  const handleClose1 = () => {
    setOpen1(false);
  };

  return (
    <div className="col-4">
      <Card style={{ margin: "10px" }}>
        <Card.Img variant="top" src={props.image} />
        <Card.Body>
          <div className="d-flex align-items-center justify-content-between">
            <Card.Title className="col-4">{props.title}</Card.Title>
            <span className="d-flex col-3 align-items-center justify-content-between ">
              {/* <Button>
                <FontAwesomeIcon onClick={UpdeteUser} icon={faEdit} />
              </Button> */}
              <div>
                <Button onClick={handleClickOpen}>
                  <FontAwesomeIcon
                    icon={faUserMinus}
                    // onClick={props.jdh}
                  />
                </Button>
                <Dialog
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">
                    {"Delete ?"}
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      Are you sure want to delete this post
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose} color="primary">
                      Disagree
                    </Button>
                    <Button onClick={deletedUser} color="primary" autoFocus>
                      Agree
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>

              <div>
                <Button onClick={handleClickOpen1}>
                  <FontAwesomeIcon
                    icon={faEdit}
                    // onClick={props.jdh}
                  />
                </Button>
                <Dialog
                  open={open1}
                  onClose={handleClose1}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">
                    {"Updete ?"}
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      Are you sure want to Updete this post
                    </DialogContentText>
                  </DialogContent>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Title"
                    type="text"
                    fullWidth
                    onChange={(e) => {
                      settitle(e.target.value);
                    }}
                  />
                  <br />
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    // value={userComment}
                    label="Comment"
                    type="email"
                    fullWidth
                    onChange={(e) => {
                      setcomment(e.target.value);
                    }}
                  />

                  <DialogActions>
                    <Button onClick={handleClose1} color="primary">
                      Disagree
                    </Button>
                    <Button onClick={userUpdete} color="primary" autoFocus>
                      Agree
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>
            </span>
          </div>
          <Card.Title>{props.id}</Card.Title>
          <Card.Text>{props.comment}</Card.Text>
          {/* <Button variant="primary">OK</Button> */}
        </Card.Body>
      </Card>
    </div>
  );
};

export default ImageMain;
