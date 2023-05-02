import * as React from 'react';
//import reducers
import { useAppSelector } from '../../../redux/hooks/useAppSelector';
<<<<<<< HEAD
import { Content, ViewContent, ListNotifications } from "./styles";
=======
import { Content, ViewContent } from "./styles";
>>>>>>> c415e8aca664a869c148a9d52dfce3b6b3bf6b24
//import components
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
<<<<<<< HEAD
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import SendToMobileIcon from '@mui/icons-material/SendToMobile';
import MovingIcon from '@mui/icons-material/Moving';
//import service
import * as NotificationService from '../../../services/notifications';
import { Notification } from '../../../types/Notification';
import { useNavigate } from 'react-router-dom';
import { Alert } from '../../alert';
=======
import SendToMobileIcon from '@mui/icons-material/SendToMobile';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
//import service
import * as NotificationService from '../../../services/notifications';
>>>>>>> c415e8aca664a869c148a9d52dfce3b6b3bf6b24

export const Notifications = () => {  

  const user = useAppSelector(state=>state.user);
<<<<<<< HEAD
  const system = useAppSelector(state=>state.system);
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);
  const [key,setKey] = React.useState(0);
  const [notifications,setNotifications] = React.useState<Notification[]>([]);
  const [loadNotifications,setLoadNotifications] = React.useState(false);
  const [reload,setReload] = React.useState(false);
  const [showAlert,setShowAlert] = React.useState(false);
  const [variant,setVariant] = React.useState('');
  const [message,setMessage] = React.useState('');

  React.useEffect(()=>{
    const getNotifications = async () => {
        setNotifications(await NotificationService.getLastNotifications());
    }
    getNotifications();
  },[reload])

  React.useEffect(()=>{
    if (notifications.length > 0) {
        setLoadNotifications(true);
    }
  },[notifications])


=======
  const [open, setOpen] = React.useState(false);
  const [key,setKey] = React.useState(0);
>>>>>>> c415e8aca664a869c148a9d52dfce3b6b3bf6b24

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setOpen(true);
      const data = new FormData(e.currentTarget);
      const title = data.get('title') as string;
      const message = data.get('message') as string;
      const date = new Date();

      if (title != '' && message != '') {
          await NotificationService.newNotification(title,message,user.name,user.id,date);
<<<<<<< HEAD
          setVariant('success');
          if (system.language[system.current] === 'italian') {
              setMessage('Avviso inviato!');
          } else if (system.language[system.current] === 'english') {
              setMessage('Notification sent!');
          } else if (system.language[system.current] === 'german') {
              setMessage('Benachrichtigung gesendet!');
          }                
          setShowAlert(true);
          setTimeout(()=>{
            setShowAlert(false);
          },6000); 
          setReload(!reload);
          setLoadNotifications(false);
=======
>>>>>>> c415e8aca664a869c148a9d52dfce3b6b3bf6b24
          setKey(key+1);
          setOpen(false);
      }
  }

  return(
    <Content>
<<<<<<< HEAD
        {showAlert &&
            Alert(variant,message)
        }
=======
>>>>>>> c415e8aca664a869c148a9d52dfce3b6b3bf6b24
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open}
        >
          <CircularProgress color="inherit" /> Posizione di registrazione...
        </Backdrop>
        <ViewContent>
            <Box
                key={key}
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
                    label="Titolo"
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
                    Invia nuova notifica
                </Button>                          
            </Box>
<<<<<<< HEAD
            <ListNotifications>
                <h4>
                    {system.language[system.current] === 'italian' ? 'Ultime notifiche inviate' : null}
                    {system.language[system.current] === 'english' ? 'Latest notifications sent' : null}
                    {system.language[system.current] === 'german' ? 'Neueste benachrichtigungen gesendet' : null}
                </h4>
                {!loadNotifications &&
                    <CircularProgress className='circular' />
                }
                {loadNotifications &&
                    notifications.map((item, index)=>(
                        <div className="not-item">
                            <div className="data">
                                <p className='data-title'>{item.title}</p>
                                <p className='data-message'>{item.message}</p>
                                <p className='data-author'>{item.author}</p>
                                <span className="data-icons">
                                    <MovingIcon />{item.sendingTokens.length}
                                </span>                                                                
                            </div>
                            <SendToMobileIcon className='resend' onClick={async ()=>{
                                await NotificationService.resendNotification(item.title,item.message);
                                setVariant('success');
                                if (system.language[system.current] === 'italian') {
                                    setMessage('La notifica selezionata è stata reinviata!');
                                } else if (system.language[system.current] === 'english') {
                                    setMessage('The selected notification has been resent!');
                                } else if (system.language[system.current] === 'german') {
                                    setMessage('Die ausgewählte Benachrichtigung wurde erneut gesendet!');
                                }                
                                setShowAlert(true);
                                setTimeout(()=>{
                                  setShowAlert(false);
                                },6000); 
                            }} />
                        </div>
                    ))
                }
            </ListNotifications> 
        </ViewContent> 
                 
=======
        </ViewContent>            
>>>>>>> c415e8aca664a869c148a9d52dfce3b6b3bf6b24
    </Content>
  );
}
