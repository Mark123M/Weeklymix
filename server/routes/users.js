const User = require("../models/User")
const router = require('express').Router()
const cloudinary = require('../utils/cloudinary')
const upload = require('../utils/multer')

//create&change a user's info
router.put("/:id", async(req, res)=>{
    //compares id of the request and the parameter so that a user could only update their own info
    if(req.body.userId === req.params.id||req.body.isAdmin){ 
        try{
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            })
           // console.log(req.body.isAdmin)
            res.status(200).json("Account has been successfully updated")
        } catch(err){
            res.status(500).json(err)
        }
    } else {
        return res.status(403).json("You don't have permission to update this account")
    }
})

router.post("/profilePicture", upload.single("profilePicture"), async(req,res)=>{
    try{
        const result = await cloudinary.uploader.upload(req.file.path, {resource_type:"image"})
        res.status(200).json(result)
    } catch (err) {
        res.status(500).json(err)
    }
})
router.post("/coverPicture", upload.single("coverPicture"), async(req,res)=>{
    try{
        const result = await cloudinary.uploader.upload(req.file.path, {resource_type:"image"})
        res.status(200).json(result)
    } catch (err) {
        res.status(500).json(err)
    }
})

//delete a user
router.post("/:id/delete", async(req, res)=>{
    //compares id of the request and the parameter so that a user could only update their own info
    if(req.body.userId === req.params.id||req.body.isAdmin){ 
        try{
            const user = await User.findByIdAndRemove(req.params.id)
           // console.log(req.body.isAdmin)
            res.status(200).json("Account has been successfully deleted")
        } catch(err){
            res.status(500).json(err)
        }
    } else {
        return res.status(403).json("You don't have permission to delete this account")
    }
})

//get a user
router.get('/:id', async (req, res)=>{
    try{
        const user = await User.findById(req.params.id)
        const{password,updatedAt, ...other} = user._doc
        res.status(200).json(other)
    } catch(err){
        res.status(500).json(err)
    }
})

//get a user by their username
router.get('/u/:username', async (req, res)=>{
    try{
        const user = await User.findOne({username:req.params.username})
        const{password,updatedAt, ...other} = user._doc
        res.status(200).json(other)
    } catch(err){
        res.status(500).json(err)
    }
}) 

//follow&unfollow a user

/*router.put("/:id/follow", async(req, res)=>{
    
    if(req.body.userId !== req.params.id){
        try{
            console.log("following time")
            const user = await User.findById(req.params.id) //the user that is going to be followed
            const currentUser = await User.findById(req.body.userId) //the user that wants to follow (make request)
            if(!user.followers.includes(req.body.userId)){
                
                await user.updateOne({ 
                    $push:{followers: req.body.userId}
                 })
                await currentUser.updateOne({ 
                    $push:{follows: req.params.id}
                 })
                res.status(200).json("User has been followed")
            } else {
                res.status(403).json("You already follow this member")
            }
        } catch (err){
            res.status(500).json(err)
        }
    } else {
        res.status(403).json("Don't follow yourself!")
    }
})
*/
router.put("/:id/follow", async(req, res)=>{
    
    if(req.body.userId !== req.params.id){
        try{
            console.log("following time")
            const user = await User.findById(req.params.id) //the user that is going to be followed
            const currentUser = await User.findById(req.body.userId) //the user that wants to follow (make request)
            if(!user.followers.includes(req.body.userId)){
                
                await user.updateOne({ 
                    $push:{followers: req.body.userId}
                 })
                await currentUser.updateOne({ 
                    $push:{follows: req.params.id}
                 })
                res.status(200).json("User has been followed")
            } else {
                await user.updateOne({ 
                    $pull:{followers: req.body.userId}
                 })
                await currentUser.updateOne({ 
                    $pull:{follows: req.params.id}
                 })
                res.status(200).json("User has been unfollowed")
            }
        } catch (err){
            res.status(500).json(err)
        }
    } else {
        res.status(403).json("Don't follow yourself!")
    }
})

router.put("/:id/unfollow", async(req, res)=>{
    
    if(req.body.userId !== req.params.id){
        try{
            const user = await User.findById(req.params.id) //the user that is going to be followed
            const currentUser = await User.findById(req.body.userId) //the user that wants to follow (make request)
            if(user.followers.includes(req.body.userId)){
                
                await user.updateOne({ 
                    $pull:{followers: req.body.userId}
                 })
                await currentUser.updateOne({ 
                    $pull:{follows: req.params.id}
                 })
                res.status(200).json("User has been unfollowed")
            } else {
                res.status(403).json("You don't follow this member")
            }
        } catch (err){
            res.status(500).json(err)
        }
    } else {
        res.status(403).json("Don't unfollow yourself!")
    }
})

router.get("/", async(req, res)=>{
    try{
        const allUsers = await User.find()
        res.status(200).json(allUsers)
    }catch(err){
        res.status(500).json(err)
    }
})

module.exports = router