const User=require('../Models/user')
async function userSignup(req,res) {
    const {name,email,body}=req.body
    await User.create({
        name,
        email,
        password
    })
    return res.render('home')
}

module.exports={
    userSignup
}