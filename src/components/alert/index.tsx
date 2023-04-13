import { Content } from './styles';
import * as Bootstrap from 'react-bootstrap';

export const Alert = (color:string, message: string) => {
    return(
        <Content
            initial={{ translateY: '-100px' }}
            animate={{ translateY: '0px' }}
            transition={{ ease: 'linear', duration: 0.5 }}
        >
            <Bootstrap.Container>
                <Bootstrap.Alert className='alert' variant={color}>
                    {message}
                </Bootstrap.Alert>
            </Bootstrap.Container>
        </Content>
    )
}