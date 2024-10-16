import React, { useEffect, useState } from 'react';
import { Alert, Button, Select, TextInput } from "flowbite-react";
import ReactQuill from 'react-quill';
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { useFormik } from 'formik';
import { postValidationSchema } from '../schemasValidation';
import 'react-quill/dist/quill.snow.css';

const UpdatePost = () => {
    const { postId } = useParams();
    const { currentUser } = useSelector(state => state.reducer.user);
    const [publishError, setPublishError] = useState(null);
    const [publishSuccess, setPublishSuccess] = useState(null);
    const [loading, setLoading] = useState(true);
    const [existingImageUrl, setExistingImageUrl] = useState(null);
    const [newImage, setNewImage] = useState(null);

    const navigate = useNavigate();

    
    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await axios.get(`/auth/post/getpostsId?postId=${postId}`);
                if (res.status === 200) {
                    const post = res.data.post;
                    formik.setValues({
                        title: post.title,
                        category: post.category,
                        content: post.content,
                        postImage: null,
                    });
                    setExistingImageUrl(post.image);
                } else {
                    setPublishError('Failed to load post data');
                }
            } catch (error) {
                console.error(error);
                setPublishError('Error fetching post data');
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [postId]);

 
    const formik = useFormik({
        initialValues: {
            title: '',
            category: 'uncategorise',
            content: '',
            postImage: null,
        },
        postValidationSchema,
        onSubmit: async (values) => {
            try {
                const formDataToSend = new FormData();
                formDataToSend.append('title', values.title);
                formDataToSend.append('category', values.category);
                formDataToSend.append('content', values.content);

                if (newImage) {
                    formDataToSend.append('postImage', newImage);
                }

                const response = await axios.put(
                    `/auth/post/updatepost/${postId}/${currentUser.rest._id}`,
                    formDataToSend,
                    { headers: { 'Content-Type': 'multipart/form-data' }, withCredentials: true }
                );

                const data = response.data;
                console.log(data ,"--update post data");
                if (!data.success) {
                    setPublishError(data.message);
                    return;
                }

                setPublishSuccess('Post Updated Successfully!');
                navigate(`/post/${data.post.slug}`);
            } catch (error) {
                setPublishError(error.response?.data?.message || 'Error updating post');
            }
        }
    });

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setNewImage(file);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <h2>Loading post data...</h2>
            </div>
        );
    }
   
    return (
        <div className="p-3 max-w-3xl mx-auto min-h-screen">
            <h1 className="text-center my-7 font-semibold text-3xl">Update Post</h1>
            <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4 mb-12">
                <div className="flex flex-col gap-4 sm:flex-row justify-between">
                    <TextInput
                        type="text"
                        name="title"
                        placeholder="Title"
                        required
                        value={formik.values.title}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="flex-1"
                    />
                    {formik.touched.title && formik.errors.title && (
                        <div className="text-red-500">{formik.errors.title}</div>
                    )}

                    <Select
                        name="category"
                        value={formik.values.category}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    >
                        <option value="uncategorise">Select A Category</option>
                        <option value="JavaScript">JavaScript</option>
                        <option value="ReactJs">ReactJs</option>
                        <option value="WordPress">WordPress</option>
                        <option value="PHP">PHP</option>
                    </Select>
                    {formik.touched.category && formik.errors.category && (
                        <div className="text-red-500">{formik.errors.category}</div>
                    )}
                </div>

                <div className="flex gap-4 p-4 justify-between items-center border-4 border-teal-500 border-dotted rounded-xl mt-2">
                    {existingImageUrl && (
                        <img
                            src={`http://localhost:5000${existingImageUrl}`}
                            alt="Existing Post"
                            className="w-32 h-32 object-cover rounded-md"
                        />
                    )}
                    <input
                        type="file"
                        id="postImage"
                        onChange={handleImageChange}
                    />
                </div>

                <ReactQuill
                    value={formik.values.content}
                    onChange={(value) => formik.setFieldValue('content', value)}
                    onBlur={formik.handleBlur}
                    className="h-40 mb-12 dark:text-white"
                   
                />
                {formik.touched.content && formik.errors.content && (
                    <div className="text-red-500">{formik.errors.content}</div>
                )}

                <Button type="submit" gradientDuoTone="purpleToPink">
                    Update
                </Button>

                {publishError && (
                    <Alert className="mt-5" color="failure" onDismiss={() => setPublishError(null)}>
                        {publishError}
                    </Alert>
                )}

                {publishSuccess && (
                    <Alert className="mt-5" color="success" onDismiss={() => setPublishSuccess(null)}>
                        {publishSuccess}
                    </Alert>
                )}
            </form>
        </div>
    );
};

export default UpdatePost;
