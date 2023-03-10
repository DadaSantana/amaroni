import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Content } from './styles';
import Logo from '../../../assets/media/logo.png';

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
    return(
        <Content>
            <div className="footer-top">
                <Container>
                    <span className='footer-top-logo'>
                        <img src={Logo} alt="" />
                        <span>
                            <label>Comune di</label>
                            <h3>Amaroni</h3>
                        </span>
                    </span>
                    <div className='footer-top-content'>
                        <div className="box-item">
                            <h5>Links</h5>
                            <ul>
                                <li>
                                    <TimelineIcon />
                                    <Link to="/storia">Storia</Link>
                                </li>
                                <li>
                                    <CollectionsIcon />
                                    <Link to="/storia">Galleria Fotogrática</Link>
                                </li>
                            </ul>
                        </div>
                        <div className="box-item">
                            <h5>Telefones</h5>
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
                            <h5>Social</h5>
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
                            <h5>Sobre nós</h5>
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
                    </div>
                </Container>
            </div>
            <div className="footer-bottom">
                <Container>
                    Copyright © 2009. Comune di Amaroni Powered by Didoweb. All Rights Reserved.
                </Container>
            </div>
        </Content>
    );
}