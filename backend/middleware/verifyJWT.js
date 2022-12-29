const jwt = require('jsonwebtoken')
require('dotenv').config();

const  verifyJWT = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    console.log('authheader'+ '  ' + authHeader);
    const cookie = req.cookies;
    if (!authHeader) {
        if (cookie?.jwt) {
            res.sendStatus(403)
        }
        res.sendStatus(401)
    } 
  
    jwt.verify(
        authHeader, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                console.log(err);
                
                return res.sendStatus(403)
            }
            req.user = decoded.username;
            next()
        }
    )
   
}

module.exports={verifyJWT}