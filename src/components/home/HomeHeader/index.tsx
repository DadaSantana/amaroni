import * as React from 'react';
//import reducers from redux
import { useAppSelector } from '../../../redux/hooks/useAppSelector';
import { setCurrent } from '../../../redux/reducers/appReducer';
import { useDispatch } from 'react-redux';
//import styles
import { Container } from 'react-bootstrap';
import { Aside, Content, Login, Main, Navbar, Perfil } from './styles';
import { Link } from "react-router-dom";

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import MenuIcon from '@mui/icons-material/Menu';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import LoginIcon from '@mui/icons-material/Login';
import { TextField } from '@mui/material';

import Logo from '../../../assets/media/logo.png';
import italia from '../../../assets/media/italia.png';
import unitedKingdom from '../../../assets/media/united-kingdom.png';
import german from '../../../assets/media/german.png';
import { Auth } from '../Auth';


type Props = {
    logged: boolean;
}

export const HomeHeader = ({logged}:Props) => {
    const system = useAppSelector(state => state.system);
    const dispatch = useDispatch();
    const [authWindown, setAuthWindown] = React.useState(false);
    const [floatNav,setFloatNav] = React.useState(false);

    const handleClick = () => {
        setAuthWindown(!authWindown);
    }

    const handleCurrentLang = (n: number) => {
        dispatch( setCurrent(n) );
    }

    const handleOpenFloatNav = () => {
        setFloatNav(!floatNav);
    }

    return(
        <Content>
            <Auth fn={handleClick} state={authWindown} /> 
            <Login>
                <Container> 
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
                    {system.login &&
                    <span className="btn-login">
                        <Link to="/dashboard">
                            <LoginIcon />
                            {system.language[system.current] == 'italian' ? 'Vai a Cruscotto' : null}
                            {system.language[system.current] == 'english' ? 'Go to Dashboard' : null}
                            {system.language[system.current] == 'german' ? 'Gehen Sie zum Dashboard' : null}
                        </Link>
                    </span>
                    }
                    {!system.login &&
                    <span className='btn-login' onClick={handleClick}>
                        <AccountCircleIcon />
                        {system.language[system.current] == 'italian' ? 'Login' : null}
                        {system.language[system.current] == 'english' ? 'Login' : null}
                        {system.language[system.current] == 'german' ? 'Einloggen' : null}
                    </span> 
                    }             
                   
                </Container>
            </Login>
            <Main>
                <Container>
                    <a className='Logo' href="/amaroni">
                        <img src={Logo} alt="" />
                        <span>
                            <label>Comune di</label>
                            <h3>Amaroni</h3>
                        </span>
                    </a>
                    <Navbar>                               
                        <ul>
                            <li>
                                <Link to='/storia'>
                                    {system.language[system.current] == 'italian' ? 'Storia' : null}
                                    {system.language[system.current] == 'english' ? 'History' : null}
                                    {system.language[system.current] == 'german' ? 'Geschichte' : null}
                                </Link>
                            </li>
                            <li>
                                <Link to='/gallery'>
                                    {system.language[system.current] == 'italian' ? 'Galleria Fotografica' : null}
                                    {system.language[system.current] == 'english' ? 'Photo Gallery' : null}
                                    {system.language[system.current] == 'german' ? 'Fotogallerie' : null}
                                </Link>                                
                            </li>
                            <li>
                                {system.language[system.current] == 'italian' ? 'Telefoni Importanti' : null}
                                {system.language[system.current] == 'english' ? 'Important Phones' : null}
                                {system.language[system.current] == 'german' ? 'Nützliche Kontakte' : null}
                            </li>
                        </ul>
                        <div className="social">
                            <FacebookIcon />
                            <InstagramIcon />
                        </div>                              
                    </Navbar>
                    <Aside>
                        <MenuIcon onClick={handleOpenFloatNav} />
                        <div className="float-nav" style={{transform: floatNav ? 'translateX(0vw)' : 'translateX(100vw)'}}>
                            <span onClick={handleOpenFloatNav}>
                                <KeyboardBackspaceIcon />
                                <label>
                                    {system.language[system.current] == 'italian' ? 'Torna alla pagina principale' : null}
                                    {system.language[system.current] == 'english' ? 'Back to the main page' : null}
                                    {system.language[system.current] == 'german' ? 'Zurück zur Hauptseite' : null}
                                </label>
                            </span>
                            <ul>
                                <li>
                                    <Link to='/storia'>
                                        {system.language[system.current] == 'italian' ? 'Storia' : null}
                                        {system.language[system.current] == 'english' ? 'History' : null}
                                        {system.language[system.current] == 'german' ? 'Geschichte' : null}
                                    </Link>
                                </li>
                                <li>
                                    <Link to='/gallery'>
                                        {system.language[system.current] == 'italian' ? 'Galleria Fotografica' : null}
                                        {system.language[system.current] == 'english' ? 'Photo Gallery' : null}
                                        {system.language[system.current] == 'german' ? 'Fotogallerie' : null}
                                    </Link>                                
                                </li>
                                <li>
                                    {system.language[system.current] == 'italian' ? 'Telefoni Importanti' : null}
                                    {system.language[system.current] == 'english' ? 'Important Phones' : null}
                                    {system.language[system.current] == 'german' ? 'Nützliche Kontakte' : null}
                                </li>
                            </ul>
                        </div>
                    </Aside>
                </Container>
            </Main>            
                       
        </Content>
                    
    );
}