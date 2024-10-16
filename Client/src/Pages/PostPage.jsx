import React, { useEffect, useState } from 'react';
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Spinner, Button } from "flowbite-react";
import PostCard from "../Components/PostCard";

const PostPage = () => {
    const { postSlug } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [post, setPost] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`/auth/post/getpost/${postSlug}`);

                if (res.status === 200) {
                    setPost(res.data.post);
                    setError(false);
                } else {
                    setError(true);
                    console.log("No post found");
                }
            } catch (error) {
                setError(true);
                console.error("Error fetching post:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [postSlug]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Spinner size="lg" />
            </div>
        );
    }

    if (error || !post) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <h1 className="text-2xl">Post not found</h1>
            </div>
        );
    }

  
    return (
        <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
            <h1 className="text-3xl mt-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl">
                {post.title}
            </h1>
                <div className='cate-auther flex flex-row justify-center gap-9'>
                <Button className="mt-4" size="xs" gradientDuoTone="purpleToPink">{post.category}</Button>
                <Button className="mt-4" size="xs" gradientDuoTone="purpleToPink">{post.author}</Button>
                    
                </div>
            <img
                src={`http://localhost:5000${post.postImage}`}
                alt="Post"
                className="self-center w-full h-[300px] mt-10 p-3 object-cover rounded-2xl"
            />

            <div className="flex justify-between p-3 border-b border-slate-500">
                <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                <span>{(post.content.length / 1000).toFixed(0)} mins to read</span>
            </div>

            <div
                dangerouslySetInnerHTML={{ __html: post.content }}
                className="post__content p-3 mx-auto w-full"
                style={{ wordBreak: 'break-word' }}
            />

        </main>
    );
};

export default PostPage;
