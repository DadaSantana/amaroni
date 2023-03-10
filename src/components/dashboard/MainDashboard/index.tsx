//import react
import * as React from 'react';
import { Link, useParams } from 'react-router-dom';
//import reducers from redux
import { useAppSelector } from '../../../redux/hooks/useAppSelector';
//import styles
import * as Dash from './styles';
import { Container } from 'react-bootstrap';
//import icons
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import AttractionsIcon from '@mui/icons-material/Attractions';
import CollectionsIcon from '@mui/icons-material/Collections';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
//import components
import { Events } from '../Events';
import { Attractions } from '../Attractions';
import { Gallery } from '../Gallery';
import { Support } from '../Support';

export const MainDashboard = () => {
    const user = useAppSelector(state => state.user);
    const system = useAppSelector(state => state.system);
    const { element } = useParams();

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
                                    {system.language[system.current] == 'italian' ? 'Annuncio' : null}
                                    {system.language[system.current] == 'english' ? 'Announcement' : null}
                                    {system.language[system.current] == 'german' ? 'Bekanntmachung' : null}
                                </Link>
                            </li>
                            <li 
                                className={element === 'attractions' ? 'menu-item active' : 'menu-item'}
                            >
                                <Link to='/dashboard/attractions'>
                                    <AttractionsIcon />
                                    {system.language[system.current] == 'italian' ? 'Attrazioni' : null}
                                    {system.language[system.current] == 'english' ? 'Attractions' : null}
                                    {system.language[system.current] == 'german' ? 'Sehenswürdigkeiten' : null}
                                </Link>
                            </li>
                            <li 
                            className={element === 'gallery' ? 'menu-item active' : 'menu-item'}
                            >
                                <Link to='/dashboard/gallery'>
                                    <CollectionsIcon />
                                    {system.language[system.current] == 'italian' ? 'Galleria' : null}
                                    {system.language[system.current] == 'english' ? 'Photo Gallery' : null}
                                    {system.language[system.current] == 'german' ? 'Fotogallerie' : null}
                                </Link>                                
                            </li>
                            <li className={element === 'support' ? 'menu-item active' : 'menu-item'}>
                                <Link to='/dashboard/support'>
                                    <SupportAgentIcon />
                                    {system.language[system.current] == 'italian' ? 'Supporto' : null}
                                    {system.language[system.current] == 'english' ? 'Support' : null}
                                    {system.language[system.current] == 'german' ? 'Unterstützung' : null}
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
                                    {system.language[system.current] == 'italian' ? 'Attrazioni' : null}
                                    {system.language[system.current] == 'english' ? 'Attractions' : null}
                                    {system.language[system.current] == 'german' ? 'Sehenswürdigkeiten' : null}
                                </Link>
                            </li>
                            <li className={element === 'support' ? 'menu-item active' : 'menu-item'}>
                                <Link to='/dashboard/support'>
                                    <SupportAgentIcon />
                                    {system.language[system.current] == 'italian' ? 'Supporto' : null}
                                    {system.language[system.current] == 'english' ? 'Support' : null}
                                    {system.language[system.current] == 'german' ? 'Unterstützung' : null}
                                </Link> 
                            </li>
                        </ul>
                        }
                        {user.level.guest &&
                        <ul>
                            <li className={element === 'support' ? 'menu-item active' : 'menu-item'}>
                                <Link to='/dashboard/support'>
                                    <SupportAgentIcon />
                                    {system.language[system.current] == 'italian' ? 'Supporto' : null}
                                    {system.language[system.current] == 'english' ? 'Support' : null}
                                    {system.language[system.current] == 'german' ? 'Unterstützung' : null}
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
                    {element === 'support' &&
                    <Support />
                    }
                </Container>
            </Dash.Main>
        </Dash.Content>
    );
}