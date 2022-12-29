const express = require('express')
const router = express.Router()

const user=require('../model/signupschema')


router.delete('/',async(req, res) => {
    console.log(req.body);
    let response = await user.deleteOne({ _id: req.body.id })
    
    console.log(response);
    
    res.sendStatus(200)
    
})







module.exports=router