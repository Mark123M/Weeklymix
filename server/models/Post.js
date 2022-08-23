const mongoose = require("mongoose")

//have multiple channels like "announcements", "discussion and feedback", (must post audio), and "submission/vote"
const postSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    postType:{
        type:String,
        required:true
    },
    title: {
        type: String,
        max: 100,
	    required: true
    },
    description:{
        type:String,
        max:5000,
    },
    image:{
        type:String,
        default:null
    },
    audio:{
        type:String,
    },
    likes:{
        type:Number,
        default:0
    },
    comments:{
        type:Array,
        default:[]
    }
},
{timestamps:true}
)

module.exports = mongoose.model("Post", postSchema)