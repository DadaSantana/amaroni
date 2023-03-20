import { Container } from 'react-bootstrap';
import { Content } from './styles';

export const Banner = () => {
    return(
        <Content>
            <div className="path-a" />
            <div className="path-b" />
            <div className="title-content">
                <Container>
                    <h1>BORGO AMARONI</h1>
                    <h3>Le vie del Miele</h3>
                </Container>
            </div>
        </Content>
    );
}