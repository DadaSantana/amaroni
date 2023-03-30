import * as React from 'react';
//impor reducers from redux
import { useAppSelector } from '../../../redux/hooks/useAppSelector';
import { Container } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
//import swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import { Content } from './styles';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import DescriptionIcon from '@mui/icons-material/Description';
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap';
import { Events } from '../../home/Events';

import one from '../../../assets/images/Covid_Banner.jpg';

import * as Annuncios from '../../../services/annuncios';
import { Annuncio } from '../../../types/Annuncio';

//import components
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { GalleryContent, GalleryFloat } from '../../GalleryPath';
import { Links } from '../../Links';

export const EventDetails = () => {
    const system = useAppSelector(state => state.system);
    //Backdrop
    const [open, setOpen] = React.useState(true);
    const handleClose = () => {
        setOpen(!open);
    };

    const [upload,setUpload] = React.useState(false);
    const [attPhotos,setAttPhotos] = React.useState<any[]>([]);
    const [floatImage,setFloatImage] = React.useState('');

    const handlePhotoClick = (e: string) => {
        setFloatImage(e);
    }

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
            {open &&
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
            >
            <CircularProgress color="inherit" />
            </Backdrop>
            }
            {!open &&
            <>
            <Container>
                <section className="main-presentation">
                    <div className="main-details">
                        <h1>{title}</h1>
                        <div className="description-box">
                            <div className="d-b-header">
                                <DescriptionIcon />
                                <label>Attraction Description:</label>
                            </div>
                            <p className='description-window'>{desc}</p>
                        </div>
                        <span className='icon-data'>
                            <a>
                                <FmdGoodIcon />
                            </a>                    
                            <label>{address}</label>
                        </span>
                        {tel != '' &&
                        <span className='icon-data'>
                            <a href={`tel:${tel}`}>
                                <LocalPhoneIcon />
                            </a>
                            <label>{tel}</label>
                        </span>
                        }
                        {dateStart != '' &&
                        <span className='icon-data'>
                            <a>
                                <EventAvailableIcon />
                            </a>
                            <label>{dateStart} - {timeStart != '' ? timeStart : null}</label>
                        </span>
                        }
                        {dateEnd != '' &&
                        <span className='icon-data'>
                            <a>
                                <EventAvailableIcon />
                            </a>
                            <label>{dateEnd} - {timeEnd != '' ? timeEnd : null}</label>
                        </span>
                        }                        
                    </div>
                    <img src={image} alt="" />
                    <div className="description-box mobile">
                            <div className="d-b-header">
                                <DescriptionIcon />
                                <label>Attraction Description:</label>
                            </div>
                            <p>{desc}</p>
                        </div>
                </section>
                <GalleryContent path='events' id={eventId} />   
                <Links vetor={links} />                      
            </Container>
            </>
            }
            <Link to='/'>
                {system.language[system.current] == 'italian' ? 'Torna alla pagina principale' : null}
                {system.language[system.current] == 'english' ? 'Back to main page' : null}
                {system.language[system.current] == 'german' ? 'Zurück zur Hauptseite' : null}
            </Link>
        </Content>
    );
}