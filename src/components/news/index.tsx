import * as React from 'react';
//impor reducers from redux
import { useAppSelector } from '../../redux/hooks/useAppSelector';
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

import one from '../../../assets/images/Covid_Banner.jpg';

import * as ServiceNews from '../../services/news';
import { News } from '../../types/news';

//import components
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { GalleryContent } from '../GalleryPath';

export const NewsDetails = () => {
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

    const { newsid } = useParams();
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
    const [news, setNews] = React.useState<News[]>([]); 
    React.useEffect(()=>{        
        const getNews = async () => {            
            setNews(await ServiceNews.getEventById(newsid));                   
        }         
        getNews();
    }, [newsid]); 

    React.useEffect(()=>{ 
        if (news.length > 0) {
            setImage(news[0].imageUrl);
            setTitle(news[0].name);
            setDesc(news[0].description);
            setTel(news[0].telephone);
            setAddress(news[0].address);
            setEmail(news[0].email);
            setOpen(false);
        }
    }, [news]); 
    
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
                                <label>
                                    {system.language[system.current] ==  'italian' ? 'Descrizione' : null}
                                    {system.language[system.current] ==  'english' ? 'Description' : null}
                                    {system.language[system.current] ==  'german' ? 'Beschreibung' : null}
                                </label>
                            </div>
                            <textarea className='description-window' name="description" readOnly>{desc}</textarea>
                        </div>
                        {address != '' &&
                        <span className='icon-data'>
                            <a>
                                <FmdGoodIcon />
                            </a>                    
                            <label>{address}</label>
                        </span>
                        }
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
                                <label>
                                    {system.language[system.current] ==  'italian' ? 'Descrizione' : null}
                                    {system.language[system.current] ==  'english' ? 'Description' : null}
                                    {system.language[system.current] ==  'german' ? 'Beschreibung' : null}
                                </label>
                            </div>
                            <textarea name="description">{desc}</textarea>
                        </div>
                </section>   
                <GalleryContent path='news' id={newsid} />
            </Container>
            </>
            }
            <Link to='/palazzo'>
                {system.language[system.current] == 'italian' ? 'torna alla pagina precedente' : null}
                {system.language[system.current] == 'english' ? 'Back to previous page' : null}
                {system.language[system.current] == 'german' ? 'Zurück zur vorherigen Seite' : null}
            </Link>
        </Content>
    );
}