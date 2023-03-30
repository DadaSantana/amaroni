import { Container } from 'react-bootstrap';

import { useAppSelector } from '../../../redux/hooks/useAppSelector';

import { Link } from 'react-router-dom';
import { Content } from './styles';
import Logo from '../../../assets/media/logo.png';
import appStore from '../../../assets/media/appStore.svg';
import playStore from '../../../assets/media/playStore.png';

import TimelineIcon from '@mui/icons-material/Timeline';
import CollectionsIcon from '@mui/icons-material/Collections';
import LocalPoliceIcon from '@mui/icons-material/LocalPolice';
import FireTruckIcon from '@mui/icons-material/FireTruck';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import HomeIcon from '@mui/icons-material/Home';
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';

export const Footer = () => {
    const system = useAppSelector(state=>state.system);
    
    return(
        <Content>
            <div className="footer-top">
                <div className="container">
                    <span className='footer-top-logo'>
                        <img src={Logo} alt="" />
                        <span>
                            <label>Comune di</label>
                            <h3>Amaroni</h3>
                        </span>
                    </span>
                    <div className='footer-top-content'>
                        <div className="box-item">
                            <h5>
                                {system.language[system.current] === 'italian' ? 'Collegamenti' : null}
                                {system.language[system.current] === 'english' ? 'Links' : null}
                                {system.language[system.current] === 'german' ? 'Verknüpfungen' : null}
                            </h5>
                            <ul>
                                <li>
                                    <TimelineIcon />
                                    <Link to="/storia">
                                        {system.language[system.current] === 'italian' ? 'Storia' : null}
                                        {system.language[system.current] === 'english' ? 'History' : null}
                                        {system.language[system.current] === 'german' ? 'Geschichte' : null}
                                    </Link>
                                </li>
                                <li>
                                    <CollectionsIcon />
                                    <Link to="/gallery">
                                        {system.language[system.current] === 'italian' ? 'Galleria fotografica' : null}
                                        {system.language[system.current] === 'english' ? 'Photo gallery' : null}
                                        {system.language[system.current] === 'german' ? 'Galleria fotografica' : null}
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="box-item">
                            <h5>
                                {system.language[system.current] === 'italian' ? 'Telefoni' : null}
                                {system.language[system.current] === 'english' ? 'Phones' : null}
                                {system.language[system.current] === 'german' ? 'Telefone' : null}
                            </h5>
                            <ul>
                                <li>
                                    <LocalPoliceIcon />
                                    <a href="tel:+55199">199</a>
                                </li>
                                <li>
                                    <FireTruckIcon />
                                    <a href="tel:+55199">199</a>
                                </li>
                                <li>
                                    <LocalHospitalIcon />
                                    <a href="tel:+55199">199</a>
                                </li>
                            </ul>
                        </div>
                        <div className="box-item">
                            <h5>
                                {system.language[system.current] === 'italian' ? 'Sociale' : null}
                                {system.language[system.current] === 'english' ? 'Social' : null}
                                {system.language[system.current] === 'german' ? 'Sozial' : null}
                            </h5>
                            <ul>
                                <li>
                                    <FacebookIcon />
                                    <Link to="/storia">Facebook</Link>
                                </li>
                                <li>
                                    <InstagramIcon />
                                    <Link to="/storia">Instagram</Link>
                                </li>
                                <li>
                                    <TwitterIcon />
                                    <Link to="/storia">Twitter</Link>
                                </li>
                            </ul>
                        </div>
                        <div className="box-item">
                            <h5>
                                {system.language[system.current] === 'italian' ? 'Chi siamo' : null}
                                {system.language[system.current] === 'english' ? 'About Us' : null}
                                {system.language[system.current] === 'german' ? 'Über uns' : null}
                            </h5>
                            <ul>
                                <li>
                                    <HomeIcon />
                                    <Link to="/storia">Via Indipendenza, 60, 88050 Amaroni CZ, Itália</Link>
                                </li>
                                <li>
                                    <EmailIcon />
                                    <Link to="/storia">sindaco@comunediamaroni.it</Link>
                                </li>
                                <li>
                                    <LocalPhoneIcon />
                                    <a href="tel:+390961913030">+39 0961 913030</a>
                                </li>
                            </ul>
                        </div>
                        <div className="box-item">
                            <h5>
                                {system.language[system.current] === 'italian' ? 'Scarica la nostra app' : null}
                                {system.language[system.current] === 'english' ? 'Download our app' : null}
                                {system.language[system.current] === 'german' ? 'Laden Sie unsere App herunter' : null}
                            </h5>
                            <ul>
                                <li>
                                    <a href="">
                                        <img src={appStore} alt="" />
                                    </a>                                    
                                </li>
                                <li>
                                    <a href="">
                                        <img src={playStore} alt="" />
                                    </a>                                    
                                </li>
                            </ul>
                            
                        </div>
                    </div>
                </div>                
            </div>
            <div className="footer-bottom">
                <Container>
                    Copyright © 2023. Powered by Comune di Amaroni. All Rights Reserved.
                </Container>
            </div>
        </Content>
    );
}