var mongoose = require("mongoose");
Schema = mongoose.Schema
const SignUp = Schema({
  name: String,
  email: String,
  password:String ,
 
});

module.exports = mongoose.model("BlogSignup",SignUp)