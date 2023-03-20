//import react
import * as React from 'react';
//import styles
import { Content } from "./styles";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
//get service and type
import * as ServiceGallery from '../../services/gallery';
import { Gallery as TypeGallery } from '../../types/Gallery';
//import components
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper";


export const GalleryContent = () => {
    const [gallery, setGallery] = React.useState<TypeGallery[]>([]);
    //Backdrop
    const [open, setOpen] = React.useState(true);
    //get all images from gallery
    React.useEffect(()=>{
        const getImagesFromGallery = async () => {
            setGallery(await ServiceGallery.getAll());
        } 
        getImagesFromGallery();
    }, []);

    React.useEffect(()=>{
        if (gallery.length > 0) {
            setOpen(false);
        }        
    }, [gallery]);

    const [thumbsSwiper, setThumbsSwiper] = React.useState<any>(null);

    React.useEffect(()=>{
        console.log(thumbsSwiper);
    },[thumbsSwiper])

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
            <Swiper
                onSlideChange={() => console.log(thumbsSwiper)}
                loop={false}
                spaceBetween={10}
                navigation={true}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper2"
            >
                {gallery.map((item, index)=>(
                    <SwiperSlide
                        className='slide-item'
                        style={{
                            background: `url('${item.imageUrl}') center center / cover no-repeat`
                        }}
                    />
                ))}                
            </Swiper>
            <Swiper
                direction={"vertical"}
                onSwiper={setThumbsSwiper}
                loop={false}
                spaceBetween={10}
                slidesPerView={3}
                freeMode={false}
                watchSlidesProgress={true}
                modules={[FreeMode, Thumbs]}
                className="select-image-gallery"
            >
                {gallery.map((item, index)=>(
                    <SwiperSlide>
                        <img src={item.imageUrl} alt="" />
                    </SwiperSlide>
                ))}
            </Swiper>
            
            </>
            }
               
        </Content>
    );
}
