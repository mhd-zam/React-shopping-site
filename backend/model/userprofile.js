const mongoose = require('mongoose')

const profile = new mongoose.Schema({
    img: { type: String },
    id:{type:String}
})

module.exports = mongoose.model('profile', profile);