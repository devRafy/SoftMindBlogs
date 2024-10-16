import React from 'react';
import {useSelector} from "react-redux";
import {Outlet, Navigate  } from "react-router-dom";

const OnlyAdminPrivateRouter = () => {
    const {currentUser} = useSelector(state => state.reducer.user);
    return currentUser && currentUser.rest.isAdmin ? <Outlet></Outlet> :<Navigate to='/'/>;

};

export default OnlyAdminPrivateRouter;