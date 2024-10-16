import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Spinner } from 'flowbite-react';
import PostCard from '../Components/PostCard';

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    useEffect(() => {
        const fetchAllPosts = async () => {
            try {
                const res = await axios.get('/auth/post/allposts');
                if (res.status === 200) {
                    setPosts(res.data.posts);
                } else {
                    setError(true);
                }
            } catch (error) {
                console.error('Error fetching posts:', error);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchAllPosts();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Spinner size="lg" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <h2 className="text-2xl">Failed to load posts. Please try again later.</h2>
            </div>
        );
    }

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {posts.map((post) => (
                    <PostCard key={post._id} post={post} />
                ))}
            </div>
        </div>
    );
};

export default Home;
