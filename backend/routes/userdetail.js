
const express = require('express')
const user= require('../model/signupschema')

const router = express.Router();


router.get('/', async (req, res) => {
    console.log(req.query)
    const id=req.query.id
    
    const userdetails = await user.findOne({ _id: id })
    
       res.json(userdetails)
   
})



module.exports =router