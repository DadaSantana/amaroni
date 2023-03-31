import * as React from 'react';
//import reducers
import { useAppSelector } from '../../../redux/hooks/useAppSelector';
import { Content, ViewContent } from "./styles";
//import components
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import SendToMobileIcon from '@mui/icons-material/SendToMobile';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
//import service
import * as NotificationService from '../../../services/notifications';

export const Notifications = () => {  

    const user = useAppSelector(state=>state.user);
    const [open, setOpen] = React.useState(false);

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setOpen(true);
        const data = new FormData(e.currentTarget);
        const title = data.get('title') as string;
        const message = data.get('message') as string;
        const date = new Date();

        if (title != '' && message != '') {
            await NotificationService.newNotification(title,message,user.name,user.id,date);
            setOpen(false);
        }
    }

    return(
        <Content>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
            >
              <CircularProgress color="inherit" /> Posizione di registrazione...
            </Backdrop>
            <ViewContent>
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                    onSubmit={handleFormSubmit}
                > 
                    <TextField
                        className='title-input'
                        name='title'
                        required
                        id="outlined-required"
                        label="Titulo"
                        defaultValue=""
                        style={{
                            flex: '1',
                            marginRight: '20px'
                        }}
                    />   
                    <TextField
                        className='message-input'
                        name='message'
                        id="outlined-multiline-flexible"
                        label="Message"
                        multiline
                        maxRows={3}
                        style={{
                            flex: '1',
                            height: '100px'
                        }}
                    />  
                    <Button type='submit' variant="contained" color="success" startIcon={<SendToMobileIcon />}>
                        Registra nuova posizione
                    </Button>                          
                </Box>
            </ViewContent>            
        </Content>
    );
}