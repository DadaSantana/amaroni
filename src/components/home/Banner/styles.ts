import { motion } from 'framer-motion';
import styled from 'styled-components';
import banner from '../../../assets/media/Panorama.jpg';

export const Content = styled(motion.div)`
    background: url('${banner}');
    min-height: 50vh;
    background-position: center;

    .path-a {
        position: absolute;
        -webkit-clip-path: polygon(0 0,41% 0,30% 50%,0 50%);
        clip-path: polygon(0 0,41% 0,30% 50%,0 50%);
        background-color: var(--secondColor);
        min-height: 50vh;
        width: 100%;
    }

    .path-b {
        position: absolute;
        -webkit-clip-path: polygon(25% 0,63% 0,56% 31%,32% 31%);
        clip-path: polygon(25% 0,63% 0,56% 31%,32% 31%);
        background-color: var(--mainColor);
        min-height: 50vh;
        width: 100%;
    }

    .title-content {
        position: absolute;
        z-index: 9;
        min-height: 50vh;
        width: 100%;

        .container {
            padding: 0;
            h1 {
                color: var(--whiteFont);
                padding-top: 24px;
                font-weight: bold;
                margin-bottom: 0;
            }
            h3 {
                color: var(--whiteFont);
                font-style: italic;
            }
    
    
        }
    }
    

    @media (max-width: 760px) {

        .path-a {
            clip-path: polygon(0 0,41% 0,30% 35%,0 35%);
        }

        .path-b {
            clip-path: polygon(25% 0,63% 0,56% 25%,30% 25%);
        }

        .title-content {
            .container {
                padding: 0 10px;
            }
        }

    }

`;