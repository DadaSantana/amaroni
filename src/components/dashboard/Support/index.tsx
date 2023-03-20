//import react
import * as React from 'react';
//import reducers from redux
import { useAppSelector } from '../../../redux/hooks/useAppSelector';
//import styles
import { Content, TagAction, ViewContent } from "./styles";
//import icons
import MoveToInboxIcon from '@mui/icons-material/MoveToInbox';
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';
import AddIcon from '@mui/icons-material/Add';
//import components
import { AttractionManager } from '../Attractions/AttractionManager';

import Alert from 'react-bootstrap/Alert';
import { SupportCall } from './SupportCall';
import { SupportManager } from './SupportManager';
import { useNavigate } from 'react-router-dom';

export const Support = () => {
    const user = useAppSelector(state => state.user);
    const system = useAppSelector(state => state.system);
    const navigate = useNavigate();
    const [action,setAction] = React.useState(1);

    const handleSetAction = (n: number) => {
        setAction(n);
    }

    const [show,setShow] = React.useState(false);

    const handleAlert = () => {
        setShow(true);
        setTimeout(() => {
            setShow(false);
        }, 5000);
    }
    return(
        <Content>
            <TagAction>
                <div className="tag-group">
                    {user.level.admin && 
                    <>
                    <span className="tag-btn" onClick={() => {
                        handleSetAction(1);
                        navigate(0);
                    }}>
                        <MoveToInboxIcon />
                        <label>
                            {system.language[system.current] == 'italian' ? 'Posta in arrivo' : null}
                            {system.language[system.current] == 'english' ? 'Inbox' : null}
                            {system.language[system.current] == 'german' ? 'Posteingang' : null}
                        </label>
                    </span>
                    <span className="tag-btn" onClick={() => {
                        handleSetAction(2);
                    }}>
                        <AutoAwesomeMotionIcon />
                        <label>
                            {system.language[system.current] == 'italian' ? 'Risolto' : null}
                            {system.language[system.current] == 'english' ? 'Resolved' : null}
                            {system.language[system.current] == 'german' ? 'Gelöst' : null}
                        </label>
                    </span>
                    </>
                    }
                    {!user.level.admin &&
                    <>
                    <span className="tag-btn" onClick={() => {
                        handleSetAction(1);
                    }}>
                        <MoveToInboxIcon />
                        <label>
                            {system.language[system.current] == 'italian' ? 'Le mie chiamate' : null}
                            {system.language[system.current] == 'english' ? 'My calls' : null}
                            {system.language[system.current] == 'german' ? 'Meine Anrufe' : null}
                        </label>
                    </span>
                    <span className="tag-btn" onClick={() => {
                        handleSetAction(4);
                    }}>
                        <AddIcon />
                        <label>
                            {system.language[system.current] == 'italian' ? 'Apri un ticket' : null}
                            {system.language[system.current] == 'english' ? 'Open call' : null}
                            {system.language[system.current] == 'german' ? 'Offenes Ticket' : null}
                        </label>
                    </span>
                    </>
                    }
                </div>
                <Alert  key='success' variant='success' show={show}>
                    {system.language[system.current] == 'italian' ? 'Chiamata aperta con successo.' : null}
                    {system.language[system.current] == 'english' ? 'Call opened successfully.' : null}
                    {system.language[system.current] == 'german' ? 'Anruf erfolgreich geöffnet.' : null}
                </Alert>
            </TagAction>
            <ViewContent>
                {action === 0 &&
                <>
                <span className='label-action'>Selecione uma ação para executar</span>
                </>
                }                
                {action === 1 &&
                <>
                <SupportManager />        
                </>
                }     
                {action === 4 &&
                <>
                <SupportCall fn={handleAlert} />
                </>
                }
            </ViewContent>
        </Content>
    );
}