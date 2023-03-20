//import react
import * as React from 'react';
//import redux
import { useAppSelector } from "../../redux/hooks/useAppSelector";
//import styles
import { Container } from "react-bootstrap";
import { Content } from "./styles";
//import components
import Button from '@mui/material/Button';
//import services
import { sendEmailVerify } from '../../services/auth';

export const EmailVerify = () => {
    const system = useAppSelector(state=>state.system);
    const user = useAppSelector(state=>state.user);
    
    const [sendState,setSendState] = React.useState(false);
    const handleSendState = async () => {
        const state = await sendEmailVerify();
        console.log(state);
        if (state) {
            setSendState(true);
        }
    }

    return(
        <Content>
            <Container>
                <h1>
                    {system.language[system.current] === 'italian' ? 'Controlla il tuo conto!' : null}
                    {system.language[system.current] === 'english' ? 'Check your account!' : null}
                    {system.language[system.current] === 'german' ? 'Überprüfen Sie Ihr Konto!' : null}
                </h1>
                <p>
                    {system.language[system.current] === 'italian' ? `Devi verificare la tua email - ${user.email} - per ottenere l'accesso al sistema.` : null}
                    {system.language[system.current] === 'english' ? `You need to verify your email - ${user.email} - to gain access to the system.` : null}
                    {system.language[system.current] === 'german' ? `Sie müssen Ihre E-Mail-Adresse verifizieren - ${user.email} -, um Zugriff auf das System zu erhalten.` : null}
                    <br />
                    {system.language[system.current] === 'italian' ? "Per inviare nuovamente l'e-mail, fare clic sul pulsante in basso." : null}
                    {system.language[system.current] === 'english' ? 'To resend the email, click the button below.' : null}
                    {system.language[system.current] === 'german' ? 'Um die E-Mail erneut zu senden, klicken Sie auf die Schaltfläche unten.' : null}
                </p>
                {!sendState &&
                <Button variant="contained" onClick={handleSendState}>
                    {system.language[system.current] === 'italian' ? "Invia di nuovo la verifica dell'e-mail" : null}
                    {system.language[system.current] === 'english' ? 'Resend email verification.' : null}
                    {system.language[system.current] === 'german' ? 'E-Mail-Bestätigung erneut senden' : null}
                </Button>
                }
                {sendState &&
                <Button variant="contained" color="success">
                    {system.language[system.current] === 'italian' ? "Inviato!" : null}
                    {system.language[system.current] === 'english' ? 'Sent!' : null}
                    {system.language[system.current] === 'german' ? 'Gesendet!' : null}
                </Button>
                }
            </Container>
        </Content>
    );
}