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
import { SupportChat } from './SupportChat';
//import realtime funcions
import { lerDados, updateSupportData, listenerMessages } from '../../../../../services/realtime';
import { messaging } from 'firebase-admin';
import { ref, getDatabase, onValue } from 'firebase/database';
import { updateSupportStatus } from '../../../../../services/support';
import { useNavigate } from 'react-router-dom';

type Props = {
    id: string
}

export const Callview = ({id}:Props) => {
    const user = useAppSelector(state => state.user);
    const navigate = useNavigate();
    const currencies = [
        {
          value: 'Registered Call',
          label: 'Chiamata registrata',
        },
        {
          value: 'Analyzing',
          label: 'Analizzando',
        },
        {
          value: 'Waiting for reply',
          label: 'In attesa di risposta',
        },
        {
          value: 'Finished',
          label: 'Finito',
        },
    ];
    //Backdrop
    const [open, setOpen] = React.useState(true);
    //import call
    const [callItem,setCallItem] = React.useState<Support[]>([]);
    const [initializeCall,setInitializeCall] = React.useState(false);
    const [supportId,setSupportId] = React.useState('');
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

    const [chatMessages,setChatMessages] = React.useState<any[]>([]);
    const [chatSetted,setChatSetted] = React.useState(false);

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
            } else { 
            }
        }
        getCallItemById();
    },[listenerMessages()])
    React.useEffect(()=>{        
        if(callItem.length > 0) {
            setSupportId(callItem[0].id);
            setDate(callItem[0].date);
            setSubject(callItem[0].subject);
            setUserAuthor(callItem[0].authorName);
            setSelect(callItem[0].progress);
            setDescription(callItem[0].request);
            setSupportId(callItem[0].id);
            if (href === '') {
                setHref(attach[0]);
            }

            const getMessages = async () => {
                let array = await lerDados(callItem[0].id);
                setChatMessages([array]);
            }
            getMessages();

            setInitializeAttach(false);  
            setInitializeCall(false);          
            setOpen(false);
            setUpload(false);  

        } else {
            setRetry(!retry);
        }
    },[callItem]);

    React.useEffect(()=>{
        if (chatMessages.length > 0) {
            setChatSetted(true);
        }
    },[chatMessages]);

    const handleUpdateSupportStatus = async (id: string, status: string) => {
        setOpen(true);
        await updateSupportStatus(id,status);
        setOpen(false);
    }

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
                    onChange={(e)=>{
                        const status = e.target.value;
                        handleUpdateSupportStatus(supportId,status);
                    }}
                    >
                    {currencies.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                        {option.label}
                        </MenuItem>
                    ))}
                </TextField>
            </div>
            <div className="dialog-box">
                {chatSetted &&
                chatMessages[0][0].map((item: any,index: number)=>(
                    <span className={item.by === 'user' ? 'response' : 'response admin'} >
                        {item.message}
                    </span>
                ))
                }
            </div>
            <SupportChat id={supportId} />
            </>
            }            
        </Content>
    );
}