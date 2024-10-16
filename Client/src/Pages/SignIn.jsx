import React, { useState } from "react";
import { useFormik } from "formik";
import { LoginSchema } from "../schemasValidation/index.jsx";
import { Link, useNavigate } from "react-router-dom";
import { Button, Label, TextInput ,Alert } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { signInSuccess, signInFail } from "../redux/Users/UsersSlice.js";
import { login } from "../redux/Users/AuthSlice.js";
import axios from "axios";
import "flowbite/dist/flowbite.min.css";

const SignIn = () => {
  const { error } = useSelector((state) => state.reducer.user);
  const { isLoggedIn } = useSelector((state) => state.reducer.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialValues = {
    username: "",
    password: "",
  };

  const { values, errors, touched, handleChange, handleSubmit } = useFormik({
    initialValues: initialValues,
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      if (!values.username || !values.password) {
        return dispatch(signInFail("Please Fill All The Fields Properly!!"));
      }
      try {
        const response = await axios.post("/auth/user/login", values,  {
            withCredentials: true, 
          });
        const data = response.data;
        if (data && data.rest) {
          dispatch(signInSuccess(data));
          dispatch(login());
          navigate("/");
        } else {
          dispatch(signInFail(data.message));
        }
      } catch (error) {
        let errorMessage = "An unexpected error occurred";
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          errorMessage = error.response.data.message;
        } else if (error.request) {
          errorMessage = "No response from server";
        } else {
          errorMessage = "Error: " + error.message;
        }

        dispatch(signInFail(errorMessage));
      }
    },
  });

  return (
    <div className="mt-20">
      <div className="flex  gap-12 max-w-3xl p-3 mx-auto flex-col md:flex-row md:items-center">
        <div className="left_col flex-1">
          <Link
            to="/"
            className="self-center text-4xl font-bold dark:text-white"
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
              Login  User
            </span>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                 {error && (
                    <Alert className="mt-5" color="failure" onDismiss={() => dispatch(signInFail(''))}>
                        {error}
                    </Alert>
                )}
            
            <div>
              <Label value="Your UserName" />
              {errors.username && touched.username ? (
                <p className="error text-red-600">{errors.username}</p>
              ) : (
                ""
              )}
              <TextInput
                type="text"
                placeholder="UserName"
                id="username"
                name="username"
                onChange={handleChange}
                value={values.username}
              ></TextInput>
            </div>

            <div>
              <Label value="Your Password" />
              {errors.password && touched.password ? (
                <p className="error text-red-600">{errors.password}</p>
              ) : (
                ""
              )}
              <TextInput
                type="password"
                placeholder="Password"
                id="password"
                name="password"
                onChange={handleChange}
                value={values.password}
              ></TextInput>
            </div>
            <Button type="submit" gradientDuoTone="purpleToPink">
              Login
            </Button>
          </form>
          <div className="mt-3 flex gap-2">
            <span>Don't have an account?</span>
            <Link to="/register" className="text-blue-500 font-bold">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
