const multer = require('multer');
const path = require('path');
const Post = require('../models/post.model.js');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage: storage });

const createPost = async (req, res) => {
    const { title, content, category, author } = req.body;

    if (!req.user.isAdmin) {
        return res.status(403).json({ message: 'You are not allowed to create a post' });
    }

    if (!title || !content) {
        return res.status(400).json({ message: 'Fill all required fields' });
    }

    const slug = title.split(' ').join('-').replace(/[^a-zA-Z0-9]/g, '-');
    const postImage = req.file ? `/uploads/${req.file.filename}` : undefined;

    const newPost = new Post({
        title,
        content,
        category,
        slug,
        userId: req.user.id,
        author,
        postImage,
    });

    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getPosts = async (req, res) => {
    try {
        const posts = await Post.find({ userId: req.query.userId }).sort({ updatedAt: -1 });
        res.status(200).json({ posts });
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Failed to fetch posts.' });
    }
};

const deletePost = async (req , res) =>{
    if (!req.user.isAdmin || req.user.id !== req.params.userId) {
        // return next(errorHandler("You're not allowed to delete the post"));
          return res.status(403).json("Youre not allowed to delete the post");

    }
    try {
        // console.log(req);
        const deletedPost = await Post.findByIdAndDelete(req.params.id);
        if (!deletedPost) {
            // return next(errorHandler("Post not found"));
          return res.status(404).json("Post not found");

        }
        res.status(200).json("Post has been deleted");
    } catch (e) {
        console.error(e);
        // next(e);
    }
}

const updatepost = async (req, res) => {
    try {
        if (!req.user.isAdmin && req.user.id !== req.params.userId) {
            return res.status(403).json("You're not allowed to update the post");
        }

        const { title, content, category } = req.body;

        const updatedFields = {
            title,
            content,
            category,
        };

        if (req.file) {
            updatedFields.postImage = `/uploads/${req.file.filename}`;
        }

        const updatedPost = await Post.findByIdAndUpdate(
            req.params.postId,
            { $set: updatedFields },
            { new: true }
        );

        if (!updatedPost) {
            return res.status(404).json({ message: 'Post not found' });
        }

        res.status(200).json({ success: true, post: updatedPost });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update post' });
    }
};

const getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.query.postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json({ post });
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Failed to fetch post.' });
    }
};
const getPostBySlug = async (req, res) => {
    try {
        const post = await Post.findOne({ slug: req.params.slug });
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json({ post });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch post.' });
    }
};
const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().sort({ updatedAt: -1 });
        res.status(200).json({ posts });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch posts.' });
    }
};

module.exports = {
    createPost: [upload.single('postImage'), createPost],
    getPosts,
    deletePost,
    updatepost,
    getPostById,
    getPostBySlug,
    getAllPosts
    
};
