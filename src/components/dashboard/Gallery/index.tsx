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

export const Gallery = () => {

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
                        <label>Adicionar</label>
                    </span>
                    <span className="tag-btn" onClick={() => {
                        handleSetAction(2);
                    }}>
                        <AutoAwesomeMotionIcon />
                        <label>Gerenciar</label>
                    </span>
                </div>
                <Alert  key='success' variant='success' show={show}>
                    Evento adicionado com sucesso.
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
                <GalleryManager en={false} />
                }
            </Att.ViewContent>
        </Att.Content>
    );
}