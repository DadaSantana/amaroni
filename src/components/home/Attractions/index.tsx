//import React
import * as React from 'react';
//import reducers 
import { useAppSelector } from '../../../redux/hooks/useAppSelector';
//import styles
import { Content, AttractionItem } from './styles';
import { Container } from 'react-bootstrap';
//import swiper component
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, A11y } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
//get service and type
import * as AttractionService from '../../../services/attractions';
import { Attraction } from '../../../types/Attraction';
//import icons
import ClearAllIcon from '@mui/icons-material/ClearAll';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import ParkIcon from '@mui/icons-material/Park';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import PublicIcon from '@mui/icons-material/Public';
import ChurchIcon from '@mui/icons-material/Church';
//import components
import Rating from '@mui/material/Rating';
import { Link } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export const Attractions = () => {
    const system = useAppSelector(state => state.system);
    const windowSize = React.useRef([window.innerWidth, window.innerHeight]);
    console.log(windowSize)

    const [state, setState] = React.useState(false);
    const [att, setAtt] = React.useState<Attraction[]>([]);
    const [type, setType] = React.useState('all');

    React.useEffect(()=>{
        if (type != 'all') {
            const getAtt = async () => {
                setState(true);
                setAtt(await AttractionService.getAttByType(type));
                setState(false);
            } 
            getAtt();
        } else {
            const getAtt = async () => {
                setState(true);
                setAtt(await AttractionService.getAll());
                setState(false);
            } 
            getAtt();
        }
    }, [type]);

    const handleSetType = (t: string) => {
        setType(t);
    }
    return(
        <Content>
            <Container>
                <div className="title-content">
                    <h1>
                        {system.language[system.current] == 'italian' ? 'Attrazione' : null}
                        {system.language[system.current] == 'english' ? 'Attractions' : null}
                        {system.language[system.current] == 'german' ? 'Attraktion' : null}
                    </h1>
                    <div className='title-bar'>
                        <span className="circle"></span>
                        <span className="circle"></span>
                        <span className="circle"></span>
                    </div>
                </div>
                <div className="filter-per-type">
                    <span 
                        className={type == 'all' ? 'type all active' : 'type all'} 
                        onClick={()=>{handleSetType('all')}}
                    >
                        <ClearAllIcon />
                        <label>
                            {system.language[system.current] == 'italian' ? 'Tutto' : null}
                            {system.language[system.current] == 'english' ? 'All' : null}
                            {system.language[system.current] == 'german' ? 'Alle' : null}
                        </label>
                    </span>
                    <span 
                        className={type == 'Food' ? 'type food active' : 'type food'} 
                        onClick={()=>{handleSetType('Food')}}
                    >
                        <RestaurantIcon />
                        <label>
                            {system.language[system.current] == 'italian' ? 'Cibo' : null}
                            {system.language[system.current] == 'english' ? 'Food' : null}
                            {system.language[system.current] == 'german' ? 'Essen' : null}
                        </label>
                    </span>
                    <span 
                        className={type == 'Square' ? 'type food square' : 'type square'} 
                        onClick={()=>{handleSetType('Square')}}
                    >
                        <ParkIcon />
                        <label>
                            {system.language[system.current] == 'italian' ? 'Piazza' : null}
                            {system.language[system.current] == 'english' ? 'Square' : null}
                            {system.language[system.current] == 'german' ? 'Quadrat' : null}
                        </label>
                    </span>
                    <span 
                        className={type == 'Marketplace' ? 'type marketplace active' : 'type marketplace'} 
                        onClick={()=>{handleSetType('Marketplace')}}
                    >
                        <LocalGroceryStoreIcon />
                        <label>
                            {system.language[system.current] == 'italian' ? 'Mercato' : null}
                            {system.language[system.current] == 'english' ? 'Marketplace' : null}
                            {system.language[system.current] == 'german' ? 'Marktplatz' : null}
                        </label>
                    </span>
                    <span 
                        className={type == 'Health' ? 'type health active' : 'type health'} 
                        onClick={()=>{handleSetType('Health')}}
                    >
                        <LocalHospitalIcon />
                        <label>
                            {system.language[system.current] == 'italian' ? 'Salute' : null}
                            {system.language[system.current] == 'english' ? 'Health' : null}
                            {system.language[system.current] == 'german' ? 'Gesundheit' : null}
                        </label>
                    </span>
                    <span 
                        className={type == 'Workshop' ? 'type workshop active' : 'type workshop'} 
                        onClick={()=>{handleSetType('Workshop')}}
                    >
                        <HomeRepairServiceIcon />
                        <label>
                            {system.language[system.current] == 'italian' ? 'Officina' : null}
                            {system.language[system.current] == 'english' ? 'Workshop' : null}
                            {system.language[system.current] == 'german' ? 'Werkstatt' : null}
                        </label>
                    </span>
                    <span 
                        className={type == 'Church' ? 'type church active' : 'type church'} 
                        onClick={()=>{handleSetType('Church')}}
                    >
                        <ChurchIcon />
                        <label>
                            {system.language[system.current] == 'italian' ? 'Chiesa' : null}
                            {system.language[system.current] == 'english' ? 'Church' : null}
                            {system.language[system.current] == 'german' ? 'Kirche' : null} 
                        </label>
                    </span>
                    <span 
                        className={type == 'Public Place' ? 'type public active' : 'type public'} 
                        onClick={()=>{handleSetType('Public Place')}}
                    >
                        <PublicIcon />
                        <label>
                            {system.language[system.current] == 'italian' ? 'Luogo pubblico' : null}
                            {system.language[system.current] == 'english' ? 'Public Place' : null}
                            {system.language[system.current] == 'german' ? 'öffentlicher Platz' : null} 
                        </label>
                    </span>
                </div>
                <p className="description">
                    {system.language[system.current] == 'italian' ? 'Selezionare un tipo per definire un filtro.' : null}
                    {system.language[system.current] == 'english' ? 'Select a type to define a filter.e' : null}
                    {system.language[system.current] == 'german' ? 'Wählen Sie einen Typ aus, um einen Filter zu definieren.' : null} 
                </p>
                <Swiper
                // install Swiper modules
                modules={[Navigation, Autoplay, A11y]}
                spaceBetween={30}
                slidesPerView={
                    windowSize.current[0] <= 480 ? 1 : 
                    windowSize.current[0] > 480 && windowSize.current[0] < 860 ? 2 : 3
                }
                autoplay={{
                    delay: 2000,
                    disableOnInteraction: true,
                }}
                navigation
                pagination={{ clickable: true }}
                >
                    {state &&
                    <>
                    <Box className="circular-progress" sx={{ display: 'flex' }}>
                        <CircularProgress />
                    </Box>
                    </>
                    }
                    {!state &&
                    att.map((item, index)=>(
                        <SwiperSlide className='slide-item'>
                            <AttractionItem key={index}>
                                <div 
                                    className='att-background'
                                    style={{
                                        background: `url('${item.imageUrl}')`,
                                        backgroundPosition: 'center',
                                        backgroundSize: 'cover'
                                    }}
                                >
                                    <span className='att-type'>
                                        <ChurchIcon />
                                        <label className='type-name'>{item.type}</label>
                                    </span>
                                </div>
                                <div className='att-bottom'>
                                    <div>
                                        <label className='att-name'>{item.name}</label>
                                    </div> 
                                    <Rating name="read-only" value={2} readOnly />                                   
                                    <span className='view-more'>
                                        <Link to={`attraction/${item.id}`}>
                                            {system.language[system.current] == 'italian' ? 'Visualizza di più' : null}
                                            {system.language[system.current] == 'english' ? 'View more' : null}
                                            {system.language[system.current] == 'german' ? 'Mehr sehen' : null}
                                        </Link>
                                    </span>
                                </div>                    
                            </AttractionItem>
                        </SwiperSlide>                        
                    ))
                    }
                </Swiper>   
            </Container>
        </Content>
    );
}

