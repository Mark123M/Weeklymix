const router = require('express').Router()
const User = require("../models/User")

//member registration
router.post("/register",async (req, res)=>{
    const newUser = new User(req.body)
    try{
        //save user
        const user = await newUser.save() //waits until the process is finished before executing next line
        res.status(200).json(user)
    } catch(err){
        res.status(500).json(err)
    }
})

//member login
router.post("/login", async(req, res)=>{
    try{
        //find user with matching email
        const user = await User.findOne({email: req.body.email});

        if(!user){
            res.status(404).json('user not found')
        }
        else if(req.body.password != user.password){
            res.status(400).json('incorrect password')
        } 
        else{
            res.status(200).json(user)
        } 

    } catch (err){
        res.status(500).json(err)
    } 
    //res.json(req.body.email)
   
}) 

module.exports = router