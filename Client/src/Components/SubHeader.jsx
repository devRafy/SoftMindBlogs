import React from 'react'
import {
    Button,
    Navbar,
} from "flowbite-react";
import {Link , useLocation , useNavigate} from "react-router-dom";

const SubHeader = () => {
  return (
    <div>
       <Navbar className="border-b-2">
             <Link to="/" className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white">
                 <span className="px-3 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white"> Soft Mind</span>
                 Blog
             </Link>

             <div className="flex gap-2 md:order-2">                
               
                     <Link to="/login">
                     <Button gradientDuoTone="purpleToPink"> Login</Button>
                     </Link>

                 <Navbar.Toggle/>
             </div>

    
         </Navbar>
    </div>
  )
}

export default SubHeader
