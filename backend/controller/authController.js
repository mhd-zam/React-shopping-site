const user = require("../model/signupschema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config;

module.exports = {
  sigupinsert: (data) => {
    return new Promise(async (resolve, reject) => {
      data.phone = parseInt(data.phone);
      const result = await user
        .findOne({ $or: [{ email: data.email }, { phone: data.phone }] })
        .exec();
      console.log(result);

      if (result) {
        console.log("user exsist");
        reject();
      } else {
        try {
          bcrypt.hash(data.password, 10).then(async (hashpass) => {
            data.password = hashpass;
            const customer = await user.create(data);
            console.log(customer);
          });
          resolve();
        } catch (err) {
          console.log(err);
          reject();
        }
      }
    });
  },
  logincheck: (data) => {
    console.log(data.email);
    
    return new Promise(async (resolve, reject) => {
      let result = await user.findOne({ email: data.email }).exec();
      if (result) {
        try {
          bcrypt
            .compare(data.password, result.password)
            .then(async (responese) => {
              if (responese) {
                //jwt create
                let val = result.toJSON();
                const accessToken = jwt.sign(
                  { username: val.username },
                  process.env.ACCESS_TOKEN_SECRET,
                  { expiresIn: "30s" }
                );
                const refreshToken = jwt.sign(
                  { username: val.username },
                  process.env.REFRESH_TOKEN_SECRET,
                  { expiresIn: "1d" }
                );
                await user.updateOne(
                  { email: val.email },
                  { $set: { refreshToken:refreshToken } }
                );
                const data = {
                  userdetails: {
                    id: val._id,
                    username: val.username,
                    email: val.email,
                    phone: val.phone,
                    accessToken
                  },
                  refreshToken
                }
                resolve(data);
              } else {  
                reject({status:400})
              }
            });
        } catch (err) {
          console.log(err);
        }
      } else {
        reject({status:401});
      }
    });
  },
};
