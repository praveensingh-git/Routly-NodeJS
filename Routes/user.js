const express=require("express")
const { userSignup } = require("../Controllers/user")
const router=express.Router()

router.post('/',userSignup)

module.exports=router