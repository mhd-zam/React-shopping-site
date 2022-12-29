const user = require('../model/signupschema')

module.exports = {
    logoutauth: async(req,res) => {
        const cookie = req.cookies;
        console.log(cookie.jwt);
        if (!cookie?.jwt) return res.sendStatus(204)
        const refreshToken = cookie.jwt;

        const tokenquery = await user.findOne({ refreshToken }).exec()
        console.log(tokenquery);
        
        
        if (!tokenquery) {
            res.clearCookie('jwt', { httpOnly: true })
            return res.sendStatus(204);
        }
         await user.updateOne({ refreshToken }, { refreshToken: '' }).exec();
        res.clearCookie('jwt', { httpOnly: true })
        console.log(req.cookies);
        
        res.sendStatus(200);
    }
}