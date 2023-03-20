//import react
import * as React from 'react';
//import styles
import { Content, EditGrid } from "./styles";
//get service and type
import * as ServiceGallery from '../../../../services/gallery';
import { Gallery as TypeGallery } from '../../../../types/Gallery';
//import components
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

export const GalleryManager = () => {
    //Backdrop
    const [open, setOpen] = React.useState(true);
    //get all images from gallery
    const [gallery, setGallery] = React.useState<TypeGallery[]>([]);
    const [service,setService] = React.useState(false);
    React.useEffect(()=>{
        const getImagesFromGallery = async () => {
            setOpen(true);
            setGallery(await ServiceGallery.getAll());
        } 
        getImagesFromGallery();
    }, [service]);

    React.useEffect(()=>{
        if (gallery.length > 0) {
            setOpen(false);
        } else {
            setOpen(false);
        }      
    }, [gallery]);

    const handleDeleteImage = async (id: string) => {
        await ServiceGallery.deleteGalleryPhoto(id);
        setService(!service);
    }

    return(
        <Content>   
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
            {!open &&
            <EditGrid>
                {gallery.map((item,index)=>(
                    <div 
                        className='item-gallery'
                        style={{
                            background: `url('${item.imageUrl}') center center / cover no-repeat`
                        }}
                    >
                        <span className='delete-item' onClick={()=>{handleDeleteImage(item.id)}}>
                            <DeleteForeverIcon />
                        </span>
                    </div>
                ))}
            </EditGrid>
            }
        </Content>
    );
}