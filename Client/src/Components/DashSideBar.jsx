import React from 'react';
import {Sidebar, SidebarItem} from "flowbite-react";
import {HiArrowSmRight, HiUser} from "react-icons/hi";
import {Link, useSearchParams , useNavigate} from "react-router-dom";
import axios from "axios";
import {signOutSuccess} from "../redux/Users/UsersSlice.js"
import {useDispatch} from "react-redux";
import { HiDocumentDuplicate } from "react-icons/hi";
import {useSelector} from "react-redux";
import {FaUsers, FaMeetup, FaChartPie} from "react-icons/fa";

const DashSideBar = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const tab = searchParams.get('tab');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {currentUser} = useSelector(state => state.reducer.user);

    const signOutHandler = async ()=>{
        try{
            const res =  await  axios.post('/api/user/signout');
            const data =  res.data;
            console.log(data);
            if (!res){
                console.log(data.message);
            }else {
                dispatch(signOutSuccess());
            }
        }catch (e) {
            console.log("error happening");

        }
    }

    return (
        <Sidebar className="w-full">
            <Sidebar.Items>
              <Sidebar.ItemGroup>

                  {/* {
                      currentUser.rest.isAdmin && (
                          <Sidebar.Item
                              className="cursor-pointer"
                              active={tab === 'dashboard'}
                              icon={FaChartPie}
                              labelColor="dark"
                              onClick={() => navigate('/dashboard?tab=dashboard')}
                          >
                              Dashboard
                          </Sidebar.Item>
                      )
                  } */}
                      <Sidebar.Item
                          className="cursor-pointer"
                          active={tab === 'profile'}
                          icon={HiUser}
                          label={currentUser.rest.isAdmin ? "Admin" : "User"}
                          labelColor="light"
                          onClick={() => navigate('/dashboard?tab=profile')}
                      >
                          Profile
                      </Sidebar.Item>


                  {
                      currentUser.rest.isAdmin && (
                          <Sidebar.Item
                              className="cursor-pointer"
                              active={tab === 'posts'}
                              icon={HiDocumentDuplicate }
                              labelColor="dark"
                              onClick={() => navigate('/dashboard?tab=posts')}
                          >
                              Posts
                          </Sidebar.Item>
                      )
                  }

              </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    );
};

export default DashSideBar;