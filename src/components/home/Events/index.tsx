import * as React from 'react';
import { useAppSelector } from '../../../redux/hooks/useAppSelector';
import { Link } from "react-router-dom";

import { Container } from 'react-bootstrap';
import { Content } from './styles';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, A11y } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import one from '../../../assets/images/Covid_Banner.jpg';
import three from '../../../assets/images/Carnaval.jpg';

import * as Annuncios from '../../../services/annuncios';
import { Annuncio } from '../../../types/Annuncio';

export const Events = () => {
    const system = useAppSelector(state => state.system);
    const [ann, setAnn] = React.useState<Annuncio[]>([]);

    React.useEffect(()=>{
        const getAnn = async () => {
            setAnn(await Annuncios.getAll());
        } 
        getAnn();
    }, []); 
    return(
        <Content>     
            <Container>
                <div className="title-content">
                    <h1>
                        {system.language[system.current] == 'italian' ? 'Annunci' : null}
                        {system.language[system.current] == 'english' ? 'Adverts' : null}
                        {system.language[system.current] == 'german' ? 'Anzeigen' : null}
                    </h1>
                    <div className='title-bar'>
                        <span className="circle"></span>
                        <span className="circle"></span>
                        <span className="circle"></span>
                    </div>
                </div>
                <Swiper
                // install Swiper modules
                className='slide-swiper'
                modules={[Navigation, Pagination, Autoplay, A11y]}
                spaceBetween={50}
                slidesPerView={1}
                autoplay={{
                    delay: 10000,
                    disableOnInteraction: false,
                }}
                navigation
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
                onSwiper={(swiper) => console.log(swiper)}
                onSlideChange={() => console.log('slide change')}
                >
                    {ann.map((item, index)=>(
                        <SwiperSlide 
                            className='slide-item' 
                            style={{
                                background: `url('${item.imageUrl}')`,
                                backgroundPosition: 'center',
                                backgroundSize: 'cover'
                            }}>
                            <div className="event-details">
                                <Link to={`event/${item.id}`}>{item.name}</Link>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>   
                <p className='description'>
                    {system.language[system.current] == 'italian' ? 'Guarda le nostre principali notizie ed eventi nella diapositiva in alto.' : null}
                    {system.language[system.current] == 'english' ? 'See our main news and events on the slide above.' : null}
                    {system.language[system.current] == 'german' ? 'Sehen Sie unsere wichtigsten Neuigkeiten und Veranstaltungen auf der Folie oben.' : null}
                </p>
            </Container>
                             
        </Content>
    );

}