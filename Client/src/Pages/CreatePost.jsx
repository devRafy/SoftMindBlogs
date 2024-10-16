import React, { useState } from 'react';
import { Alert, Button, Select, TextInput } from "flowbite-react";
import {postValidationSchema} from "../schemasValidation/index"
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useFormik } from 'formik'; 
import axios from "axios";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const CreatePost = () => {
    
    const { currentUser } = useSelector(state => state.reducer.user);
    const [publishError, setPublishError] = useState(null);
    const [publishSuccess, setPublishSuccess] = useState(null);
    const navigate = useNavigate();

    const { values, errors, touched, handleChange, handleSubmit, handleBlur, setFieldValue } = useFormik({
        initialValues: {
            title: '',
            category: 'uncategorise',
            content: '',
            postImage: null,
        },
        validationSchema: postValidationSchema,
        onSubmit: async (values ,  action) => {

                
            const formDataToSend = new FormData();
            formDataToSend.append('title', values.title);
            formDataToSend.append('category', values.category);
            formDataToSend.append('content', values.content);
            formDataToSend.append('author', currentUser.rest.username);
            if (values.postImage) formDataToSend.append('postImage', values.postImage);

            try {
                const response = await axios.post('/auth/post/create', formDataToSend, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                    withCredentials: true,
                });

                const data = response.data;
                console.log(data , "---post data");
                setPublishSuccess('Post Published!!');
                setPublishError(null);
                navigate(`/post/${data.slug}`);
                 action.resetForm();
                if (!data.success) {
                    setPublishError(data.message);
                    return;
                }
              
             
            } catch (e) {
                setPublishError(e.response?.data?.message || 'Error publishing post');
            }
        },
    });

    return (
        <div className="p-3 max-w-3xl mx-auto min-h-screen">
            <h1 className="text-center my-7 font-semibold text-3xl">Create Post</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-12">
                <div className="flex flex-col gap-4 sm:flex-row justify-between">
                    <TextInput
                        type="text"
                        placeholder="Title"
                        id="title"
                        className="flex-1"
                        value={values.title}
                        onChange={handleChange}                    
                    />
                    {touched.title && errors.title && (
                        <div className="text-red-500">{errors.title}</div>
                    )}

                    <Select
                        id="category"
                        value={values.category}
                        onChange={handleChange}
                    >
                        <option value="uncategorise">Select A Category</option>
                        <option value="JavaScript">JavaScript</option>
                        <option value="ReactJs">ReactJs</option>
                        <option value="WordPress">WordPress</option>
                        <option value="PHP">PHP</option>
                    </Select>
                    { touched.category && errors.category && (
                        <div className="text-red-500">{errors.category}</div>
                    )}
                </div>

                <div className="flex gap-4 p-4 justify-between items-center border-4 border-teal-500 border-dotted rounded-xl mt-2">
                    <input
                        type="file"
                        id="postImage"
                        onChange={(e) =>setFieldValue('postImage', e.target.files[0])}
                        onBlur={handleBlur}
                    />
                    { touched.postImage &&  errors.postImage && (
                        <div className="text-red-500">{errors.postImage}</div>
                    )}
                </div>

                <ReactQuill
                    theme="snow"
                    value={values.content}
                   
                    onChange={(value) =>setFieldValue('content', value)}
                    className="h-40 mb-12 dark:text-white"
                />
                {touched.content && errors.content && (
                    <div className="text-red-500">{errors.content}</div>
                )}

                <Button type="submit" gradientDuoTone="purpleToPink">Publish</Button>

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

export default CreatePost;
