import { object, string , mixed} from 'yup';
import * as Yup from 'yup';

export const SignUpSchema = object({
    username: string()
    .min(2, "Username must be at least 2 characters")
    .max(12, "Username cannot exceed 12 characters")
    .required("Username is required"),
    password: string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/\d/, "Password must contain at least one number")
    .matches(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character"),
});
  

export const LoginSchema = object({
    username: string()
      .min(2, "Username must be at least 2 characters")
      .required("Username is required"),
    password: string().required("Password is required"),
  });


     
  export  const postValidationSchema = object({
    title: string().min(5, "Title must be at least 5 characters").required('Title is required'),
    category: string().notOneOf(['uncategorise'], 'Please select a category'),
    content: string().required('Content cannot be empty'),
    postImage: mixed().required('Please upload an image'),
});


export  const postupdate = object({
    title: string().required('Title is required'),
    category: string().required('Category is required'),
    content: string().required('Content is required'),
});