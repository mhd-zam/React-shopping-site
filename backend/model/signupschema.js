const mongoose = require("mongoose");

const user = new mongoose.Schema(
  {
    username: { type: String, required:true },
    phone: { type: Number ,required:true },
    email: { type: String ,requried:true },
    password: { type: String ,required:true },
    refreshToken:String 
  },{timestamps:true},
  { versionKey: false }
);

module.exports = mongoose.model("user", user);
