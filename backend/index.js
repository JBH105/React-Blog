const express = require("express");
const app = express();
const url = require("./Models/Url");
multer = require("multer");
const port = 8080;
const mongoose = require("mongoose");
//....Models.....//
const SignUp = require("./Models/SignUp");
const UserPost = require("./Models/Post");
const util = require('util');
const TextEncoder = new util.TextEncoder();
const bodyparser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//....Cors....//
const cors = require("cors");
app.use(cors());

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
mongoose
  .connect(url, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Done");
  })
  .catch((err) => {
    console.log(err);
  });

app.post("/userpost", (req, res) => {
  const userPost = new UserPost({
    title: req.body.title,
    description: req.body.description,
  });
  userPost.save().then((result) => {
    res.json(result);
  });
});

app.get("/usedata", (req, res) => {
  UserPost.find().then((result) => {
    res.json(result);
  });
});
//....Save User Post and Images .....//

var storage = multer.diskStorage({
  destination: "../public/images",
  filename: (req, file, cb) => {
    // console.log(file)
    cb(null, file.originalname + "_" + Date.now() + ".png");
    // file.fieldname is name of the field (image)
    // path.extname get the uploaded file extension
  },
});
// console.log(multer.diskStorage.filename);

var upload = multer({ storage: storage }).array("file");

app.post("/upload", function (req, res) {
  jwt.verify(req.headers.authentication, "abc123", function (err, token) {
    // console.log(token,"ppppppppppp")
    if (err) {
      res.status(400).send("Invalid");
    } else if (token) {
      upload(req, res, function (err) {
        console.log(req.body)
        const post = new UserPost({
          authorId: token.user_id,
          title: req.body.title,
          comment: req.body.comment,
          Image: `../../images/${req.files[0].filename}`,
        });
        post.save().then((result) => {
          res.json(result);
        });
      });
    } else {
      console.log("nothing  to show here");
    }
  });
});
app.get("/getImage", (req, res) => {
  // console.log(authentication);
  jwt.verify(req.headers.authentication, "abc123", function (err, token) {
    if (err) {
      res.status(400).send("Invalid");
    } else if (token) {
      UserPost.find({authorId:token.user_id}).then((res1) => {
        res.json(res1);
      });
    }
    else{
      console.log("nothing  to show here");
    }
  });
});

//.... Get Data By ID ....//

app.get("/:id", (req, res) => {
  UserPost.findById({ _id: req.params.id })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
});

//....  Update UserPost .....//
app.put("/:id", (req, res) => {
  UserPost.updateOne(
    { _id: req.params.id },
    {
      $set: {
        title: req.body.title,
        comment: req.body.comment,
        // Image: req.body.Image,
      },
    }
  ).then((result) => {
    res.json(result);
  });
});

//.... Delete UserPost .... //

app.delete("/:id", (req, res) => {
  UserPost.deleteOne({ _id: req.params.id })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
});

//......SignUP.......//

app.post("/signup", (req, res) => {
  const signup = new SignUp({
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10),
  });
  const token = jwt.sign({ password: signup.password }, "abcd123", {
    expiresIn: "2h",
  });
  //   console.log(token,"token")
  signup.save().then((res1) => {
    console.log(res1);
    res.json({ res1, token });
  });
});

//.....Login User......//

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    const user = await SignUp.findOne({ email });
    console.log(user);

    console.log(user);
    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign({ user_id: user._id, email }, "abc123", {
        expiresIn: "2h",
      });

      // save user token
      user.token = token;


      res.status(200).json({ token: token });
      // console.log(user);
      // user
    }
    res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, () => {
  console.log(port);
});
