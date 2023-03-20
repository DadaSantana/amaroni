//import react
import * as React from 'react';
import { Link, useNavigate } from "react-router-dom";
//import Redux
import { useAppSelector } from '../../../redux/hooks/useAppSelector';
//import dispatch
import { useDispatch } from 'react-redux';
import { setLogin } from '../../../redux/reducers/appReducer';
import { setCurrent } from '../../../redux/reducers/appReducer';
//import styles
import { Content } from './styles';
import { Container } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
//import icons
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
//import images
import Logo from '../../../assets/media/logo.png';
import italia from '../../../assets/media/italia.png';
import unitedKingdom from '../../../assets/media/united-kingdom.png';
import german from '../../../assets/media/german.png';

import { SignOut } from '../../../services/auth';

export const HeaderDashboard = () => {
    const system = useAppSelector(state => state.system);
    const user = useAppSelector(state => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(setLogin(false));
        SignOut();
    }
    const handleCurrentLang = (n: number) => {
        dispatch( setCurrent(n) );
    }
    return(
        <Content>            
            <Container>
                <a className='Logo' href="/">
                    <img src={Logo} alt="" />
                </a>
                <Dropdown className="d-inline mx-2">
                    <Dropdown.Toggle className='btn-perfil' id="dropdown-autoclose-true">
                        <AccountCircleIcon />
                        <span>{user.name}</span>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item className='language-item' href="#">
                        <div className="select-lang">
                            <span onClick={()=>{handleCurrentLang(0)}}>
                                <img src={italia} alt="" />
                            </span>
                            <span onClick={()=>{handleCurrentLang(1)}}>
                                <img src={unitedKingdom} alt="" />
                            </span>
                            <span onClick={()=>{handleCurrentLang(2)}}>
                                <img src={german} alt="" />
                            </span>
                        </div>
                        </Dropdown.Item>
                        <Dropdown.Item href="#" onClick={()=>{navigate('/perfil')}}>
                            <SettingsIcon />
                            <label>
                                {system.language[system.current] === 'italian' ? 'Impostazioni' : null}
                                {system.language[system.current] === 'english' ? 'Settings' : null}
                                {system.language[system.current] === 'german' ? 'Einstellungen' : null}
                            </label>
                        </Dropdown.Item>
                        <Dropdown.Item href="#" onClick={handleLogout}>
                            <LogoutIcon />
                            <label>
                                {system.language[system.current] === 'italian' ? 'Disconnettersi' : null}
                                {system.language[system.current] === 'english' ? 'Logout' : null}
                                {system.language[system.current] === 'german' ? 'Ausloggen' : null}
                            </label>
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown> 
            </Container>                       
        </Content>                    
    );
}