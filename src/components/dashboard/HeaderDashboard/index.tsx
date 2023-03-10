//import react
import * as React from 'react';
import { Link } from "react-router-dom";
//import Redux
import { useAppSelector } from '../../../redux/hooks/useAppSelector';
//import dispatch
import { useDispatch } from 'react-redux';
import { setLogin } from '../../../redux/reducers/appReducer';
//import styles
import { Content } from './styles';
import { Container } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
//import icons
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { TextField } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
//import images
import Logo from '../../../assets/media/logo.png';
import italia from '../../../assets/media/italia.png';
import unitedKingdom from '../../../assets/media/united-kingdom.png';

import { SignOut } from '../../../services/auth';

export const HeaderDashboard = () => {
    const user = useAppSelector(state => state.user);
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(setLogin(false));
        SignOut();
    }
    return(
        <Content>            
            <Container>
                <a className='Logo' href="/amaroni">
                    <img src={Logo} alt="" />
                </a>
                <Dropdown className="d-inline mx-2">
                    <Dropdown.Toggle className='btn-perfil' id="dropdown-autoclose-true">
                        <AccountCircleIcon />
                        <span>{user.name}</span>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item href="#" onClick={handleLogout}>logout</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown> 
            </Container>                       
        </Content>                    
    );
}