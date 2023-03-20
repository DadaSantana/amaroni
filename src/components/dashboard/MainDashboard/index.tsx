//import react
import * as React from 'react';
import { Link, useParams } from 'react-router-dom';
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
//import components
import { Events } from '../Events';
import { Attractions } from '../Attractions';
import { Gallery } from '../Gallery';
import { Support } from '../Support';
import { Users } from '../Users';
import { Palazio } from '../Palazio';

export const MainDashboard = () => {
    const user = useAppSelector(state => state.user);
    const system = useAppSelector(state => state.system);
    const { element } = useParams();
    const [openCalls,setOpenCalls] = React.useState(false);
    const [count,setCount] = React.useState(0);
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

    return(
        <Dash.Content>
            <Dash.Navbar>
                <Container>
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
                                        {system.language[system.current] == 'italian' ? 'Paginas' : null}
                                        {system.language[system.current] == 'english' ? 'Pages' : null}
                                        {system.language[system.current] == 'german' ? 'Pages' : null}
                                    </label>                                    
                                </Link>
                                <span className='toggle-pages'>
                                    <Link to='/dashboard/pages/palazio'>Palazio Comunale</Link>
                                    <Link to='/dashboard/pages/rotkreuz'>Rotkreuz</Link>
                                    <Link to='/dashboard/pages/lukovica'>Lukovica</Link>
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
                                        {system.language[system.current] == 'italian' ? 'Attrazioni' : null}
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
                    {element === 'palazio' &&
                    <Palazio />
                    }
                </Container>
            </Dash.Main>
        </Dash.Content>
    );
}