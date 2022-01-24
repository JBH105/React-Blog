var mongoose = require("mongoose");
Schema = mongoose.Schema
console.log(Schema.Types.ObjectId);
const UserPost = Schema({

    title:String,
    comment:String,
    Image:String,
    authorId: {
      type: Schema.Types.ObjectId,
      ref: 'BlogSignup',
      required: true
    },
})

module.exports = mongoose.model("UserPost",UserPost)