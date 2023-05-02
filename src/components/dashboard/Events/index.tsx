//import react
import * as React from 'react';
//import redux
import { useAppSelector } from '../../../redux/hooks/useAppSelector';
//import styles
import * as Att from "./styles";
//import icons
import AddIcon from '@mui/icons-material/Add';
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';
//import components
import { AttractionManager } from '../Attractions/AttractionManager';
import { EventAdd } from './EventAdd';
import { EventManager } from './EventManager';
import Alert from 'react-bootstrap/Alert';
import { useNavigate } from 'react-router-dom';

export const Events = () => {
    const system = useAppSelector(state => state.system);
    const [action,setAction] = React.useState(2);
    const navigate = useNavigate();

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
        <Att.Content>
            <Att.TagAction>
                <div className="tag-group">
                    <span className="tag-btn" onClick={() => {
                        handleSetAction(1);
                    }}>
                        <AddIcon />
                        <label>
                            {system.language[system.current] == 'italian' ? 'Aggiungere' : null}
                            {system.language[system.current] == 'english' ? 'To add' : null}
                            {system.language[system.current] == 'german' ? 'Hinzufügen' : null}
                        </label>
                    </span>
                    <span className="tag-btn" onClick={() => {
                        handleSetAction(2);
                        navigate(0);
                    }}>
                        <AutoAwesomeMotionIcon />
                        <label>
                            {system.language[system.current] == 'italian' ? 'Elenco eventi' : null}
                            {system.language[system.current] == 'english' ? 'To manage' : null}
                            {system.language[system.current] == 'german' ? 'Managen' : null}
                        </label>
                    </span>
                </div>
                <Alert  key='success' variant='success' show={show}>
                    {system.language[system.current] == 'italian' ? 'Evento aggiunto con successo.' : null}
                    {system.language[system.current] == 'english' ? 'Event added successfully.' : null}
                    {system.language[system.current] == 'german' ? 'Veranstaltung erfolgreich hinzugefügt.' : null}
                </Alert>
            </Att.TagAction>
            <Att.ViewContent>
                {action === 0 &&
                <>
                <span className='label-action'>Selecione uma ação para executar</span>
                </>
                }                
                {action === 1 &&
                <>
                <EventAdd fn={handleAlert} />
                </>
                }     
                {action === 2 &&
                <>
                <EventManager en={false} />
                </>
                }           
            </Att.ViewContent>
        </Att.Content>
    );
}