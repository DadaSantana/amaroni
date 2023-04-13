import * as React from 'react';
import { useAppSelector } from '../../redux/hooks/useAppSelector';
import { Content } from './styles';
import TextField from '@mui/material/TextField';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddLinkIcon from '@mui/icons-material/AddLink';

type Props = {
    link: any[],
    setLink: React.Dispatch<React.SetStateAction<any[]>>
}

export const InsertLink = ({link, setLink}:Props) => {
    const system = useAppSelector(state=>state.system);
    const [text,setText] = React.useState('');
    const [href,setHref] = React.useState('');
    const [showLinks,setShowLinks] = React.useState(false);
    const [updateMap,setUpdateMap] = React.useState(false);

    const handleNewLink = () => {
        if (text != '' && href != '') {
            setShowLinks(false);
            setLink([...link, {textLink: text, hrefLink: href}]);
            setUpdateMap(!updateMap);
        }
    }
    const handleRemoveLink = (e: number) => {
        setShowLinks(false);
        if (e > -1) { // only splice array when item is found
            link.splice(e, 1); // 2nd parameter means remove one item only 
            setUpdateMap(!updateMap);
        }      
    }

    React.useEffect(()=>{
        if (link.length > 0) {
            setShowLinks(true);
        }        
    },[updateMap])

    return(
        <Content className='link-content'>
            <div className="upper-add-link">
                <TextField 
                    id="filled-basic" 
                    className='add-link'
                    label={
                        system.language[system.current] == 'italian' ? 'Titolo del collegamento' :
                        system.language[system.current] == 'english' ? 'Link title' : 
                        system.language[system.current] == 'german' ? 'Linktitel' : ''
                    }
                    variant="filled" 
                    onChange={(e)=>{
                        setText(e.currentTarget.value);
                    }}
                />
                <TextField 
                    id="filled-basic" 
                    className='add-link'
                    label={
                        system.language[system.current] == 'italian' ? 'Indirizzo di collegamento' :
                        system.language[system.current] == 'english' ? 'Link address' : 
                        system.language[system.current] == 'german' ? 'Linkadresse' : ''
                    } 
                    variant="filled"
                    onChange={(e)=>{
                        setHref(e.currentTarget.value);
                    }}
                />
                <span className='icon-add-link' onClick={handleNewLink}>
                    <label>
                        {system.language[system.current] == 'italian' ? 'Aggiungere' : null}
                        {system.language[system.current] == 'english' ? 'Add Link' : null}
                        {system.language[system.current] == 'german' ? 'Hinzufügen' : null}
                    </label>
                    <AddLinkIcon />
                </span>                                
            </div>
            <div id="bottom-link" className="bottom-add-link">
                {showLinks &&
                link.map((item,index)=>(
                    <span className='link-item'>
                        <a href={item.hrefLink} target="_blank">{item.textLink}</a>
                        <DeleteForeverIcon id="delete-icon" onClick={()=>{handleRemoveLink(index)}}/>
                    </span> 
                ))

                }
               
            </div>
        </Content>
    );
}