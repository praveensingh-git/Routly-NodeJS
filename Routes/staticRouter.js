const express = require('express')
const router = express.Router()
const URL=require('../Models/url')

router.get('/',async(req,res)=>{
    if(!req.user) return res.redirect('/login')

    const allURLs=await URL.find({createdBy:req.user._id})
    return res.render('home',{
        urls:allURLs
    })
})

router.get('/signup',(req,res)=>{
    return res.render('signup')
})

router.get('/login',(req,res)=>{
    return res.render('login')
})

module.exports=router

