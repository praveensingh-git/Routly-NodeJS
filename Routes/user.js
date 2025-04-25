const express=require("express")
const { userSignup,userLogin } = require("../Controllers/user")
const router=express.Router()

router.post('/signup',userSignup)
router.post('/login',userLogin)

module.exports=router