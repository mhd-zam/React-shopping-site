const express = require('express')
const user = require('../model/signupschema')
var mongoose = require('mongoose')
const ObjectId = require('mongodb').ObjectId;


const router = express.Router()


router.post('/', async (req, res) => {
    console.log(req.body.user.username);
    let response = await user.updateOne({ _id: ObjectId(req.body.user._id) }, { 'username': req.body.user.username, 'email': req.body.user.email, 'phone': req.body.user.phone } )
    console.log(response);
    res.sendStatus(200)
})











module.exports=router