import React from 'react';
import {useParams,useSearchParams } from "react-router-dom";
import DashSideBar from "../Components/DashSideBar"
import DashProfile from '../Components/DashProfile';
import DashPosts from '../Components/DashPosts';



const Dashboard = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const dashboardParam = searchParams.get('tab');

    return (
        <div className="min-h-screen flex flex-col md:flex-row">
        <div>
            <DashSideBar/>
        </div>

                {
                    dashboardParam === 'profile' && ( <DashProfile/>)
                }

                {
                    dashboardParam === 'posts' && (<DashPosts/>)
                }

                {/* 
                {
                    dashboardParam === 'users' && (<DashUsers/>)
                }
                {
                    dashboardParam === 'comments' && (<DashComments/>)
                }
                {
                    dashboardParam === 'dashboard' && (<DashComp/>)
                } */}

        </div>
    );
};

export default Dashboard;