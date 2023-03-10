//import styles
import { Container } from 'react-bootstrap';
import { Content, Numbers } from './styles';
//import icons
import LocationCityIcon from '@mui/icons-material/LocationCity';
import CallIcon from '@mui/icons-material/Call';
import LocalPoliceIcon from '@mui/icons-material/LocalPolice';
import FireTruckIcon from '@mui/icons-material/FireTruck';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';

export const MapAndNumbers = () => {
    return(
        <Content>
            <Container>
                <Numbers>
                    <a className='tel-title' href="">Telefones importantes</a>
                    <span className="contact-board">
                        <div className="local">
                            <LocationCityIcon />
                            <p>Comuni di Amaroni</p>
                        </div>
                        <div className="telephone">
                            <CallIcon />
                            <a href="tel:+390961913030">+39 0961 913030</a>
                        </div>
                    </span>
                    <span className="contact-board">
                        <div className="local">
                            <LocalPoliceIcon />
                            <p>Police</p>
                        </div>
                        <div className="telephone">
                            <CallIcon />
                            <a href="tel:190">190</a>
                        </div>
                    </span>
                    <span className="contact-board">
                        <div className="local">
                            <FireTruckIcon />
                            <p>Fireman</p>
                        </div>
                        <div className="telephone">
                            <CallIcon />
                            <a href="tel:190">193</a>
                        </div>
                    </span>
                    <span className="contact-board">
                        <div className="local">
                            <HealthAndSafetyIcon />
                            <p>Ambulance</p>
                        </div>
                        <div className="telephone">
                            <CallIcon />
                            <a href="tel:190">192</a>
                        </div>
                    </span>
                </Numbers>
            </Container>

        </Content>

    );
}