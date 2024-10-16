import React, {useEffect, useRef, useState} from 'react';
import {useSelector} from "react-redux";
import {Alert, Button, Modal, ModalBody, TextInput} from "flowbite-react";
import {useDispatch} from "react-redux";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import { logout } from '../redux/Users/AuthSlice';

const DashProfile = () => {
    const {currentUser} = useSelector(state => state.reducer.user);
    const {error} = useSelector(state => state.reducer.user);
    const dispatch =  useDispatch();
    const navigate = useNavigate();

  
    const signOutHandler = async ()=>{
        try{
            const res =  await axios.post('/auth/user/signout');
            const data =  res.data;
            console.log(data);
            if (!res){
                console.log(data.message);
            }else {
                dispatch(logout());
                navigate('/login');
                
                dispatch(signOutSuccess());
            }
        }catch (e) {
            console.log("error happening");

        }
    }



    return (
        <div className="Profile-dashboard max-w-lg mx-auto w-full mb-10 flex flex-col justify-center">
        
            {currentUser.rest.username && (
                <h1 className='text-3xl text-center font-bold mb-3'>
                     {currentUser.rest.username}
                </h1>  
             )}
                {
                    currentUser.rest.isAdmin && (

                        <Link to={'create-post'}>
                            <Button
                                type="button"
                            gradientDuoTone="purpleToPink"

                                className="w-full"
                            >
                                Create a post
                            </Button>
                        </Link>
                    )
                }
                <div className="flex justify-between mt-5">
                <Link to="/" className='w-full'>
                     <Button className='w-full' gradientDuoTone="purpleToPink"> Read Posts</Button>
                </Link>
                
                </div>
            
        </div>
    );
};

export default DashProfile;