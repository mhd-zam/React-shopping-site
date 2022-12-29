const express = require('express')
const user= require('../model/signupschema')

const router = express.Router();


router.get('/', async(req, res) => {
    let users = await user.find()
    res.json(users)
})



module.exports =router