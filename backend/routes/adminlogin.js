const express = require('express')
const router = express.Router()


router.post('/', (req, res) => {
    let admindata = {
        email: 'admin@admin',
        password:'123456'
    }
    let data = {
        email: 'admin@admin',
        accessToken:'2121dfddjhvgh4d55d46'
    }
    console.log(req.body);
    if (admindata.email === req.body.admin.email && admindata.password === req.body.admin.password) {
        res.status(200).json(data)
    } else {
        res.sendStatus(401)
    }
})



module.exports=router