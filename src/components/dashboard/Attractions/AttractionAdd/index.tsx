//import react
import * as React from 'react';
//import reducers from redux
import { useAppSelector } from '../../../../redux/hooks/useAppSelector';
//import styles
import { Content } from './styles';
//import components
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import UploadIcon from '@mui/icons-material/Upload';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from "react-router-dom";
import { currencies } from '../AttractionManager';
import BackupIcon from '@mui/icons-material/Backup';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import * as Photos from '../../../../services/photos';
import { Photo } from '../../../../types/Photo';
import * as Attractions from '../../../../services/attractions';
//import swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import { PhotoManager } from '../../../PhotoManager';
import { v4 as createId } from 'uuid';

type Props = {
    fn: () => void;
}

export const AttractionAdd = ({fn}:Props) => {
    const { isLoaded } = useLoadScript({ googleMapsApiKey: "AIzaSyCuYb09NVdhj70cCO_dQsLIid6nyzeOm-s", })
    //Backdrop
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(!open);
    };

    const author = useAppSelector(state => state.user);

    const [uploading, setUploading] = React.useState(false);
    const [confirm,setConfirm] = React.useState(false);
    const [previewId,setPreviewId] = React.useState('');

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setOpen(true);

        const formData = new FormData(e.currentTarget);
        const file = formData.get('image') as File;
        let newId: any = createId();
        setPreviewId(newId);
        setConfirm(true);
        
        if(file && file.size > 0) {
            setUploading(true);
            let result: any = await Photos.insertAtt(file);
            setUploading(false);
          
            if(result instanceof Error){
              alert(`${result.name} - ${result.message}`)
            } else {
                const name = formData.get('name') as string;
                const type = formData.get('type') as string;
                const address = formData.get('address') as string;
                const tel = formData.get('tel') as string;
                const website = formData.get('website') as string;
                const map = formData.get('map') as string;
                const description = formData.get('description') as string;
                const imageUrl = result.url;

                let add = await Attractions.newAttraction(newId,imageUrl,name,type,address,tel,website,ltn,lng,description,author.id,author.name);

                if (previewGallery.length > 0) {
                    previewGallery.map((item: any, index: number)=>(
                        Attractions.addAttractionStorage(imageUrl, files[index])
                    ));
                }
                
                setFormKey(formKey+1);
                setImgBlob('');
                setOpen(false);
                fn();
            }
        }
    }

    const [previewGallery, setPreviewGallery] = React.useState<any>([]);
    const [settedPreview, setSettedPreview] = React.useState(false);
    const [auxPreview, setAuxPreview] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [imgSetted,setImgSetted] = React.useState(false);
    const [imgBlob,setImgBlob] = React.useState('');
    const [formKey,setFormKey] = React.useState(0);
    const [files,setFiles] = React.useState<FileList[]>([]);

    const handleSimulateClick = (e: any) => {
        e.click();
    }

    React.useEffect(()=>{
        if (auxPreview) {
            setSettedPreview(true);
            setLoading(false);
        }
    }, [auxPreview])

    const [ltn,setLtn] = React.useState(38.79369601315858);
    const [lng,setLng] = React.useState(16.448302046559704);
    
    return(
        <Content>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
            >
              <CircularProgress color="inherit" /> Posizione di registrazione...
            </Backdrop>
            <Box
                key={formKey}
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
                onSubmit={handleFormSubmit}
            > 
                <div className="input-top">
                    <div className="input-area left">
                        <div 
                            className="upload-image-attraction" 
                            onClick={(e)=>{
                                const element = e.currentTarget.lastChild;
                                handleSimulateClick(element);
                            }}
                            style={{
                                background: imgSetted ? `url('${imgBlob}')` : 'none',
                                backgroundPosition: imgSetted ? 'center' : 'none',
                                backgroundSize: imgSetted ? 'cover' : 'none',
                                backgroundRepeat: imgSetted ? 'no-repeat' : 'none'
                            }}
                        >
                            <span className='design-click'>
                                <UploadIcon />
                            </span>
                            <input 
                                type="file" 
                                name='image' 
                                hidden 
                                onChange={(e)=>{
                                    setImgSetted(false);
                                    const fr = new FileReader();
                                    if (e.target.files != null) {
                                        const file = e.target.files[0];
                                        fr.readAsArrayBuffer(file);
                                        fr.onload = function() {
                                            if (fr.result != null) {
                                                const blob = new Blob([fr.result], { type: "image/png" });
                                                const url = URL.createObjectURL(blob);
                                                setImgBlob(url);
                                                setImgSetted(true);
                                            }
                                        }                                   
                                    }
                                }}/>
                        </div>
                    </div>                   
                    <div className="input-area right">
                        <div className="input-content">
                            <TextField
                            name='name'
                            required
                            id="outlined-required"
                            label="Nome del luogo"
                            defaultValue=""
                            style={{
                                flex: '1',
                                marginRight: '20px'
                            }}
                            />    
                            <TextField
                            name='type'
                            id="outlined-select-currency"
                            select
                            label="Tipo"
                            defaultValue="Restaurant"
                            helperText=""
                            >
                            {currencies.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                {option.label}
                                </MenuItem>
                            ))}
                            </TextField>
                        </div>
                        <div className="input-content">
                            <TextField
                            name='address'
                            required
                            id="outlined-required"
                            label="Indirizzo"
                            defaultValue=""
                            style={{
                                flex: '1',
                                marginRight: '20px'
                            }}
                            />                    
                            <TextField
                            name='tel'
                            required
                            id="outlined-required"
                            label="Numero di telefono"
                            defaultValue=""
                            style={{
                                flex: '1',
                                marginRight: '20px'
                            }}
                            /> 
                            <TextField
                            name='website'
                            required
                            id="outlined-required"
                            label="Il Luogo"
                            defaultValue=""
                            /> 
                        </div>
                        <div className="input-content">
                            {!isLoaded &&
                                <div>Caricamento...</div>
                            }
                            {isLoaded &&
                                <GoogleMap 
                                zoom={18} 
                                center={{lat: 38.79369601315858, lng: 16.448302046559704}}
                                mapContainerStyle={{flex: 1, minHeight: '300px'}}
                                onClick={(e) => {
                                    let newMarker = e.latLng;
                                    if (newMarker != null) {
                                        let str = newMarker.toString();
                                        let arrayStr: string[] = []
                                        arrayStr = str.split(",");
                                        let newLtn = arrayStr[0].substring(1);
                                        let newLng = arrayStr[1].replaceAll(")","");
                                        setLtn(parseFloat(newLtn));
                                        setLng(parseFloat(newLng));
                                    } 
                                }}
                                >
                                    <Marker position={{lat: ltn, lng: lng}} />
                                </GoogleMap>
                            }
                        </div>                         
                        <div className="input-content">
                            <TextField
                            name='description'
                            id="outlined-multiline-flexible"
                            label="Descrizione del luogo"
                            multiline
                            maxRows={3}
                            style={{
                                flex: '1',
                                height: '100px'
                            }}
                            />
                        </div>                            
                    </div> 
                </div>
                <div className="input-bottom">
                    <PhotoManager path='attractions' id={previewId} sending={confirm} />
                    <div className="group-buttons">
                    <Button type='submit' variant="contained" color="success" startIcon={<BackupIcon />}>
                        Registra nuova posizione
                    </Button>
                    </div>
                </div>                             
            </Box>
        </Content>
    );
}