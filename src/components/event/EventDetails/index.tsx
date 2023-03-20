import * as React from 'react';
//impor reducers from redux
import { useAppSelector } from '../../../redux/hooks/useAppSelector';
import { Container } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';

import { Content } from './styles';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import { Events } from '../../home/Events';

import one from '../../../assets/images/Covid_Banner.jpg';

import * as Annuncios from '../../../services/annuncios';
import { Annuncio } from '../../../types/Annuncio';

//import components
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

export const EventDetails = () => {
    const system = useAppSelector(state => state.system);
    //Backdrop
    const [open, setOpen] = React.useState(true);
    const handleClose = () => {
        setOpen(!open);
    };

    const { eventId } = useParams();
    const [image,setImage] = React.useState('');
    const [title,setTitle] = React.useState('');
    const [desc,setDesc] = React.useState('');
    const [dateStart,setDateStart] = React.useState('');
    const [timeStart,setTimeStart] = React.useState('');
    const [dateEnd,setDateEnd] = React.useState('');
    const [timeEnd,setTimeEnd] = React.useState('');
    const [tel,setTel] = React.useState('');
    const [address,setAddress] = React.useState('');
    const [email,setEmail] = React.useState('');
    const [links,setLinks] = React.useState<any[]>([]);
    //Get all attractions from firebase
    const [ann, setAnn] = React.useState<Annuncio[]>([]); 
    React.useEffect(()=>{        
        const getAnn = async () => {            
            setAnn(await Annuncios.getEventById(eventId));                   
        }         
        getAnn();

    }, [eventId]); 

    React.useEffect(()=>{ 
        if (ann.length > 0) {
            setImage(ann[0].imageUrl);
            setTitle(ann[0].name);
            setDesc(ann[0].description);
            setDateStart(ann[0].dateStart);
            setTimeStart(ann[0].timeStart);
            setDateEnd(ann[0].dateEnd);
            setTimeEnd(ann[0].timeEnd);
            setTel(ann[0].tel);
            setAddress(ann[0].address);
            setEmail(ann[0].email);
            setLinks(ann[0].links);
            setOpen(false);
        }
    }, [ann]); 
    
    return(
        <Content>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
            {!open &&
            <>
            <div 
            className="event-banner"
            style={{
                background: `url('${image}')`,
                backgroundPosition: 'center',
                backgroundSize: 'cover'
            }}
            >                     
            </div>
            <Container>
                <div className="left-side">
                    <h1>{title}</h1>
                    <p>{desc}</p>
                    <div className="content-details">
                        {dateStart != '' && dateEnd != '' &&
                        <div className="date-hour-event">
                            {dateStart != '' &&
                            <div className="d-h-datails start">
                                <label className='event-title'>
                                    {system.language[system.current] == 'italian' ? "Inizio dell'evento" : null}
                                    {system.language[system.current] == 'english' ? 'Event Start' : null}
                                    {system.language[system.current] == 'german' ? 'Veranstaltungsbeginn' : null}
                                </label>
                                <span className='event-date'>{dateStart}</span>
                                {timeStart != '' &&
                                <span className='event-hour'>
                                    <QueryBuilderIcon />
                                    <label>{timeStart}</label>
                                </span>
                                }
                            </div>
                            }
                            {dateEnd != '' &&
                            <div className="d-h-datails finish">
                                <label className='event-title'>
                                    {system.language[system.current] == 'italian' ? "Termine dell'eventoo" : null}
                                    {system.language[system.current] == 'english' ? 'Event Finish' : null}
                                    {system.language[system.current] == 'german' ? 'Ende der Veranstaltung' : null}
                                </label>
                                <span className='event-date'>{dateEnd}</span>
                                {timeEnd != '' &&
                                <span className='event-hour'>
                                    <QueryBuilderIcon />
                                    <label>{timeEnd}</label>
                                </span>
                                }
                            </div>
                            }
                        </div>
                        }
                        
                        <div className="additional-information">
                            {address != '' && 
                            <div className='info-item'>
                                <span className='board-icon-type'>
                                    <FmdGoodIcon />
                                    <p>
                                        {system.language[system.current] == 'italian' ? "Indirizzo" : null}
                                        {system.language[system.current] == 'english' ? 'Address' : null}
                                        {system.language[system.current] == 'german' ? 'Adresse' : null}
                                    </p>
                                </span>
                                <label>{address}</label>
                            </div>
                            }
                            {tel != '' && 
                            <div className='info-item'>
                                <span className='board-icon-type'>
                                    <LocalPhoneIcon />
                                    <p>
                                        {system.language[system.current] == 'italian' ? "Numero di telefono" : null}
                                        {system.language[system.current] == 'english' ? 'Phone number' : null}
                                        {system.language[system.current] == 'german' ? 'Telefonnummer' : null}
                                    </p>
                                </span>
                                <label>{tel}</label>
                            </div>
                            }
                            {email != '' && 
                            <div className='info-item'>
                                <span className='board-icon-type'>
                                    <FmdGoodIcon />
                                    <p>
                                        {system.language[system.current] == 'italian' ? "E-mail" : null}
                                        {system.language[system.current] == 'english' ? 'Email' : null}
                                        {system.language[system.current] == 'german' ? 'Email' : null}
                                    </p>
                                </span>
                                <label>{email}</label>
                            </div>
                            }
                        </div>                        
                    </div>
                </div>
                <div className="right-side">
                    <div className="links-content">
                        <span className='links-title'>
                            <OpenInNewIcon />
                            <h3>
                                {system.language[system.current] == 'italian' ? "Link" : null}
                                {system.language[system.current] == 'english' ? 'Links' : null}
                                {system.language[system.current] == 'german' ? 'Verknüpfungen' : null}
                            </h3>
                        </span>
                        <div className='links-items'>
                            {links.map((item,index)=>(
                                <a href={item.hrefLink} target="_blank">
                                    {item.textLink}
                                </a>
                            ))}
                        </div>
                    </div>
                    {/* <div className="links-content">
                        <span className='links-title'>
                            <FileCopyIcon />
                            <h3>
                                {system.language[system.current] == 'italian' ? "File" : null}
                                {system.language[system.current] == 'english' ? 'Links' : null}
                                {system.language[system.current] == 'german' ? 'Dateien' : null}
                            </h3>
                        </span>
                        <div className='links-items'>
                            <p>
                                {system.language[system.current] == 'italian' ? "Nessun file trovato." : null}
                                {system.language[system.current] == 'english' ? 'No files found.' : null}
                                {system.language[system.current] == 'german' ? 'Keine Dateien gefunden.' : null}
                            </p>
                        </div>
                    </div> */}
                </div>
            </Container>
            <Link to='/'>
                {system.language[system.current] == 'italian' ? 'Torna alla pagina principale' : null}
                {system.language[system.current] == 'english' ? 'Back to main page' : null}
                {system.language[system.current] == 'german' ? 'Zurück zur Hauptseite' : null}
            </Link>
            </>
            
            }
            
        </Content>
    );
}