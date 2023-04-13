import { motion } from 'framer-motion';
import styled from 'styled-components';

export const Content = styled(motion.div)`
    position: fixed;    
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    padding: 20px 0;
    width: 100%;
    z-index: 99999;

    .container {
        display: flex;
        justify-content: center;

        .alert {
            flex: 1;
            text-align: left;
            margin: 0;
        }
    }
`;