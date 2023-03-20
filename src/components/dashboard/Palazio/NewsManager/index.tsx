//import react
import * as React from 'react';
//import redux
import { useAppSelector } from '../../../../redux/hooks/useAppSelector';
import { useNavigate } from 'react-router-dom';
//import styles
import { Content } from "./styles";
//import MUI components
import UploadIcon from '@mui/icons-material/Upload';
import Button from '@mui/material/Button';
import BackupIcon from '@mui/icons-material/Backup';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
//import service
import * as PhotoService from '../../../../services/photos'
import { Photo } from '../../../../types/Photo';


export const NewsManager = () => {
    const system = useAppSelector(state => state.system);
    const navigate = useNavigate();
    //Backdrop
    const [open, setOpen] = React.useState(false);

    const [fileUpload,setFileUpload] = React.useState<File>();
    const [imgSetted,setImgSetted] = React.useState(false);
    const [imgBlob,setImgBlob] = React.useState('');
    const [isChange,setIsChange] = React.useState(false);

    const [photo,setPhoto] = React.useState<Photo[]>([]);
    const [loading,setLoading] = React.useState(true);

    React.useEffect(()=>{
        const getNewsImages = async () => {
            setPhoto(await PhotoService.getNews());
        }
        getNewsImages();
    },[]);
    React.useEffect(()=>{
        if (photo.length > 0) {
            setLoading(false);
        }
    },[photo])
    
    const handleSimulateClick = (e: any) => {
        e.click();
    }

    const handleInsertNews = async () => {
        if (fileUpload != undefined) {
            setOpen(true);
            await PhotoService.inserNewsImage(fileUpload);
            navigate(0);
        }       
    }

    const handleDeleteImage = async (id: string) => {
        setOpen(true);
        await PhotoService.deleteNews(id);
        navigate(0);
    }

    return(
        <Content>
            {open &&
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            }
            <h4>News</h4>
            <div className="news-section">
                <div className="upload-content">
                    <div 
                    className="upload-image-attraction" 
                    onClick={(e)=>{
                        const element = e.currentTarget.lastChild;
                        handleSimulateClick(element);
                    }}
                    style={{
                        background: imgSetted ? `url('${imgBlob}') center center / cover no-repeat` : 'none',
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
                                if (file != undefined) {
                                    setFileUpload(file);
                                }
                                fr.readAsArrayBuffer(file);
                                fr.onload = function() {
                                    if (fr.result != null) {
                                        const blob = new Blob([fr.result], { type: "image/png" });
                                        const url = URL.createObjectURL(blob);
                                        setImgBlob(url);
                                        setImgSetted(true);
                                        setIsChange(true);
                                    }
                                }                                   
                            }
                        }}/>
                    </div>
                    <Button 
                        className={isChange ? '' : 'disable'}  
                        type='submit' 
                        variant="contained" 
                        color={isChange ? 'success' : undefined} 
                        startIcon={<BackupIcon />}
                        onClick={()=>{
                            if (isChange) {
                                handleInsertNews();
                            }
                        }}
                    >
                        {system.language[system.current] === 'italian' ? 'Salva' : null}
                        {system.language[system.current] === 'english' ? 'Save' : null}
                        {system.language[system.current] === 'german' ? 'Speichern' : null}
                    </Button>
                </div>
                <div className="remove-news-content">
                    {loading &&
                    <CircularProgress className='progress'/>
                    }
                    {!loading &&
                        <div className="photo-grid">
                            {photo.map((item,index)=>(
                                <div 
                                    className='item-gallery'
                                    style={{
                                        background: `url('${item.url}') center center / cover no-repeat`
                                    }}
                                >
                                    <span className='delete-item' onClick={()=>{handleDeleteImage(item.name)}}>
                                        <DeleteForeverIcon />
                                    </span>
                                </div>
                            ))}
                        </div>                        
                    }
                    
                </div>
            </div>
            <hr />
            <h4>Links</h4>
            
        </Content>
    );
}