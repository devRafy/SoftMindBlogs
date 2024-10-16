import React from 'react';
import {Link} from 'react-router-dom';
const PostCard = ({post}) => {

    console.log(post);

    return (
        <div className="post-card  w-full border border-gray-200 rounded-lg overflow-hidden ">
            <Link to={`/post/${post.slug}`}>
                <img 
                src={`http://localhost:5000${post.postImage}`}
                 className="h-[260px] w-full object-cover rounded-lg bg-gray-500] hover:h-[200px] transition-all duration-300 "/>
            </Link>
            <div className="p-3 flex flex-col gap-4 group relative">
                <div className='flex flex-row justify-between'>
                    <p className="text-lg font-semibold">{post.title}</p>

                    <span className='text-gray-500 text-sm'> {new Date(post.createdAt).toLocaleDateString()} </span>
                    
                </div>
               
                <div className='flex flex-row justify-between '>
                    <span className="italic text-sm">{post.category}</span>
                    <span className="italic text-sm">{post.author}</span>
                </div>
                
                <Link to={`/post/${post.slug}`} className=" left-0 right-0 border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white transition-all duration-300 rounded-lg py-3 text-center">Read Article</Link>
            </div>
        </div>
    );
};

export default PostCard;