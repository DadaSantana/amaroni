//import react
import * as React from 'react';
//import reducers from redux
import { useAppSelector } from '../../../../../redux/hooks/useAppSelector';
//import types and services
import * as SupportService from '../../../../../services/support';
import { Support } from '../../../../../types/Support';
//import components and icons MUI
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import AttachFileIcon from '@mui/icons-material/AttachFile';
//import styles
import { Content } from './styles';

type Props = {
    id: string
}

export const Callview = ({id}:Props) => {
    const user = useAppSelector(state => state.user);
    const currencies = [
        {
          value: 'Registered Call',
          label: 'Registered Call',
        },
        {
          value: 'Analyzing',
          label: 'Analyzing',
        },
        {
          value: 'Waiting for reply',
          label: 'Waiting for reply',
        },
        {
          value: 'Finished',
          label: 'Finished',
        },
    ];
    //Backdrop
    const [open, setOpen] = React.useState(true);
    //import call
    const [callItem,setCallItem] = React.useState<Support[]>([]);
    const [initializeCall,setInitializeCall] = React.useState(false);
    const [date, setDate] = React.useState('');
    const [subject, setSubject] = React.useState('');
    const [userAuthor, setUserAuthor] = React.useState('');
    const [select,setSelect] = React.useState('');
    const [description,setDescription] = React.useState('');
    const [attach,setAttach] = React.useState<any[]>([]);
    const [initializeAttach,setInitializeAttach] = React.useState(false);
    const [upload,setUpload] = React.useState(false);
    const [retry,setRetry] = React.useState(false);
    const [retryServices,setRetryServices] = React.useState(false);
    const [href,setHref] = React.useState('');
    React.useEffect(()=>{
        const getCallItemById = async () => {
            if (!initializeCall) {
                setCallItem(await SupportService.getCallById(id));
                setInitializeCall(true);
            }
            if (!initializeAttach) {
                setAttach(await SupportService.getSupportAttach(id));
                setInitializeAttach(true);
            }
            if (callItem.length === 0 || attach.length === 0) {
                setRetryServices(!retryServices);
            }            
        }
        getCallItemById();
    },[retry])
    React.useEffect(()=>{
        
        if(callItem.length > 0 && attach.length > 0) {
            setDate(callItem[0].date);
            setSubject(callItem[0].subject);
            setUserAuthor(callItem[0].authorName);
            setSelect(callItem[0].progress);
            setDescription(callItem[0].request);
            if (href === '') {
                console.log('entrou');
                console.log(attach[0]);
                setHref(attach[0]);
            }
            setInitializeAttach(false);  
            setInitializeCall(false);          
            setOpen(false);
            setUpload(false);            
        } else {
            setRetry(!retry);
        }
    },[retryServices]);
    return(
        <Content>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
            >
              <CircularProgress color="inherit" /> Caricamento...
            </Backdrop>
            {!open &&
            <>
            <div className="header-callview">
                <TextField
                    id="outlined-read-only-input"
                    className="call-details date"
                    label="Data di apertura"
                    defaultValue={date}
                    InputProps={{
                        readOnly: true,
                    }}
                />
                <TextField
                    id="outlined-read-only-input"
                    className="call-details subject"
                    label="Soggetto"
                    defaultValue={subject}
                    InputProps={{
                        readOnly: true,
                    }}
                />
                <TextField
                    id="outlined-read-only-input"
                    className="call-details user"
                    label="Utente"
                    defaultValue={userAuthor}
                    InputProps={{
                        readOnly: true,
                    }}
                />
                <TextField
                    id="outlined-select-currency"
                    className="call-details select"
                    select
                    label="Selezionare"
                    defaultValue={select}
                    helperText="Change the state call"
                    >
                    {currencies.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                        {option.label}
                        </MenuItem>
                    ))}
                </TextField>
            </div>
            <textarea 
                className='call-description' 
                cols={30} 
                rows={6}
                value={description}
            />
            <div className="attach-file">
                {!upload &&
                <>
                <AttachFileIcon />
                <a href={href} download="image" target='_blank'>Fare clic qui per scaricare un file immagine</a>
                </>
                }
            </div>
            </>
            }
            
        </Content>
    );
}