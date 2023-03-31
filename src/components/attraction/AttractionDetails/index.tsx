import * as React from 'react';
//import reducers from redux
import { useAppSelector } from '../../../redux/hooks/useAppSelector';
import { Container } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';

import { Content, FloatPhoto } from './styles';
//import swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
//import types and services
import * as Attractions from '../../../services/attractions';
import { Attraction } from '../../../types/Attraction';
import * as RatingService from '../../../services/ratings';

//import components
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Rating from '@mui/material/Rating';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
//import icons
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import DescriptionIcon from '@mui/icons-material/Description';
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap';
import ZoomInMapIcon from '@mui/icons-material/ZoomInMap';
import PublicIcon from '@mui/icons-material/Public';

import { render } from '@testing-library/react';
import ReactDOM from 'react-dom';
import { RateAndComment } from './RateAndComment';
import { GalleryContent } from '../../GalleryPath';
import { createNonNullExpression } from 'typescript';

export const AttractionDetails = () => {
    const system = useAppSelector(state => state.system);
    const { isLoaded } = useLoadScript({ googleMapsApiKey: "AIzaSyCuYb09NVdhj70cCO_dQsLIid6nyzeOm-s", })
    //Backdrop
    const [open, setOpen] = React.useState(true);
    const handleClose = () => {
        setOpen(!open);
    };

    const { attractionId } = useParams();
    const [upload,setUpload] = React.useState(false);
    const [attFinished,setAttFinished] = React.useState(false);
    const [attPhotoQtd,setAttPhotoQtd] = React.useState(0);
    const [attPhotoStarted,setAttPhotoStarted] = React.useState(false);
    const [attPhotoFinished,setAttPhotoFinished] = React.useState(false);
    const [stateFinished,setStateFinished] = React.useState(false);

    const [image,setImage] = React.useState('');
    const [title,setTitle] = React.useState('');
    const [type,setType] = React.useState('');
    const [rating,setRating] = React.useState(0);
    const [address,setAddress] = React.useState('');
    const [description,setDescription] = React.useState('');
    const [telephone,setTelephone] = React.useState('');
    const [website,setWebsite] = React.useState('');
    const [latitude,setLatitude] = React.useState(0);
    const [longitude,setLongitude] = React.useState(0);

    //Get all attractions from firebase
    const [att, setAtt] = React.useState<Attraction[]>([]); 
    const [attPhotos,setAttPhotos] = React.useState<any[]>([]);
    React.useEffect(()=>{
        const getAtt = async () => { 
            if (attFinished === false) {
                setAtt(await Attractions.getAttById(attractionId));
                setRating(await RatingService.getRatingAvarage(attractionId));
            }            
        }
        const getAttPhotos = async () => { 
            if (attPhotoFinished === false) {
                setAttPhotoQtd(await Attractions.getQtdAttPhotos(attractionId));

                setAttPhotos(await Attractions.getAttPhotos(attractionId));
                setStateFinished(!stateFinished);
            }            
        }

        if (att.length === 0) {
            getAtt();
        } else if (!attFinished) {
            setImage(att[0].imageUrl);
            setTitle(att[0].name);
            setType(att[0].type);
            setAddress(att[0].address);
            setDescription(att[0].description);
            setTelephone(att[0].tel);
            setWebsite(att[0].website);
            setLatitude(att[0].latitude);
            setLongitude(att[0].longitude);
            setAttFinished(true);
        }   

        if (!attPhotoStarted) {
            getAttPhotos();
            setAttPhotoStarted(true);
        } else if(attPhotos.length === attPhotoQtd) {
            setUpload(true);
            setOpen(false);
            setAttPhotoFinished(true);
        } else {
            setStateFinished(!stateFinished);
        }
    }, [stateFinished]); 
    const [value, setValue] = React.useState<number | null>(2);
    const [floatImage,setFloatImage] = React.useState('');
    const [floatWindow,setFloatWindow] = React.useState(false);

    const handlePhotoClick = (e: string) => {
        setFloatImage(e);
    }

    const handleCloseFullscreen = () => {
        setFloatWindow(false);
        setFloatImage('');
    }
    
    React.useEffect(()=>{
        if (floatImage != '') {
            setFloatWindow(true);
        }        
    },[floatImage]);

    return(
        <Content>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
            {floatWindow &&
            <FloatPhoto>
                <img src={floatImage} alt="" />
                <span onClick={handleCloseFullscreen}>
                    <ZoomInMapIcon />
                    Exit fullscreen
                </span>
            </FloatPhoto>
            }

            {!open &&
            <Container>
                <section className="main-presentation">
                    <div className="main-details">
                        <h1>{title}</h1>
                        <div className="flex-between">                            
                            <Rating className='rating' name="read-only" value={rating} readOnly />        
                            <span className="type-att">{type}</span>                    
                        </div>
                        {address != '' &&
                        <span className='icon-data'>
                            <a>
                                <FmdGoodIcon />
                            </a>                    
                            <label>{address}</label>
                        </span>
                        }
                        {telephone != '' &&
                        <span className='icon-data'>
                            <a href={`tel:${telephone}`}>
                                <LocalPhoneIcon />
                            </a>
                            <label>{telephone}</label>
                        </span>
                        }
                        {website != '' &&
                        <span className='icon-data'>
                            <a href={`https://${website}`} target='_blank'>
                                <PublicIcon />
                            </a>
                            <label>{website}</label>
                        </span>
                        }                        
                        <div className="description-box">
                            <div className="d-b-header">
                                <DescriptionIcon />
                                <label>
                                    {system.language[system.current] ==  'italian' ? 'Descrizione' : null}
                                    {system.language[system.current] ==  'english' ? 'Description' : null}
                                    {system.language[system.current] ==  'german' ? 'Beschreibung' : null}
                                </label>
                            </div>
                            <p className='description-window'>{description}</p>
                        </div>                       
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
                        <p>{description}</p>
                    </div>
                </section>
                <GalleryContent path='attractions' id={attractionId} />
                {!isLoaded &&
                    <div>Loading...</div>
                }
                {isLoaded &&
                <>
                    <GoogleMap 
                    zoom={18} 
                    center={{lat: latitude, lng: longitude}}
                    mapContainerStyle={{flex: 1, minHeight: '300px'}}

                    >
                        <Marker position={{lat: latitude, lng: longitude}}/>
                    </GoogleMap>
                </>
                }
                <RateAndComment id={attractionId} />
                <Link to='/'>
                    {system.language[system.current] == 'italian' ? 'Torna alla pagina principale' : null}
                    {system.language[system.current] == 'english' ? 'Back to main page' : null}
                    {system.language[system.current] == 'german' ? 'Zurück zur Hauptseite' : null}
                </Link>
            </Container>
            }
        </Content>
    );
}