const express = require('express');
const postRoute = express.Router();
const Postcontroller = require("../Controllers/Post.Controller.js")
const verifyToken = require('../utils/VerfiyUser.js');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});
const upload = multer({ storage });

postRoute.post('/create' , verifyToken , Postcontroller.createPost);
postRoute.get('/getposts', Postcontroller.getPosts );
postRoute.get('/getpostsId', Postcontroller.getPostById );
postRoute.get('/allposts', Postcontroller.getAllPosts);
postRoute.delete('/deletepost/:id/:userId' , verifyToken , Postcontroller.deletePost);
postRoute.put(
    '/updatepost/:postId/:userId',
    verifyToken,
    upload.single('postImage'),
    Postcontroller.updatepost
);
postRoute.get('/getpost/:slug',Postcontroller.getPostBySlug);


module.exports = postRoute;

