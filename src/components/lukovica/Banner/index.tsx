import { Container } from 'react-bootstrap';
import { Content } from './styles';
import Logo from './logo.png'

export const Banner = () => {
    return(
        <Content>
            <Container>
                <img src={Logo} alt="" />
                <h1>Non solo amici, qualcose di più...</h1>
            </Container>
        </Content>
    );
}