const mongoose = require('mongoose');
const {models} = require("mongoose");


const postSchema = new mongoose.Schema ({

    userId :{
        type: String,
        require: true,
    },
    title:{
        type:String,
        unique:true,

        // require:true,
    },
    content:{
        type:String,
        require:true,
    },
    postImage:{
        type:String,
        default:"https://www.hostinger.com/tutorials/wp-content/uploads/sites/2/2021/09/how-to-write-a-blog-post-1536x674.webp",
    },
    category:{
        type:String,
    },
    slug:{
        type:String,
        require:true,
        unique:true
    },
    author: {
        type: String,
        required: true,
    },
} , {timestamps:true});


const Post =  mongoose.model('Post' , postSchema);
module.exports =  Post;