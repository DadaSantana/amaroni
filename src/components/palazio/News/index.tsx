//import react
import * as React from 'react';
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
import { Photo } from '../../../types/Photo';
//import services
import * as PhotoService from '../../../services/photos';

export const News = () => {
    const [news,setNews] = React.useState<Photo[]>([]);
    const [loading,setLoading] = React.useState(true);

    React.useEffect(()=>{
        const getNewsImages = async () => {
            setNews(await PhotoService.getNews());
            
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
            pagination={{ clickable: true }}
            spaceBetween={50}
            slidesPerView={1}
            >
                {news.map((item,index)=>(
                    <SwiperSlide style={{background: `url('${item.url}') center center / cover no-repeat`}} />
                ))}
                
            </Swiper>
            }

        </Content>
    );
}