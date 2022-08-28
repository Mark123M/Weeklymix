const Post = require('../models/Post')
const router = require("express").Router()
const User = require('../models/User')

//create a post
router.post('/', async (req, res)=>{
    const newPost = new Post(req.body)
    try{
        const savedPost = await newPost.save()
        res.status(200).json(savedPost)
    } catch(err) {
        res.status(500).json(err)
    }
})
//edit a post
router.put('/:id', async (req, res)=>{
    try{
        const post = await Post.findById(req.params.id)
        if(post.userId === req.body.userId){ //check if the userId of the request equal to the userId of the post (if the post is theirs)
            //req.body.userId stroes WHO made the request
            await post.updateOne({$set:req.body})
            res.status(200).json("This post has been updated.")
        } else {
            res.status(403).json("You can't update this post")
        }
    } catch (err){
        res.status(500).json(err)
    }
   
})

//delete a post
router.post('/:id/delete', async (req, res)=>{
    try{
        const post = await Post.findById(req.params.id)
        await console.log(`THE ID OF THE USER IS ${req.body.userId}`)
        await console.log(`THE USERID OF POST IS ${post.userId}`)
        if(post.userId == req.body.userId){ //check if the userId of the request equal to the userId of the post (if the post is theirs)
            //req.body.userId stroes WHO made the request
            await post.deleteOne()
            res.status(200).json("This post has been deleted.")
        } else {
            res.status(403).json("You can't delete this post")
        }
    } catch (err){
        res.status(500).json(err)
    }
   
})
//like a post
/*router.put('/:id/like', async(req, res)=>{
    try{
        const post = await Post.findById(req.params.id)
        if(!post.likes.includes(req.body.userId)){
            await post.updateOne({$push:{likes:req.body.userId}})
            res.status(200).json("You have liked this post")
        } else {
            await post.updateOne({$pull:{likes:req.body.userId}}) //if the post has been liked, unlike it
            res.status(200).json("You have unliked this post")
        }
    } catch (err){
        res.status(500).json(err)
    }
}) */

router.put('/:id/like', async(req, res)=>{
    console.log(req.body.userId)
    try{
        const user = await User.findById(req.body.userId)
        
        const post = await Post.findById(req.params.id)
        if(!user.likedPosts.includes(req.params.id)){
            await user.updateOne({$push:{likedPosts:req.params.id}})
            await post.updateOne({$inc:{likes: 1}})
            res.status(200).json('You have liked this post')
        } else {
            await user.updateOne({$pull:{likedPosts:req.params.id}})
            await post.updateOne({$inc:{likes: -1}})
            res.status(200).json('You have unliked this post')
        }
    } catch (err){
        res.status(500).json(err)
    }
})

//get a post

router.get('/:id', async(req, res)=>{
    try{
        const post = await Post.findById(req.params.id)
        res.status(200).json(post)
    } catch(err){
        res.status(500).json(err)
    }
})
//get all posts
router.get('/', async(req, res)=>{
    try{
        const allPosts = await Post.find({}).limit(1000) //those who scroll past the last 1000 posts are insane
        res.status(200).json(allPosts)
    } catch (err){
        res.status(500).json(err)
    }
   // res.send("<h1>welcome to homepage</h1>")
})

router.get('/postId/:id/range/:count', async(req, res)=>{
    try{
        const query = await Post.find({ _id: {$lt: req.params.id} }).sort({ _id: -1 }).limit(req.params.count)
        res.status(200).json(query)
    } catch (err){
        res.status(500).json(err)
    }
})

router.get('/user/:username', async (req, res) =>{

    try{
        const user = await User.findOne({username:req.params.username})
        const posts = await Post.find({userId:user._id}).limit(1000)
        res.status(200).json(posts);
    } catch (err){
        res.status(500).json(err)
    }
})

module.exports = router;