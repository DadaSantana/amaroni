//import react
import * as React from 'react';
//import reducers from redux
import { useAppSelector } from '../../../../../redux/hooks/useAppSelector';
//import services and types
import * as Attractions from '../../../../../services/attractions';
import { Attraction } from '../../../../../types/Attraction';
import { Photo } from '../../../../../types/Photo';
import * as Photos from '../../../../../services/photos';
//import styles
import { Content } from "./styles";
//import components
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import UploadIcon from '@mui/icons-material/Upload';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useNavigate } from "react-router-dom";
import { currencies } from '../index';
import BackupIcon from '@mui/icons-material/Backup';
//import swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import { PhotoManager } from '../../../../PhotoManager';

type Props = {
    id: string
}

export const EditContent = ({id}:Props) => {
    const { isLoaded } = useLoadScript({ googleMapsApiKey: "AIzaSyCuYb09NVdhj70cCO_dQsLIid6nyzeOm-s", })
    //Backdrop
    const [open, setOpen] = React.useState(true);
    const [attEditItem,setAttEditItem] = React.useState<Attraction[]>([]);

    const [img,setImg] = React.useState('');
    const [name,setName] = React.useState('');
    const [type,setType] = React.useState('');
    const [address,setAddress] = React.useState('');
    const [tel,setTel] = React.useState('');
    const [website,setWebsite] = React.useState('');
    const [latitude,setLatitude] = React.useState(0);
    const [longitude,setLongitude] = React.useState(0);
    const [description,setDescription] = React.useState('');

    const [previewGallery, setPreviewGallery] = React.useState<any>([]);
    const [editItemsGallery, setEditItemsGallery] = React.useState<any>([]);
    const [settedPreview, setSettedPreview] = React.useState(false);
    const [auxPreview, setAuxPreview] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [imgSetted,setImgSetted] = React.useState(false);
    const [imgBlob,setImgBlob] = React.useState('');
    const [formKey,setFormKey] = React.useState(0);
    const [files,setFiles] = React.useState<FileList[]>([]);
    const [attPhotoQtd,setAttPhotoQtd] = React.useState(-1);
    const [attPhotos,setAttPhotos] = React.useState<any[]>([]);
    const [attPhotosAux,setAttPhotosAux] = React.useState<any[]>([]);
    const [attEditKey,setAttEditKey] = React.useState(true);
    const [qtdKey,setQtdKey] = React.useState(true);
    const [previewKey,setPreviewKey] = React.useState(true);
    const [stateRepeat,setStateRepeat] = React.useState(false);
    const [updatePreview,setUpdatePreview] = React.useState(false);

    const author = useAppSelector(state => state.user);

    React.useEffect(()=>{
        const getAttToEdit = async () => {
            setAttEditItem(await Attractions.getAttById(id));
        }
        getAttToEdit();
    },[])

    React.useEffect(()=>{
        if(attEditItem.length > 0) {
            setImg(attEditItem[0].imageUrl);
            setName(attEditItem[0].name);
            setName(attEditItem[0].name);
            setType(attEditItem[0].type);
            setAddress(attEditItem[0].address);
            setTel(attEditItem[0].tel);
            setTel(attEditItem[0].website);
            setLatitude(attEditItem[0].latitude)
            setLongitude(attEditItem[0].longitude);
            setDescription(attEditItem[0].description);
            setOpen(false);
        }
        const getAttPhotosQtd = async () => { 
            setAttPhotoQtd(await Attractions.getQtdAttPhotos(id));
        }
        getAttPhotosQtd();
    },[attEditItem]);
    
    React.useEffect(()=>{
        if (attPhotoQtd > 0 && qtdKey) {
            setQtdKey(false);
            const getAttPhotos = async () => { 
                setEditItemsGallery(await Attractions.getAttPhotos(id));
                setStateRepeat(!stateRepeat);
            }
            getAttPhotos();
        }
    },[attPhotoQtd]);

    React.useEffect(()=>{   
        if (previewGallery.length == attPhotoQtd && previewKey) {
            setPreviewKey(false);
            setSettedPreview(true);
            setLoading(false);
        } else {
            setStateRepeat(!stateRepeat);
        }
    },[stateRepeat])

    const [uploading, setUploading] = React.useState(false);


    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setOpen(true);

        const formData = new FormData(e.currentTarget);
        const file = formData.get('image') as File;

        console.log(file);

        if(file && file.size > 0) {
            setUploading(true);
            let result: any = await Photos.insertAtt(file);
            setUploading(false);
          
            if(result instanceof Error){
              alert(`${result.name} - ${result.message}`)
            } else {
                const imageUrl = result.url;
                let update = await Attractions.updateAttPhoto(imageUrl,id);
            }
        }

        const name = formData.get('name') as string;
        const type = formData.get('type') as string;
        const address = formData.get('address') as string;
        const tel = formData.get('tel') as string;
        const website = formData.get('website') as string;
        const description = formData.get('description') as string;

        let update = await Attractions.updateAttraction(id,name,type,address,tel,website,latitude,longitude,description,author.id,author.name);

        setName(name);
        setType(type);
        setAddress(address);
        setTel(tel);
        setLatitude(latitude)
        setLongitude(longitude);
        setDescription(description);

        if (previewGallery.length > 0) {
            previewGallery.map((item: any, index: number)=>(
                Attractions.addAttractionStorage(img, files[index])
            ));
        }
        
        alert('registro atualizado');
        setOpen(false);
    }

    const handleSimulateClick = (e: any) => {
        e.click();
    }

    React.useEffect(()=>{
        if (auxPreview) {
            setSettedPreview(true);
            setLoading(false);
        }
    }, [auxPreview]);

    const handleDeleteAttPhoto = (e: string, key: number) => {
        if (key > -1) { // only splice array when item is found
            editItemsGallery.splice(key, 1); // 2nd parameter means remove one item only 
            setSettedPreview(false);
            setLoading(true);
        }   
        const updatePreview = async () => {
            setUpdatePreview(await Attractions.deleteAttPhoto(e));
        }
        updatePreview();        
    }

    const handleDeletePreviewPhoto = (e: string, key: number) => {
        setSettedPreview(false);
        if (key > -1) { // only splice array when item is found
            previewGallery.splice(key, 1); // 2nd parameter means remove one item only 
        }         
        setSettedPreview(true); 
    }

    React.useEffect(()=>{
        setAttPhotoQtd(previewGallery.length);
        setQtdKey(true);
        setPreviewKey(true);
    },[updatePreview])

    return(
        <Content>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
            >
              <CircularProgress color="inherit" /> Cadastrando Local...
            </Backdrop>
            {!open &&
            <Box
                
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
                                background: imgSetted ? 
                                    `url('${imgBlob}') center center / cover no-repeat` : 
                                    `url('${img}') center center / cover no-repeat`
                                }
                            }
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
                    <div className="input-area right" key={formKey}>
                        <div className="input-content">
                            <TextField
                            name='name'
                            required
                            id="outlined-required"
                            label="Nome del luogo"
                            defaultValue={name}
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
                            defaultValue={type}
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
                            defaultValue={address}
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
                            defaultValue={tel}
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
                            defaultValue={website}
                            /> 
                        </div>
                        <div className="input-content">
                            {!isLoaded &&
                                <div>Caricamento...</div>
                            }
                            {isLoaded &&
                                <GoogleMap 
                                zoom={18} 
                                center={{lat: latitude, lng: longitude }}
                                mapContainerStyle={{flex: 1, minHeight: '300px'}}
                                onClick={(e) => {
                                    let newMarker = e.latLng;
                                    if (newMarker != null) {
                                        let str = newMarker.toString();
                                        let arrayStr: string[] = []
                                        arrayStr = str.split(",");
                                        let newLtn = arrayStr[0].substring(1);
                                        let newLng = arrayStr[1].replaceAll(")","");
                                        setLatitude(parseFloat(newLtn));
                                        setLongitude(parseFloat(newLng));
                                    } 
                                }}
                                >
                                    <Marker position={{lat: latitude, lng: longitude}} />
                                </GoogleMap>
                            }
                        </div>                         
                        <div className="input-content">
                            <TextField
                            name='description'
                            id="outlined-multiline-flexible"
                            label="Descrizione del luogo"
                            defaultValue={description}
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
                    <PhotoManager path='attractions' id={id} />
                    <div className="group-buttons">
                    <Button type='submit' variant="contained" color="success" startIcon={<BackupIcon />}>
                        Salva
                    </Button>
                    </div>
                </div>                             
            </Box>
            }

        </Content>
    );
}