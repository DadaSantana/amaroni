import * as React from 'react';
import { Content } from '../InsertLink/styles';
import TextField from '@mui/material/TextField';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddLinkIcon from '@mui/icons-material/AddLink';

type Props = {
    link: any[],
    setLink: React.Dispatch<React.SetStateAction<any[]>>
}

export const InsertLink = ({link, setLink}:Props) => {
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
        <Content>
            <div className="upper-add-link">
                <TextField 
                    id="filled-basic" 
                    className='add-link'
                    label="Link Title" 
                    variant="filled" 
                    onChange={(e)=>{
                        setText(e.currentTarget.value);
                    }}
                />
                <TextField 
                    id="filled-basic" 
                    className='add-link'
                    label="Link Address" 
                    variant="filled"
                    onChange={(e)=>{
                        setHref(e.currentTarget.value);
                    }}
                />
                <span className='icon-add-link' onClick={handleNewLink}>
                    <label>
                        Add Link
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