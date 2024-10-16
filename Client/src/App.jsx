import {BrowserRouter , Routes , Route} from "react-router-dom";
import { useSelector } from 'react-redux';  
import SignUp from './Pages/SignUp'
import SignIn from "./Pages/SignIn";
import Header from "./Components/Header";
import SubHeader from "./Components/SubHeader";
import Dashboard from "./Pages/Dashboard";
import OnlyAdminPrivateRouter from "./Components/OnlyAdminPrivateRouter";
import CreatePost from "./Pages/CreatePost";
import PostPage from "./Pages/PostPage";
import UpdatePost from "./Pages/updatePost";
import Home from "./Pages/Home";

function App() {
  const isLoggedIn = useSelector((state) => state.reducer.auth.isLoggedIn);
  return (
    <BrowserRouter>
   {isLoggedIn ? <Header /> : <SubHeader/>} 
      <Routes>
      <Route path="/" element={<Home/>}></Route>
        <Route path="/register" element={<SignUp/>}></Route>
        <Route path="/login" element={<SignIn/>}></Route>
        <Route path="/dashboard" element={<Dashboard/>}></Route>
        <Route  element={<OnlyAdminPrivateRouter/>}>
          <Route path="/dashboard/create-post" element={<CreatePost/>}></Route>
          <Route path="/update-post/:postId" element={<UpdatePost/>}></Route>
        </Route>
        <Route path="/post/:postSlug" element={<PostPage/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
