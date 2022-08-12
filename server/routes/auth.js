const router = require('express').Router()
const User = require("../models/User")
const bcrypt = require('bcrypt')

//member registration
router.post("/register",async (req, res)=>{
    try{
        //generate new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        console.log(hashedPassword)

        //create new user
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        });

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
        const isValid = await bcrypt.compare(req.body.password, user.password)

        if(!user){
            res.status(404).json('user not found')
        }
        else if(isValid === false){
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