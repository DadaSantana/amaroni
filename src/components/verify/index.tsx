//import react
import * as React from 'react';
//import redux
import { useAppSelector } from "../../redux/hooks/useAppSelector";
//import styles
import { Container } from "react-bootstrap";
import { Content } from "./styles";
//import components
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
//import services
import { monitorAuthState, sendEmailVerify } from '../../services/auth';
import { writeVerifyData, listenerVerifyData } from '../../services/realtime';
import * as AuthService from '../../services/auth';
import { getAuth, onAuthStateChanged, reload } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { setVerified } from '../../redux/reducers/userReducers';
import { useNavigate } from 'react-router-dom';

export const EmailVerify = () => {
    const system = useAppSelector(state=>state.system);
    const usuario = useAppSelector(state=>state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [sendState,setSendState] = React.useState(false);

    const handleSendState = async () => {

    }

    React.useEffect(()=>{
        const auth = getAuth();
        onAuthStateChanged(auth, async (user) => {
        if (user) {
            if (user.emailVerified != usuario.verified) {
                if (user.emailVerified) {
                    dispatch(setVerified(true));
                    navigate('/dashboard/support');
                }
            } else if (user.displayName != null) {
                await reload(user);
            }
            // ...
        } else {
            // User is signed out
            // ...
        }
        });
    },[])

   /*  React.useEffect(()=>{
        if (!user.verified) {
            writeVerifyData(user.id);
        }        
    },[])

    React.useEffect(()=>{
        const data = listenerVerifyData();
        console.log(data);
    },[listenerVerifyData()]);

    React.useEffect(()=>{
        if (!stop) {

            const getMonitor = async () => {
                setStop(await monitorVerifiedState());
                if (!stop) {
                    setAgain(!again);
                }
            }
            getMonitor();
        }
    },[again]) */

    return(
        <Content>
            <Container>
                <h1>
                    {system.language[system.current] === 'italian' ? 'Controlla la tua e-mail' : null}
                    {system.language[system.current] === 'english' ? 'Check your account!' : null}
                    {system.language[system.current] === 'german' ? 'Überprüfen Sie Ihr Konto!' : null}
                </h1>
                <p>
                    {system.language[system.current] === 'italian' ? `Devi verificare la tua email - ${usuario.email} - per ottenere l'accesso al sistema.` : null}
                    {system.language[system.current] === 'english' ? `You need to verify your email - ${usuario.email} - to gain access to the system.` : null}
                    {system.language[system.current] === 'german' ? `Sie müssen Ihre E-Mail-Adresse verifizieren - ${usuario.email} -, um Zugriff auf das System zu erhalten.` : null}
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
                <div className="waiting">
                    <CircularProgress />
                    <p>
                        {system.language[system.current] === 'italian' ? "In attesa di verifica..." : null}
                        {system.language[system.current] === 'english' ? 'Awaiting verification...' : null}
                        {system.language[system.current] === 'german' ? 'Wartet auf Bestätigung...' : null}
                    </p>
                </div>
            </Container>
        </Content>
    );
}