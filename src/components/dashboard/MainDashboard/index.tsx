//import react
import * as React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
//import reducers from redux
import { useAppSelector } from '../../../redux/hooks/useAppSelector';
//import services
import * as SupportService from '../../../services/support';
//import styles
import * as Dash from './styles';
import { Container } from 'react-bootstrap';
//import icons
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import AttractionsIcon from '@mui/icons-material/Attractions';
import CollectionsIcon from '@mui/icons-material/Collections';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import DescriptionIcon from '@mui/icons-material/Description';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
//import components
import { Events } from '../Events';
import { Attractions } from '../Attractions';
import { Gallery } from '../Gallery';
import { Support } from '../Support';
import { Users } from '../Users';
import { Palazio } from '../Palazio';
import { Gemmellagi } from '../Gemmellagi';
import { Notifications } from '../Notifications';
import { useDispatch } from 'react-redux';
import { SignOut } from '../../../services/auth';
import { setLogin, setSession } from '../../../redux/reducers/appReducer';
import { Alert } from '../../alert';

export const MainDashboard = () => {
    const user = useAppSelector(state => state.user);
    const system = useAppSelector(state => state.system);
    const navigate = useNavigate();
    const { element } = useParams();
    const [openCalls,setOpenCalls] = React.useState(false);
    const [count,setCount] = React.useState(0);
    const dispatch = useDispatch();
    const [showAlert,setShowAlert] = React.useState(false);
    const [variant,setVariant] = React.useState('');
    const [message,setMessage] = React.useState('');
    const [open, setOpen] = React.useState(false);
    
    React.useEffect(()=>{
        const getOpenCalls = async () => {
            setCount(await SupportService.getOpenCallsCount());       
        }
        getOpenCalls();
    },[])
    React.useEffect(()=>{
        if (count > 0) {
            setOpenCalls(true);
        }
    },[count])
    React.useEffect(()=>{
        const now = Date.now();
        if (system.session <= now) {
            setOpen(true);
            setVariant('danger');
            if (system.language[system.current] === 'italian') {
                setMessage('Sessione scaduta. Accedi di nuovo.');
            } else if (system.language[system.current] === 'english') {
                setMessage('Session expired. Log in again.');
            } else if (system.language[system.current] === 'german') {
                setMessage('Sitzung abgelaufen. Nochmal anmelden.');
            }                
            setShowAlert(true);
            setTimeout(()=>{
              setShowAlert(false);
            },6000);
            setTimeout(()=>{
                SignOut();
                dispatch(setLogin(false));
                navigate('/');
            },10000);            
        } else if (system.session > now && system.session <= (now + 1000000)) {
            const updateTime = Date.now() + 1000000;
            dispatch(setSession(updateTime));
        } else {
            dispatch(setSession(4133905200000));
        }
    },[element])

    return(
        <Dash.Content>
            <Dash.Navbar>
                <Container>
                    {showAlert &&
                        Alert(variant,message)
                    }
                    <Backdrop
                        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                        open={open}
                    >
                    <CircularProgress color="inherit" /> 
                    </Backdrop>
                    <div className="group-menu">
                        {user.level.admin &&
                        <ul>
                            <li 
                                className={element === 'events' ? 'menu-item active' : 'menu-item'}
                            >
                                <Link to='/dashboard/events'>
                                    <NewspaperIcon />
                                    <label>
                                        {system.language[system.current] == 'italian' ? 'Eventi' : null}
                                        {system.language[system.current] == 'english' ? 'Announcement' : null}
                                        {system.language[system.current] == 'german' ? 'Bekanntmachung' : null}
                                    </label>
                                </Link>
                            </li>
                            <li 
                                className={element === 'attractions' ? 'menu-item active' : 'menu-item'}
                            >
                                <Link to='/dashboard/attractions'>
                                    <AttractionsIcon />
                                    <label>
                                        {system.language[system.current] == 'italian' ? 'Il Borgo' : null}
                                        {system.language[system.current] == 'english' ? 'Attractions' : null}
                                        {system.language[system.current] == 'german' ? 'Sehenswürdigkeiten' : null}
                                    </label>                                    
                                </Link>
                            </li>
                            <li 
                            className={element === 'gallery' ? 'menu-item active' : 'menu-item'}
                            >
                                <Link to='/dashboard/gallery'>
                                    <CollectionsIcon />
                                    <label>
                                        {system.language[system.current] == 'italian' ? 'Galleria' : null}
                                        {system.language[system.current] == 'english' ? 'Photo Gallery' : null}
                                        {system.language[system.current] == 'german' ? 'Fotogallerie' : null}
                                    </label>                                    
                                </Link>                                
                            </li>
                            <li 
                            className={element === 'pages' ? 'menu-item pages active' : 'menu-item pages'}
                            >
                                <Link to='#'>
                                    <DescriptionIcon />
                                    <label>
                                        {system.language[system.current] == 'italian' ? 'Pagine' : null}
                                        {system.language[system.current] == 'english' ? 'Pages' : null}
                                        {system.language[system.current] == 'german' ? 'Seiten' : null}
                                    </label>                                    
                                </Link>
                                <span className='toggle-pages'>
                                    <Link to='/dashboard/pages/palazzo'>Palazzo Comunale</Link>
                                    <Link to='/dashboard/pages/rotkreuz'>Gemellaggio di Risch-Rotkreuz</Link>
                                </span>                                
                            </li>
                            <li className={element === 'support' ? 'menu-item active' : 'menu-item'}>
                                <Link to='/dashboard/support'>
                                    <SupportAgentIcon />
                                    {openCalls &&
                                        <span className='open-calls'>{count}</span>
                                    }
                                    
                                    <label>
                                        {system.language[system.current] == 'italian' ? 'Supporto' : null}
                                        {system.language[system.current] == 'english' ? 'Support' : null}
                                        {system.language[system.current] == 'german' ? 'Unterstützung' : null}
                                    </label>                                    
                                </Link> 
                            </li>
                            <li className={element === 'users' ? 'menu-item active' : 'menu-item'}>
                                <Link to='/dashboard/users'>
                                    <ManageAccountsIcon />
                                    <label>
                                        {system.language[system.current] == 'italian' ? 'Utenti' : null}
                                        {system.language[system.current] == 'english' ? 'Users' : null}
                                        {system.language[system.current] == 'german' ? 'Benutzer' : null}
                                    </label>
                                </Link> 
                            </li>
                            <li className={element === 'notifications' ? 'menu-item active' : 'menu-item'}>
                                <Link to='/dashboard/notifications'>
                                    <CircleNotificationsIcon />
                                    <label>
                                        {system.language[system.current] == 'italian' ? 'Notifiche' : null}
                                        {system.language[system.current] == 'english' ? 'Notifications' : null}
                                        {system.language[system.current] == 'german' ? 'Benachrichtigungen' : null}
                                    </label>
                                </Link> 
                            </li>
                        </ul>
                        }
                        {user.level.member &&
                        <ul>
                            <li 
                                className={element === 'attractions' ? 'menu-item active' : 'menu-item'}
                            >
                                <Link to='/dashboard/attractions'>
                                    <AttractionsIcon />
                                    <label>
                                        {system.language[system.current] == 'italian' ? 'Il Borgo' : null}
                                        {system.language[system.current] == 'english' ? 'Attractions' : null}
                                        {system.language[system.current] == 'german' ? 'Sehenswürdigkeiten' : null}
                                    </label>
                                </Link>
                            </li>
                            <li className={element === 'support' ? 'menu-item active' : 'menu-item'}>
                                <Link to='/dashboard/support'>
                                    <SupportAgentIcon />
                                    <label>
                                        {system.language[system.current] == 'italian' ? 'Supporto' : null}
                                        {system.language[system.current] == 'english' ? 'Support' : null}
                                        {system.language[system.current] == 'german' ? 'Unterstützung' : null}
                                    </label>
                                </Link> 
                            </li>
                        </ul>
                        }
                        {user.level.guest &&
                        <ul>
                            <li className={element === 'support' ? 'menu-item active' : 'menu-item'}>
                                <Link to='/dashboard/support'>
                                    <SupportAgentIcon />
                                    <label>
                                        {system.language[system.current] == 'italian' ? 'Supporto' : null}
                                        {system.language[system.current] == 'english' ? 'Support' : null}
                                        {system.language[system.current] == 'german' ? 'Unterstützung' : null}
                                    </label>
                                </Link> 
                            </li>
                        </ul>
                        }
                    </div>
                </Container>                
            </Dash.Navbar>
            <Dash.Main>
                <Container>
                    {element === 'events' &&
                    <Events />
                    }
                    {element === 'attractions' &&
                    <Attractions />
                    }
                    {element === 'gallery' &&
                    <Gallery />
                    }
                    {element === 'users' &&
                    <Users />
                    }
                    {element === 'support' &&
                    <Support />
                    }
                    {element === 'palazzo' &&
                    <Palazio />
                    }
                    {element === 'rotkreuz' &&
                    <Gemmellagi />
                    }
                    {element === 'notifications' &&
                    <Notifications />
                    }
                </Container>
            </Dash.Main>
        </Dash.Content>
    );
}