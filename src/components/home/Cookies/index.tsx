import * as React from 'react';
import { Content } from "./styles";
import { useAppSelector } from "../../../redux/hooks/useAppSelector";
import Button from '@mui/material/Button';
import { useCookies } from "react-cookie";
import { motion } from 'framer-motion';

export const Cookies = () => {
    const system = useAppSelector(state=>state.system);
    const [cookies, setCookie, removeCookie] = useCookies(['privacy-policy']);
    const [state,setState] = React.useState(false);

    React.useEffect(()=>{
        if (cookies['privacy-policy']) {
            setState(false);
        } else {
            setState(true);
        }
    },[])

    return(
        <Content style={{display: state ? 'flex' : 'none'}}>
            <motion.span 
                className="cookie-float"
                initial={{ translateY: '100px', opacity: 0 }}
                animate={{ translateY: '0px', opacity: 1 }}
                transition={{
                    ease: 'backOut',
                    delay: 3,
                    duration: 1
                }}
            >
                <p>
                    {system.language[system.current] == 'italian' ? 'Utilizziamo cookie e altre tecnologie simili per migliorare la tua esperienza sui nostri servizi, personalizzare la pubblicità e consigliare contenuti di tuo interesse. Utilizzando i nostri servizi, sei a conoscenza di questa funzionalità. Scopri il nostro Portale Privacy e consulta la nostra Privacy Policy.' : null}
                    {system.language[system.current] == 'english' ? 'We use cookies and other similar technologies to improve your experience on our services, personalize advertising and recommend content of interest to you. By using our services, you are aware of this functionality. Discover our Privacy Portal and consult our Privacy Policy.' : null}
                    {system.language[system.current] == 'german' ? 'Wir verwenden Cookies und andere ähnliche Technologien, um Ihre Erfahrung mit unseren Diensten zu verbessern, Werbung zu personalisieren und Ihnen interessante Inhalte zu empfehlen. Durch die Nutzung unserer Dienste sind Sie sich dieser Funktionalität bewusst. Entdecken Sie unser Datenschutzportal und konsultieren Sie unsere Datenschutzrichtlinie.' : null}
                </p>
                <Button 
                    variant="contained" 
                    color="info"
                    onClick={()=>{
                        setState(false);
                        setCookie('privacy-policy', true);
                    }}
                >
                    {system.language[system.current] == 'italian' ? 'Proceder' : null}
                    {system.language[system.current] == 'english' ? 'Proceed' : null}
                    {system.language[system.current] == 'german' ? 'Fortfahren' : null}
                </Button>
            </motion.span>
        </Content>
    );
}