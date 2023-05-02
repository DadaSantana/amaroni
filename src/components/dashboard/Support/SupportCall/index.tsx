//import react
import * as React from 'react';
//import reducers from redux
import { useAppSelector } from '../../../../redux/hooks/useAppSelector';
//import styles
import { Content } from './styles';
//import components
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
//import types and services
import * as SupportService from '../../../../services/support';
import { Support } from '../../../../types/Support';
import * as PhotoService from '../../../../services/photos';
//import components
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
//import icons
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';

type Props = {
    fn: () => void;
}

export const SupportCall = ({fn}: Props) => {
    const user = useAppSelector(state => state.user);
    const system = useAppSelector(state => state.system);
    //Backdrop
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(!open);
    };

    const [formKey,setFormKey] = React.useState(0);

    const handleRegisterCall = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setOpen(true);

        const formData = new FormData(e.currentTarget);
        const file = formData.get('attach-file') as File;

        const now = new Date();
        const day = now.getDate();
        const month = now.getMonth() + 1;
        const year = now.getFullYear();
        let date = (day+'/'+month+"/"+year);
        
        const subject = formData.get('subject') as string;
        const request = formData.get('request') as string;

        const supportId = await SupportService.newSupport(subject, request, date, user.id, user.name, 'Registered Call', false);

        if(file && file.size > 0) {
            let result: any = await PhotoService.newSupportImage(file, supportId);
          
            if(result instanceof Error){
              alert(`${result.name} - ${result.message}`)
            } else {
                
            }
        }
        setFormKey(formKey+1);
        setOpen(false);
    }

    return(
        <Content>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
            >
              <CircularProgress color="inherit" /> Registrazione chiamata...
            </Backdrop>
            <Box
                key={formKey}
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
                onSubmit={handleRegisterCall}
            > 
                <TextField 
                    id="standard-basic" 
                    className='subject-input'
                    name="subject"
                    label="Soggetto" 
                    variant="standard" 
                />
                <TextareaAutosize
                    className='textarea-request'
                    name='request'
                    aria-label="empty textarea"
                    placeholder="Descrivi la tua richiestat"
                    style={{ width: '100%' }}
                />
                <hr />
                <Button type='submit' variant="contained" color="success" startIcon={<ForwardToInboxIcon />}>
                    Registrazione chiamata
                </Button>
            </Box>
        </Content>
    );
}