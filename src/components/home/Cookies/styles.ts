import { motion } from 'framer-motion';
import styled from 'styled-components';

export const Content = styled(motion.div)`
    position: fixed;
    display: flex;
    justify-content: center;
    bottom: 0;
    padding: 20px;
    z-index: 1000;

    span.cookie-float {
        display: flex;
        align-items: center; 
        background-color: #f9f9f9;
        box-shadow: 0 0 5px var(--shadow);
        padding: 10px;

        p {
            font-size: 12px;
            text-align: justify;
            margin: 0;
            margin-right: 10px;
        }

        button {
<<<<<<< HEAD
            width: 150px;
            margin-left: 30px;
=======
>>>>>>> c415e8aca664a869c148a9d52dfce3b6b3bf6b24
            height: fit-content;
        }

        @media (max-width: 760px) {
            flex-direction: column;

            p {
                margin-bottom: 10px;
            }

            button {
                width: 100%;
            }
        }
    }
`;