//import react
import * as React from 'react';
import { useAppSelector } from '../../redux/hooks/useAppSelector';
//import styles
import { Content } from './style';
//import MUI Components
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import CircularProgress from '@mui/material/CircularProgress';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import BackupIcon from '@mui/icons-material/Backup';
import Button from '@mui/material/Button';
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from 'swiper';
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
//import service
import { getPhotoStorage, insertPhotoComponent, deleteEventPhoto } from '../../services/photos';
import { Photo } from '../../types/Photo';
import { useNavigate } from 'react-router-dom';

type Props = {
    path: string,
    id?: string,
    sending: boolean
}

export const PhotoManager = ({path, id, sending}:Props) => {
    const system = useAppSelector(state=>state.system);
    const navigate = useNavigate();

    const [content,setContent] = React.useState('manager');
    const [storage,setStorage] = React.useState<Photo[]>([]);
    const [fileList,setFileList] = React.useState<any[]>([]);
    const [previewGallery,setPreviewGallery] = React.useState<any[]>([]);
    const [loadPreview,setLoadPreview] = React.useState(false);
    const [loadStorage,setLoadStorage] = React.useState(false);
    const [update,setUpdate] = React.useState(false);
    const [save,setSave] = React.useState(true);

    React.useEffect(()=>{
        if (fileList.length > 0) {
            console.log(fileList);
        }
    },[fileList]);

    React.useEffect(()=>{
        setTimeout(() => {
            if (previewGallery.length > 0) {
                console.log(previewGallery);
                setLoadStorage(false);
                setSave(false);
            } 
        }, 1000);
    },[previewGallery]);

    React.useEffect(()=>{
        if (content === 'manager') {
            const getPhotos = async () => {
                setLoadStorage(true);
                let aux: string = '';
                if (id != undefined) {
                    aux = path+'/'+id;
                } else {
                    aux = path;
                }
                
                setStorage(await getPhotoStorage(aux));
                if (storage.length === 0) {
                    setLoadStorage(false);
                }
                setUpdate(false);
            }
            getPhotos();
        }
    },[content]);

    React.useEffect(()=>{
        if (update) {
            setStorage([]);
            const getPhotos = async () => {
                let aux: string = '';
                if (id != undefined) {
                    aux = path+'/'+id;
                } else {
                    aux = path;
                }
                console.log(aux);
                setStorage(await getPhotoStorage(aux));
                setUpdate(false);
            }
            getPhotos();
        }
    },[update]);

    React.useEffect(()=>{
        if (storage.length > 0) {
            setLoadStorage(false);
        }
    },[storage])

    const handleSetContent = (type: string) => {
        setContent(type);
    }

    const handleDeleteImage = async (key: number) => {
        setLoadStorage(true);
        setTimeout(() => {
            if (key > -1) { // only splice array when item is found
                previewGallery.splice(key, 1); // 2nd parameter means remove one item only 
                let newPreview: any[] = previewGallery;
                setPreviewGallery([]);
                setPreviewGallery(newPreview);

                fileList.splice(key, 1); // 2nd parameter means remove one item only 
                let newFiles: any[] = previewGallery;
                setFileList([]);
                setFileList(newFiles);
                if (previewGallery.length === 0) {
                    setSave(true);
                }
                setLoadStorage(false);
            } 
        }, 1000);      
    }

    const handleSaveImages = async () => {
        setLoadStorage(true);

        if (fileList.length > 0) {
            for(let i = 0; i < fileList.length; i++) {
                await insertPhotoComponent(path,id,fileList[i]);
            }
        } 
        setFileList([]);
        setPreviewGallery([]);
        setSave(true)
        setUpdate(true);
        setLoadStorage(false);
    }

    React.useEffect(()=>{
        if (sending) {
            handleSaveImages();
        }
    },[sending])

    const handleDeletePhoto = async (path: string,name: string,key: number,id?: string) => {
        setLoadStorage(true);
        const response = window.confirm("Vuoi davvero eliminare questa immagine?");
        if (response) {
            if (key > -1) { // only splice array when item is found
                storage.splice(key, 1); // 2nd parameter means remove one item only 
                let newStorage: any[] = storage;
                setStorage([]);
                setStorage(newStorage);
            }                                          
            if (id != undefined) {
                await deleteEventPhoto(`${path}/${id}/${name}`);
            } else {
                await deleteEventPhoto(`${path}/${name}`);
            }
        }        
        setLoadStorage(false);         
    }

    return(
        <Content className='photo-manager'>
            <div className="tags">
                <div className="mode-buttons">
                    <span onClick={()=>{
                        const input = document.getElementById('file-input');
                        if (input != null) {
                            input.click();
                        }
                        
                    }}>
                        <AddAPhotoIcon />
                        <label>
                            {system.language[system.current] == 'italian' ? 'Aggiungere' : null}
                            {system.language[system.current] == 'english' ? 'To add' : null}
                            {system.language[system.current] == 'german' ? 'Hinzufügen' : null}
                        </label>
                        <input 
                        type="file" 
                        id='file-input'
                        hidden
                        multiple
                        name='preview' 
                        accept=".png, .jpg, .jpeg"
                        onChange={(e: React.FormEvent<HTMLInputElement>)=>{
                            setLoadStorage(true);
                            const currentFiles = e.currentTarget.files;
                            
                            let list: any[] = [];
                            let listFile: any[] = [];
                            if (currentFiles != null) {
                                for (let i = 0; i < currentFiles.length; i++) {
                                    listFile.push(currentFiles[i]);
                                }
                                if (fileList.length > 0) {
                                    let aux: any[] = [];
                                    for (let i = 0; i < fileList.length; i++) {
                                        aux.push(fileList[i]);
                                    }
                                    for (let i = 0; i < listFile.length; i++) {
                                        aux.push(listFile[i]);
                                    }
                                    setFileList([]);
                                    setFileList(aux);
                                } else {
                                    setFileList(listFile);
                                }

                                let files: FileList[] = [];
                                files.push(currentFiles);
                                for (let index = 0; index < files[0].length; index++) {
                                    const fr = new FileReader();
                                    const element: File = files[0][index];
                                    fr.readAsArrayBuffer(element);
                                    fr.onload = function() {
                                        if (fr.result != null) {
                                            const blob = new Blob([fr.result], { type: "image/png" });
                                            const url = URL.createObjectURL(blob);
                                            list.push(url);
                                        }
                                    }   
                                }  
                                setTimeout(()=>{
                                    if (previewGallery.length > 0) {
                                        let newArray: any[] = [];
                                        for (let index = 0; index < previewGallery.length; index++) {
                                            newArray.push(previewGallery[index]);
                                        }
                                        for (let index = 0; index < list.length; index++) {
                                            newArray.push(list[index]);
                                        }
                                        setPreviewGallery([]);                                    
                                        setPreviewGallery(newArray);                                    
                                    } else {
                                        setPreviewGallery(list);
                                    }
                                }, 500);   
                            }                                
                        }}/>
                    </span>
                </div>
                <div className="action-buttons">
                    <Button 
                        variant="contained"
                        onClick={()=>{
                            if (!save) {
                                handleSaveImages()
                            }
                        }}
                        disabled={save}
                    >
                        {system.language[system.current] == 'italian' ? 'Salva galleria' : null}
                        {system.language[system.current] == 'english' ? 'Save' : null}
                        {system.language[system.current] == 'german' ? 'Speichern' : null}
                    </Button>
                </div>
            </div>
            <main>
                {content === 'manager' &&
                <div className="manager-content">
                    <div className="preview">
                        {loadStorage &&
                            <CircularProgress />
                        }
                        {!loadStorage && storage.length == 0 && previewGallery.length == 0 &&
                            <p>
                                {system.language[system.current] == 'italian' ? 'Non ci sono file caricati.' : null}
                                {system.language[system.current] == 'english' ? 'There are no files loaded.' : null}
                                {system.language[system.current] == 'german' ? 'Es sind keine Dateien geladen.' : null}
                            </p>
                        }
                        {!loadStorage && storage.length === 0 && previewGallery.length > 0 &&
                        <div className='slide'>
                            <Swiper
                                key='modify-slide'
                                modules={[Navigation]}
                                slidesPerView={5}
                                loop={false}
                                spaceBetween={10}
                                navigation={true}
                                className="swiper-gallery"
                            >
                                {previewGallery.map((item,index)=>(
                                    <SwiperSlide 
                                        className='slide-item new'
                                        onClick={()=>{handleDeleteImage(index)}}
                                        style={{
                                            background: `url('${item}') center center / cover no-repeat`
                                        }}
                                    >
                                        <span className='delete-item'>
                                            <DeleteForeverIcon />
                                        </span>
                                    </SwiperSlide>
                                ))}                
                            </Swiper>
                        </div>                        
                        }  
                        {!loadStorage && storage.length > 0 && previewGallery.length === 0 &&
                        <div className='slide'>
                            <Swiper
                                key='modify-slide'
                                modules={[Navigation]}
                                slidesPerView={5}
                                loop={false}
                                spaceBetween={10}
                                navigation={true}
                                className="swiper-gallery"
                            >
                                {storage.map((item,index)=>(
                                    <SwiperSlide 
                                        className='slide-item'
                                        onClick={()=>{
                                            if (id != undefined) {
                                                handleDeletePhoto(path,item.name,index,id);
                                            } else {
                                                handleDeletePhoto(path,item.name,index)
                                            }                                           
                                        }}
                                        style={{
                                            background: `url('${item.url}') center center / cover no-repeat`
                                        }}
                                    >
                                        <span className='delete-item'>
                                            <DeleteForeverIcon />
                                        </span>
                                    </SwiperSlide>
                                ))}                
                            </Swiper>
                        </div>                        
                        }  
                        {!loadStorage && storage.length > 0 && previewGallery.length > 0 &&
                        <div className='slide'>
                            <Swiper
                                key='modify-slide'
                                modules={[Navigation]}
                                slidesPerView={5}
                                loop={false}
                                spaceBetween={10}
                                navigation={true}
                                className="swiper-gallery"
                            >
                                {previewGallery.map((item,index)=>(
                                    <SwiperSlide 
                                        className='slide-item new'
                                        onClick={()=>{
                                            handleDeleteImage(index);
                                        }}
                                        style={{
                                            background: `url('${item}') center center / cover no-repeat`
                                        }}
                                    >
                                        <span className='delete-item'>
                                            <DeleteForeverIcon />
                                        </span>
                                    </SwiperSlide>
                                ))}  
                                {storage.map((item,index)=>(
                                    <SwiperSlide 
                                        className='slide-item'
                                        onClick={()=>{
                                            if (id != undefined) {
                                                handleDeletePhoto(path,item.name,index,id);
                                            } else {
                                                handleDeletePhoto(path,item.name,index)
                                            }                                           
                                        }}
                                        style={{
                                            background: `url('${item.url}') center center / cover no-repeat`
                                        }}
                                    >
                                        <span className='delete-item'>
                                            <DeleteForeverIcon />
                                        </span>
                                    </SwiperSlide>
                                ))}                
                            </Swiper>
                        </div>                        
                        }                          
                    </div>
                </div>
                }
            </main>
        </Content>
    );
}