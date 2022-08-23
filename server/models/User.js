const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required: true,
        min: 3,
        max: 25,
        unique: true
    },
    email:{
        type:String,
        required: true,
        unique: true
    },
    password:{
        type:String,
        required: true,
        min:7
    },
    profilePic:{
        type:String,
        default: ""
    },
    coverPic:{
        type:String,
        default: ""
    },
    followers:{
        type: Array,
        default: []
    },
    follows:{
        type: Array,
        default: []
    },
    isAdmin:{
        type: Boolean,
        default:false
    },
    description:{
        type: String,
        max:200
    },
    location:{
        type: String,
    },
    socialLinks:{
        type: Array,
        default:[]
    },
    likedPosts:{
        type: Array,
        default:[]
    },
    /*the following maybe be harder to implement
    competitionsEntered:{
        type: Number,
        default: 0
    },
    achievements:{ 
        type: String,
        default: ""
    }
    badges for competition wins or participation awards */
},
{timestamps:true}
)

module.exports = mongoose.model("User", userSchema)