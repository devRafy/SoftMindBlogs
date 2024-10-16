import React from "react";
import { useFormik } from 'formik';
import "flowbite/dist/flowbite.min.css";
import axios from "axios";
import { SignUpSchema } from "../schemasValidation/index.jsx";
import {signupSuccess , signupFail}  from "../redux/Users/UsersSlice.js"
import {Link, useNavigate } from "react-router-dom";
import { Button , Label, TextInput,Alert } from "flowbite-react";
import {useDispatch , useSelector   } from "react-redux";

const SignUp = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {error} = useSelector(state => state.reducer.user);

  const initialValues =  {
    username: '',
    password: '',
  };

  const {values, errors, touched ,handleChange, handleSubmit, handleBlur} = useFormik({
    initialValues: initialValues, 
    validationSchema: SignUpSchema,
    onSubmit: async (values, action) => {
      try {
        const response = await axios.post('/auth/user/register', values);
        if (response.status === 200) {
          dispatch(signupSuccess(response.data));
          navigate('/login');
        }
      } catch (error) {
        console.error("Signup error:", error);
        dispatch(signupFail(error.response?.data?.message || "Signup failed"));
      }
      action.resetForm();
    },
  });
 
  return (
    <div className="mt-20">
      <div className="flex gap-12 max-w-3xl p-3 mx-auto flex-col md:flex-row md:items-center">

        <div className="left_col flex-1">
          <Link
            to="/"
            className="self-center text-4xl font-bold"
          >
            <span className="px-3 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
              Soft Mind
            </span>
            Blog
          </Link>
        </div>

        <div className="right_col flex-1">
             <div className="mb-5 text-4xl font-bold ">
              <span className=" px-3 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
              Register User
              </span>
             </div>
        
            <form  className="flex flex-col gap-4" onSubmit={handleSubmit}>    

                 {error && (
                    <Alert className="mt-5" color="failure" onDismiss={() => dispatch(signupFail(''))}>
                        {error}
                    </Alert>
                 )}      
                 <div>
                    <Label value="Your UserName"/>
                    {errors.username && touched.username ? <p className="error text-red-600">{errors.username}</p> : ''}
                    <TextInput type="text" placeholder="UserName" id="username" name="username" onChange={handleChange} value={values.username}></TextInput>
                </div>

                <div>
                    <Label value="Your Password"/>
                    {errors.password && touched.password ? <p className="error text-red-600">{errors.password}</p> : ''}

                    <TextInput type="password" placeholder="Password" id="password" name="password" onChange={handleChange} value={values.password}></TextInput>
                </div>

                <Button type="submit" gradientDuoTone="purpleToPink" >Sign Up</Button>
                
            </form>
            <div className="mt-3 flex gap-2">
                <span>Have an account?</span>
                <Link to="/login" className="text-blue-500 font-bold">
                 Sign In
                </Link>
            </div>
        </div>

      </div>
    </div>
  );
};

export default SignUp;
