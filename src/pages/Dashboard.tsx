//import React
import * as React from 'react';
//import reducers
import { useAppSelector } from '../redux/hooks/useAppSelector';
//import components
import { HeaderDashboard } from "../components/dashboard/HeaderDashboard";
import { MainDashboard } from "../components/dashboard/MainDashboard";
import { useNavigate } from "react-router-dom";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
//import serices
import { monitorAuthState } from '../services/auth';
//import types
import { UserFirebase } from '../types/Users';

export const Dashboard = () => {
    const system = useAppSelector(state => state.system);
    const user = useAppSelector(state => state.user);
    const navigate = useNavigate();
    const [userFirebase,setUserFirebase] = React.useState<UserFirebase[]>();
    
/*     React.useEffect(()=>{
        if (system.login === false) {
            navigate('/');
        } else if (!user.verified) {
            navigate('/verify');
        }
    }, []); */

    return(
        <div id="app">
            {system.login && 
            <>
            <HeaderDashboard />
            <MainDashboard />
            </>
            }
        </div>
    );
}
