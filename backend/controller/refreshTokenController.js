const user = require("../model/signupschema");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
  handleRefreshToken: async (req, res) => {
    console.log('reached');
    
      const cookies = req.cookies;
      console.log(cookies.jwt);
      const refreshToken = cookies.jwt;

      const founduser =await user.findOne({ refreshToken }).exec();

      console.log(founduser);

        if (!founduser) {
            res.clearCookie('jwt',{httponly:true})
            return res.sendStatus(403)
      } 

      jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
          if (err || founduser.username !== decoded.username) return res.sendStatus(403)
          const accessToken = jwt.sign(
            { username: decoded.username },
              process.env.ACCESS_TOKEN_SECRET,
            {expiresIn:'30s'}
          );          
            res.json({accessToken})
        }
      );
    
  },
};
