import * as React from 'react';
import { useAppSelector } from '../../redux/hooks/useAppSelector';
import { Content, Float } from './styles';
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import { FreeMode, Navigation, Thumbs, Controller } from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { Photo } from '../../types/Photo';
//import service
import { getPhotoStorage } from '../../services/photos';
import { Container } from 'react-bootstrap';
import CloseIcon from '@mui/icons-material/Close';
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap';
import CircularProgress from '@mui/material/CircularProgress';

type Props = {
    path: string,
    id?: string | undefined,
    float?: boolean,
    fn?: (state: boolean) => void,
    controlled?: any
}

export const GalleryFloat = ({path, id, float, fn, controlled}:Props) => {
    const windowSize = React.useRef([window.innerWidth, window.innerHeight]);
    const [gallery,setGallery] = React.useState<Photo[]>([]);
    const [thumbsSwiper, setThumbsSwiper] = React.useState<any>(null);

    React.useEffect(()=>{
        if (windowSize.current[0] <= 760) {
            setMobile(true);
        } else {
            setMobile(false);
        }
    },[])

    const [mobile,setMobile] = React.useState(false);

    window.addEventListener("resize", (event: any) => {
        if (event != null) {
            const width = event.target.innerWidth;
            if (width <= 760) {
                setMobile(true);
            } else {
                setMobile(false);
            }
        }
    });

    React.useEffect(()=>{
        const getGallery = async () => {
            console.log(id);
            if (id != undefined) {
                setGallery(await getPhotoStorage(`${path}/${id}`));
                console.log(path)
            } else {
                setGallery(await getPhotoStorage(`${path}`));
                console.log(path)
            }            
        } 
        getGallery();
    },[]);

    React.useEffect(()=>{
        if (gallery.length > 0) {

        }
    },[gallery]);

    return(
        <Content>
            {float &&
                <Float>
                    <Container>
                        <span className='close-float'>
                            <CloseIcon onClick={()=>{
                                if (fn != undefined) {
                                    fn(false);
                                    setThumbsSwiper(null);
                                }
                            }} />
                        </span>
                        
                        <Swiper
                            initialSlide={controlled}
                            slidesPerView={1}
                            loop={true}
                            spaceBetween={10}
                            navigation={true}
                            thumbs={{ swiper: thumbsSwiper }}
                            modules={[FreeMode, Navigation, Thumbs]}
                            className="swiper-gallery"
                        >
                            {gallery.map((item, index)=>(
                                <SwiperSlide
                                    className='slide-item'
                                    style={{
                                        background: `url('${item.url}') center center / contain no-repeat`
                                    }}
                                />
                            ))}                
                        </Swiper>
                        <Swiper
                            direction='horizontal'
                            onSwiper={setThumbsSwiper}
                            loop={true}
                            spaceBetween={30}
                            slidesPerView='auto'
                            watchSlidesProgress={true}
                            modules={[FreeMode, Thumbs]}
                            className="select-image-gallery"
                        >
                            {gallery.map((item, index)=>(
                                <SwiperSlide>
                                    <img src={item.url} alt="" />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </Container>                       
                </Float>
            }            
        </Content>
    );
}

export const GalleryContent = ({path, id}:Props) => {
    const system = useAppSelector(state=>state.system);
    const windowSize = React.useRef([window.innerWidth, window.innerHeight]);
    const [thumbsSwiper, setThumbsSwiper] = React.useState<any>(null);
    const [gallery,setGallery] = React.useState<Photo[]>([]);
    const [float,setFloat] = React.useState(false);
    const [controlledSwiper, setControlledSwiper] = React.useState(0);
    const [loading,setLoading] = React.useState(true);

    React.useEffect(()=>{
        if (windowSize.current[0] <= 760) {
            setMobile(true);
        } else {
            setMobile(false);
        }
    },[])

    const [mobile,setMobile] = React.useState(false);

    window.addEventListener("resize", (event: any) => {
        if (event != null) {
            const width = event.target.innerWidth;
            if (width <= 760) {
                setMobile(true);
            } else {
                setMobile(false);
            }
        }
    });

    React.useEffect(()=>{
        const getGallery = async () => {
            if (id != undefined) {
                setGallery(await getPhotoStorage(`${path}/${id}`));
            } else {
                setGallery(await getPhotoStorage(`${path}`));
            }
            
        } 
        getGallery();
    },[]);

    React.useEffect(()=>{
        if (gallery.length > 0) {
            setLoading(false);
        } else {
            setLoading(false);
        }
    },[gallery]);

    const handleController = (n: number) => {
        setControlledSwiper(n);
        setFloat(true);
    }

    const handleClose = (state: boolean) => {
        setFloat(state);
        setControlledSwiper(0);
    }

    return(
        <Content className='gallery-content'>
            <h2>
                {system.language[system.current] == 'italian' ? 'Fotografie' : null}
                {system.language[system.current] == 'english' ? 'Photos' : null}
                {system.language[system.current] == 'german' ? 'Fotos' : null}
            </h2>
            {loading &&
            <CircularProgress />
            }
            {!loading && gallery.length > 0 &&            
            <Swiper
                direction='horizontal'   
                navigation           
                loop={true}
                slidesPerView='auto'
                spaceBetween={30}
                freeMode={false}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation]}
                className="select-image-gallery"
            >
                {gallery.map((item, index)=>(
                    <SwiperSlide 
                        className='slide-preview'
                        onClick={()=>{handleController(index)}}
                        style={{
                            background: `url('${item.url}') center center / cover no-repeat`
                        }}
                    >
                        <span>
                            <ZoomOutMapIcon />
                        </span>
                    </SwiperSlide>
                ))}
            </Swiper> 
            }  
            {!loading && gallery.length == 0 &&
            <p>
                {system.language[system.current] == 'italian' ? 'Nessuna immagine trovata' : null}
                {system.language[system.current] == 'english' ? 'No image found' : null}
                {system.language[system.current] == 'german' ? 'Kein Bild gefunden' : null}
            </p>
            }           
            <GalleryFloat path={path} id={id} float={float} fn={handleClose} controlled={controlledSwiper} />               
        </Content>
    );
}