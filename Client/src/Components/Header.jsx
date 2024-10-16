import React from 'react';
import "flowbite/dist/flowbite.min.css";
import {
    Avatar,
    Button,
    Dropdown,
    DropdownDivider,
    DropdownHeader,
    DropdownItem,
    Navbar,
} from "flowbite-react";
import {Link , useLocation , useNavigate} from "react-router-dom";
import {useSelector , useDispatch} from "react-redux";
import {signOutSuccess} from "../redux/Users/UsersSlice.js";
import {logout} from "../redux/Users/AuthSlice.js"

import axios from "axios";

const Header = () => {
    const path = useLocation().pathname;
    const navigate = useNavigate();

    const {currentUser} = useSelector(state => state.reducer.user);
    const dispatch = useDispatch();


    const signOutHandler = async ()=>{
        try{
            const res =  await axios.post('/auth/user/signout');
            const data =  res.data;
            console.log(data);
            if (!res){
                console.log(data.message);
            }else {
                dispatch(signOutSuccess());
                dispatch(logout());
                navigate('/login');
            }
        }catch (e) {
            console.log("error happening");

        }
    }



    return (
        <div>
         <Navbar className="border-b-2">
             <Link to="/" className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white">
                 <span className="px-3 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white"> Soft Mind</span>
                 Blog
             </Link>

             <div className="flex gap-2 md:order-2">                
                 {currentUser ? (
                        <Dropdown
                        arrowIcon={false}
                        inline

                        label={
                            <Avatar
                                alt="userProfile"
                                img={"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
                                rounded
                            />
                        }
                        >
                            <DropdownHeader>
                                <span className="block text-sm font-bold">{currentUser.rest.username}</span>
                            </DropdownHeader>

                            <Link to={'/dashboard?tab=profile'}>
                                <DropdownItem>
                                    Profile
                                </DropdownItem>
                            </Link>

                            <DropdownDivider/>

                            <DropdownItem onClick={signOutHandler}>
                                Sign Out
                            </DropdownItem>

                        </Dropdown>
                 ) : (
                     <Link to="/login">
                     <Button gradientDuoTone="purpleToPink"> Login</Button>
                     </Link>
                 )}

                 <Navbar.Toggle/>
             </div>

             <Navbar.Collapse className='w-auto'>

                 <Navbar.Link active={path === "/"} as={'div'}>
                     <Link to="/" className='text-black'>Home</Link>
                 </Navbar.Link>

             </Navbar.Collapse>
         </Navbar>
        </div>
    );
};

export default Header;