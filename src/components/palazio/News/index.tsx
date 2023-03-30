//import react
import * as React from 'react';
import { useAppSelector } from '../../../redux/hooks/useAppSelector';
//import styles
import { Content } from "./styles";
//import MUI components
import CircularProgress from '@mui/material/CircularProgress';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
//import types
import { News as TypeNews }  from '../../../types/news';
//import services
import * as ServiceNews from '../../../services/news';
import { useNavigate } from 'react-router-dom';

export const News = () => {
    const system = useAppSelector(state=>state.system);
    const navigate = useNavigate();
    const [news,setNews] = React.useState<TypeNews[]>([]);
    const [loading,setLoading] = React.useState(true);

    React.useEffect(()=>{
        const getNewsImages = async () => {
            setNews(await ServiceNews.getAll()); 
        }
        getNewsImages();
    },[]);
    React.useEffect(()=>{
        if (news.length > 0) {
            setLoading(false);
        }
    },[news])

    return(
        <Content>
            {loading &&
            <CircularProgress />
            }
            {!loading &&
            <Swiper
            id="slide-news"
            modules={[Navigation, Pagination]}
            navigation
            loop={true}
            pagination={{ clickable: true }}
            spaceBetween={50}
            slidesPerView={1}
            >
                {news.map((item,index)=>(
                    <SwiperSlide 
                        className='news-item'
                        style={{background: `url('${item.imageUrl}') center center / cover no-repeat`}}
                        onClick={()=>{navigate(`/palazzo/news/${item.id}`)}}
                    >
                        <h4>
                            {system.language[system.current] == 'italian' ? 'Ultimi Aggiornamenti' : null}
                            {system.language[system.current] == 'english' ? 'Latest updates' : null}
                            {system.language[system.current] == 'german' ? 'Letzte Aktualisierung' : null}
                        </h4>
                        <span>
                            <a href={`/palazzo/news/${item.id}`}>{item.name}</a>
                        </span>
                    </SwiperSlide>
                ))}
                
            </Swiper>
            }

        </Content>
    );
}