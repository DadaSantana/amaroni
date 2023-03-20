//import react
import * as React from 'react';
//import styles
import * as Att from "./styles";
//import icons
import AddIcon from '@mui/icons-material/Add';
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';
//import components
import { AttractionManager } from '../Attractions/AttractionManager';

import Alert from 'react-bootstrap/Alert';
import { GalleryAdd } from './GalleryAdd';
import { GalleryManager } from './GalleryManager';
import { useAppSelector } from '../../../redux/hooks/useAppSelector';

export const Gallery = () => {
    const system = useAppSelector(state=>state.system);

    const [action,setAction] = React.useState(2);

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
                            {system.language[system.current] === 'italian' ? 'Aggiungi immagini' : null}
                            {system.language[system.current] === 'english' ? 'Add Images' : null}
                            {system.language[system.current] === 'german' ? 'Füge Bilder hinzu' : null}
                        </label>
                    </span>
                    <span className="tag-btn" onClick={() => {
                        handleSetAction(2);
                    }}>
                        <AutoAwesomeMotionIcon />
                        <label>
                            {system.language[system.current] === 'italian' ? 'Elenco immagini' : null}
                            {system.language[system.current] === 'english' ? 'Remove Images' : null}
                            {system.language[system.current] === 'german' ? 'Bilder entfernen' : null}
                        </label>
                    </span>
                </div>
                <Alert  key='success' variant='success' show={show}>
                    {system.language[system.current] === 'italian' ? 'Immagine aggiunta con successo!' : null}
                    {system.language[system.current] === 'english' ? 'Image successfully added!' : null}
                    {system.language[system.current] === 'german' ? 'Bild erfolgreich hinzugefügt!' : null}
                </Alert>
            </Att.TagAction>
            <Att.ViewContent>
                {action === 0 &&
                <>
                <span className='label-action'>Selecione uma ação para executar</span>
                </>
                }                
                {action === 1 &&
                <GalleryAdd fn={handleAlert} />
                }
                {action === 2 &&
                <GalleryManager />
                }
            </Att.ViewContent>
        </Att.Content>
    );
}