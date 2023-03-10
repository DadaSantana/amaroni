import styled from 'styled-components';
import banner from '../../../assets/media/Borgo_Amaroni.png';

export const Content = styled.div`
    background: url('${banner}');
    min-height: 50vh;
    background-position: left;
    background-size: cover;

    .container {
        h1 {
            color: var(--whiteFont);
            font-weight: bold;
            padding-top: 20px;
            text-shadow: 0 0 10px black;
        }
    }

    @media (max-width: 480px) and (orientation: portrait) {
        background-position: left;
    }

`;