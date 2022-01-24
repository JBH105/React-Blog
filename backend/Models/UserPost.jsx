const mongoose = require('mongoose')

const userPost = new mongoose.Schema({
    title:String,
    description:String
})

module.exports = mongoose.model('UserPost', userPost);