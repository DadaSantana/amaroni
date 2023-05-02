import { Container } from 'react-bootstrap';
import { Content } from './styles';
import Logo from './logo.png';
import movie from './movie.mp4';

export const Banner = () => {
    return(
        <Content>
            <video 
                id="myVideo"
                autoPlay={true} 
                muted 
                loop 
                controls={false} 
                preload="auto"
            >
                <source src={movie} type="video/mp4" />
            </video>
            <Container>
                <img src={Logo} alt="" />
                <h1>Non solo amici, qualcosa di più...</h1>
            </Container>
        </Content>
    );
}