import * as React from 'react';
//import reducers from redux
import { useAppSelector } from '../../../redux/hooks/useAppSelector';
import { setCurrent } from '../../../redux/reducers/appReducer';
import { useDispatch } from 'react-redux';
//import styles
import { Container, Dropdown } from 'react-bootstrap';
import { Aside, Content, Login, Main, Navbar, Perfil } from './styles';
import { Link } from "react-router-dom";

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import MenuIcon from '@mui/icons-material/Menu';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import LoginIcon from '@mui/icons-material/Login';
import { TextField } from '@mui/material';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import CollectionsIcon from '@mui/icons-material/Collections';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import Diversity3Icon from '@mui/icons-material/Diversity3';

import Logo from '../../../assets/media/logo.png';
import italia from '../../../assets/media/italia.png';
import unitedKingdom from '../../../assets/media/united-kingdom.png';
import german from '../../../assets/media/german.png';
import { Auth } from '../Auth';
import userEvent from '@testing-library/user-event';
import { getAllCount } from '../../../services/news';
import 'animate.css';
import { motion } from 'framer-motion';


type Props = {
    logged: boolean;
}

export const HomeHeader = ({logged}:Props) => {
    const system = useAppSelector(state => state.system);
    const user = useAppSelector(state => state.user);
    const [newsCount,setNewsCount] = React.useState(0);
    const dispatch = useDispatch();
    const [authWindown, setAuthWindown] = React.useState(false);
    const [floatNav,setFloatNav] = React.useState(false);

    React.useEffect(()=>{
        const getNewsCount = async () => {
            setNewsCount(await getAllCount());
        }
        getNewsCount();
    })

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
        <Content className='home-header'>
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
                        <Link to={
                            user.level.admin ? '/dashboard/events' :
                            user.level.member ? '/dashboard/attractions' : '/dashboard/support'
                        }>
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
                    <a className='Logo' href="/">
                        <img src={Logo} alt="" />
                        <span>
                            <label>Comune di</label>
                            <h3>Amaroni</h3>
                        </span>
                    </a>
                    <Navbar>                               
                        <ul>
                            <motion.li
                                whileHover={{ translateY: -3, transition: { duration: 0.05 } }}
                            >
                                <Link to='/storia'>
                                    {system.language[system.current] == 'italian' ? 'Storia' : null}
                                    {system.language[system.current] == 'english' ? 'History' : null}
                                    {system.language[system.current] == 'german' ? 'Geschichte' : null}
                                </Link>
                            </motion.li>
                            <motion.li
                                whileHover={{ translateY: -3, transition: { duration: 0.05 } }}
                            >
                                <Link to='/gallery'>
                                    {system.language[system.current] == 'italian' ? 'Galleria Fotografica' : null}
                                    {system.language[system.current] == 'english' ? 'Photo Gallery' : null}
                                    {system.language[system.current] == 'german' ? 'Fotogallerie' : null}
                                </Link>                                
                            </motion.li>
                            <motion.li
                                whileHover={{ translateY: -3, transition: { duration: 0.05 } }}
                            >
                                <Link to='/palazzo'>
                                    {system.language[system.current] == 'italian' ? 'Palazzo Comunale' : null}
                                    {system.language[system.current] == 'english' ? 'Palazzo Comunale' : null}
                                    {system.language[system.current] == 'german' ? 'Palazzo Comunale' : null}
                                </Link>                                
                            </motion.li>
                            <motion.li
                                whileHover={{ translateY: -3, transition: { duration: 0.05 } }}
                            >
                                <Link to='/gemellaggio/rotkreuz'>
                                    {system.language[system.current] == 'italian' ? 'Gemellaggio di Risch-Rotkreuz' : null}
                                    {system.language[system.current] == 'english' ? 'Gemellaggio di Risch-Rotkreuz' : null}
                                    {system.language[system.current] == 'german' ? 'Gemellaggio di Risch-Rotkreuz' : null}
                                </Link>   
                            </motion.li>
                        </ul>
                        <div className="social">                              
                            <Link to="/palazzo" className="news-after">
                                <NewReleasesIcon />
                                <span className="badge">{newsCount == 0 ? '' : newsCount}</span>
                            </Link>                            
                            <a href="https://www.facebook.com/comunediamaroni" target="_blank">
                                <FacebookIcon />
                            </a>                            
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
                                    <AutoStoriesIcon />
                                    <Link to='/storia'>
                                        {system.language[system.current] == 'italian' ? 'Storia' : null}
                                        {system.language[system.current] == 'english' ? 'History' : null}
                                        {system.language[system.current] == 'german' ? 'Geschichte' : null}
                                    </Link>
                                </li>
                                <li>
                                    <CollectionsIcon />
                                    <Link to='/gallery'>
                                        {system.language[system.current] == 'italian' ? 'Galleria Fotografica' : null}
                                        {system.language[system.current] == 'english' ? 'Photo Gallery' : null}
                                        {system.language[system.current] == 'german' ? 'Fotogallerie' : null}
                                    </Link>                                
                                </li>
                                <li>
                                    <LocationCityIcon />
                                    <Link to='/palazzo'>
                                        {system.language[system.current] == 'italian' ? 'Palazzo Comunale' : null}
                                        {system.language[system.current] == 'english' ? 'Palazzo Comunale' : null}
                                        {system.language[system.current] == 'german' ? 'Palazzo Comunale' : null}
                                    </Link>                                
                                </li>
                                <li>
                                    <Diversity3Icon />
                                    <Link to='/gemellaggio/rotkreuz'>
                                        {system.language[system.current] == 'italian' ? 'Gemellaggio di Risch-Rotkreuz' : null}
                                        {system.language[system.current] == 'english' ? 'Gemellaggio di Risch-Rotkreuz' : null}
                                        {system.language[system.current] == 'german' ? 'Gemellaggio di Risch-Rotkreuz' : null}
                                    </Link>   
                                </li>
                            </ul>
                        </div>
                    </Aside>
                </Container>
            </Main>            
                       
        </Content>
                    
    );
}