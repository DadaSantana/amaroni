import * as React from 'react';
//impor styles
import { Content } from './styles';
import { Container } from 'react-bootstrap';
import { NewsManager } from './NewsManager';

export const Palazio = () => {
    return(
        <Content>
            <Container>
                <NewsManager />
            </Container>
        </Content>
    );
}