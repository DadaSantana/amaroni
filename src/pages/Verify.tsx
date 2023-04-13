//import React
import * as React from 'react';
//import reducers
import { useAppSelector } from '../redux/hooks/useAppSelector';
//import components
import { HeaderDashboard } from "../components/dashboard/HeaderDashboard";
import { MainDashboard } from "../components/dashboard/MainDashboard";
import { useNavigate } from "react-router-dom";

import { monitorAuthState } from '../services/auth';
import { EmailVerify } from '../components/verify';


export const Verify = () => {
    const system = useAppSelector(state => state.system);
    const usuario = useAppSelector(state=>state.user);
    const navigate = useNavigate();
    const [count,setCount] = React.useState(0);

    setInterval(()=>{
        setCount(count+1);
    },10000)



    React.useEffect(()=>{
        if (system.login === false) {
            navigate('/');
        } 
    }, [system.login]);
    return(
        

        <div id="app">
            {system.login && 
            <>
            <HeaderDashboard />
            <EmailVerify key={count} />
            </>
            }
        </div>
    );
}
