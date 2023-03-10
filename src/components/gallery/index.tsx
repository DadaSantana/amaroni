//import react
import * as React from 'react';
//import styles
import { Content } from "./styles";
import { Gallery } from "react-grid-gallery";
import { Container } from 'react-bootstrap';
//import gallery component
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
//get service and type
import * as ServiceGallery from '../../services/gallery';
import { Gallery as TypeGallery } from '../../types/Gallery';
//import icons
import CloseIcon from '@mui/icons-material/Close';


export const GalleryContent = () => {
    const [gallery, setGallery] = React.useState<TypeGallery[]>([]);
    const [images,setImages] = React.useState<any[]>([]);
    const [data,setData] = React.useState<any[]>([]);
    //get all images from gallery
    React.useEffect(()=>{
        const getImagesFromGallery = async () => {
            setGallery(await ServiceGallery.getAll());
        } 
        getImagesFromGallery();
    }, []);

    React.useEffect(()=>{
        if (gallery.length > 0) {
            //create images for gallery
            let list: any = [];
            gallery.map((item, index)=>{
                let object = {
                    src: item.imageUrl,
                    width: 320,
                    height: 174,
                    isSelected: false,
                    caption: item.alt,
                    alt: item.alt,
                    tags: [
                        { value: item.tag, title: item.tag },
                    ]
                }
                list.push(object);
            });
            setImages(list);
            //create images for viewer
            let view: any = [];
            gallery.map((item, index)=>{
                let object = {
                    original: item.imageUrl,
                    thumbnail: item.imageUrl,
                    
                }
                view.push(object);
            });
            setData(view);
        }        
    }, [gallery]);

    React.useEffect(()=>{
        console.log(images);
    }, [images])

    const [show,setShow] = React.useState(false);
    const [first,setFirst] = React.useState(true);
    const [item,setItem] = React.useState(-1);

    const myRef = React.useRef<any | null>(null)

    React.useEffect(()=>{
        myRef.current.slideToIndex(item);
        if (!first) {
            setShow(true);
        }        
    }, [item]);

    const handleResetSettings = () => {
        setShow(false);
        setFirst(true);
        setItem(-1);
    }

    return(
        <Content>
            <Container>
                <ImageGallery 
                    className='float-gallery'
                    items={data} 
                    showFullscreenButton={false}
                    ref={myRef}
                />
            </Container>         
        </Content>
    );
}
