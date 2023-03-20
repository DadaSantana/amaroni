//import react
import * as React from 'react';
//import components
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
//import styles
import { ChatContent } from "./styles";
//import icons
import SendIcon from '@mui/icons-material/Send';

import { lerDados, updateSupportData } from '../../../../../../services/realtime';
import { useAppSelector } from '../../../../../../redux/hooks/useAppSelector';

type ChatProps = {
    id: string,
}

export const SupportChat = ({id}: ChatProps) => {
    const user = useAppSelector(state=>state.user);
    const [message,setMessage] = React.useState('');

    const handleSetNewMessage = (id: string, message: string) => {
        console.log(id);
        console.log(message);
        if (user.level.admin) {
            updateSupportData(id,true,message);
        } else {
            updateSupportData(id,false,message);
        }
        setMessage('');
        
    }

    return(
        <ChatContent>
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <TextField
                    id="filled-multiline-flexible"
                    label="Type a message"
                    multiline
                    maxRows={4}
                    variant="filled"
                    onChange={(e)=>{setMessage(e.target.value)}}
                    value={message}
                />
            </Box> 
            <IconButton aria-label="send" onClick={()=>{
                handleSetNewMessage(id,message);
            }}>
                <SendIcon />
            </IconButton>         
        </ChatContent>
    );
}