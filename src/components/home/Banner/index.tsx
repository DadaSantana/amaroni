import * as React from 'react';
import { motion } from 'framer-motion';
import { Container } from 'react-bootstrap';
import { Content } from './styles';

export const Banner = () => {
    const [start,setStart] = React.useState(false);

    return(
        <Content
            initial={{ backgroundSize: '100%' }}
            animate={{ backgroundSize: '105%' }}
            transition={{
                ease: 'linear',
                duration: 5
            }}
        >
            <motion.div 
                className="path-a" 
                initial={{ translateX: '-50vw', opacity: 0 }}
                animate={{ translateX: '0px', opacity: 1 }}
                transition={{ 
                    ease: "linear",
                    duration: 0.5,
                    delay: 0.4
                }}
            />
            <motion.div 
                className="path-b" 
                initial={{ translateX: '-50vw', opacity: 0 }}
                animate={{ translateX: '0px', opacity: 1 }}
                transition={{ 
                    ease: "linear",
                    duration: 0.5,
                    delay: 0.6
                }}
            />
            <div className="title-content" >
                <Container>
                    <motion.h1 
                        initial={{ opacity: 0, translateX: '-50px' }}
                        animate={{ opacity: 1, translateX: '0px' }}
                        transition={{
                            ease: 'linear',
                            duration: 0.5,
                            delay: 0.9
                        }}
                    >
                        BORGO AMARONI
                    </motion.h1>
                    <motion.h3
                        initial={{ opacity: 0, translateX: '-50px' }}
                        animate={{ opacity: 1, translateX: '0px' }}
                        transition={{
                            ease: 'linear',
                            duration: 0.5,
                            delay: 1
                        }}
                    >
                        Le vie del Miele
                    </motion.h3>
                </Container>
            </div>
        </Content>
    );
}