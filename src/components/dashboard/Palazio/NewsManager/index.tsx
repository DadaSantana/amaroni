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
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { v4 as createId } from 'uuid';
//import services
import * as ServiceNews from '../../../../services/news';
import * as PhotoService from '../../../../services/photos';
import { insertLinkFirestore, getLinks, existLink } from '../../../../services/links';
import { News } from '../../../../types/news';
//import from libs
import { db } from '../../../../libs/firebase';
import { doc, deleteDoc } from "firebase/firestore";
import { InsertLink } from '../../../InsertLinks';
import { PhotoManager } from '../../../PhotoManager';
import { Alert } from '../../../alert';

type Props = {
    mainContent: boolean,
    fn: any
}

export const NewsManager = ({mainContent, fn}:Props) => {
    const system = useAppSelector(state => state.system);
    const navigate = useNavigate();
    //Backdrop
    const [open, setOpen] = React.useState(false);
    const [showAlert,setShowAlert] = React.useState(false);
    const [variant,setVariant] = React.useState('');
    const [message,setMessage] = React.useState('');
    
    const [links,setLinks] = React.useState<any[]>([]);
    const [newLink,setNewLink] = React.useState<any[]>([]);
    const [linksNews,setLinksNews] = React.useState<any[]>([]);
    const [ulinks,setuLinks] = React.useState<any[]>([]);

    const [edit,setEdit] = React.useState(false);
    const [send,setSend] = React.useState(false);
    const [sendEdit,setSendEdit] = React.useState(false);
    const [fileUpload,setFileUpload] = React.useState<File>();
    const [imgSetted,setImgSetted] = React.useState(false);
    const [imgBlob,setImgBlob] = React.useState('');
    const [isChange,setIsChange] = React.useState(false);

    const [news,setNews] = React.useState<News[]>([]);
    const [loading,setLoading] = React.useState(true);
    const [loadingNewLinks,setLoadingNewLinks] = React.useState(true);

    const [id,setId] = React.useState('');
    const [title,setTitle] = React.useState('');
    const [description,setDescription] = React.useState('');
    const [address,setAddress] = React.useState('');
    const [telephone,setTelephone] = React.useState('');
    const [email,setEmail] = React.useState('');
    const [key,setKey] = React.useState(0);
    const [exist,setExist] = React.useState(false);
    const [confirm,setConfirm] = React.useState(false);

    React.useEffect(()=>{
        let newId: any = createId();
        setPreviewId(newId);
        const getNewsImages = async () => {
            setNews(await ServiceNews.getAll());
        }
        getNewsImages();
    },[]);
    React.useEffect(()=>{
        if (news.length > 0) {
            setLoading(false);
        }
    },[news]);

    React.useEffect(()=>{
        if (id != '') {
            const getLinksFirestore = async () => {
                setuLinks(await getLinks('news',id));
                setLoading(false);
            }
            getLinksFirestore();
        }
    },[id])
    
    const handleSimulateClick = (e: any) => {
        e.click();
    }

    const handleDeleteImage = async (id: string) => {
        setOpen(true);
        await PhotoService.deleteNews(id);
        navigate(0);
    }

    const [previewId,setPreviewId] = React.useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setOpen(true);

        const formData = new FormData(e.currentTarget);
        const title = formData.get('title') as string;
        const description = formData.get('description') as string;
        const address = formData.get('address') as string;
        const telephone = formData.get('telephone') as string;
        const email = formData.get('email') as string;
        const date = new Date();
        const d = date.getDate();
        const m = date.getMonth()+1;
        const y = date.getFullYear();
        const dateString = d+'-'+m+'-'+y;

        if (fileUpload != undefined) {
            if (title != '' || description != '') {
                const image = await PhotoService.insertNewsPhoto(fileUpload);
                if (image != undefined) {
                    await ServiceNews.setNews(previewId,image.url,title,description,address,telephone,email,newLink,dateString);
                    setConfirm(true);
                    setOpen(false);
                    setVariant('success');
                    setMessage("Registrato con successo!");
                    setShowAlert(true);
                    navigate(0);
                    setTimeout(()=>{
                      setShowAlert(false);   
                    },6000)  
                    setOpen(false);  
                } else {
                    setVariant('danger');
                    setMessage("Il titolo, l'indirizzo e la descrizione sono campi obbligatori.");
                    setShowAlert(true);
                    setTimeout(()=>{
                      setShowAlert(false);              
                    },6000)  
                    setOpen(false);
                }
            }
            
        } else {
            setVariant('danger');
            setMessage("Devi inserire un'immagine");
            setShowAlert(true);
            setTimeout(()=>{
              setShowAlert(false);              
            },6000)  
            setOpen(false);  
        }
    }

    const handleUpdateSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        setConfirm(true);
        e.preventDefault();
        setOpen(true);
        const formData = new FormData(e.currentTarget);
        const title = formData.get('utitle') as string;
        const description = formData.get('udescription') as string;
        const address = formData.get('uaddress') as string;
        const telephone = formData.get('utelephone') as string;
        const email = formData.get('uemail') as string;

        if (fileUpload != undefined) {
            const image = await PhotoService.insertNewsPhoto(fileUpload);
            if (image != undefined) {
                await ServiceNews.updateEventPhoto(image.url,id);
            }
        }
        await ServiceNews.updateEvent(id,title,description,address,telephone,email,linksNews);
        setOpen(false);
    }

    const handleRemoveItem = async (id: string) => {
        console.log(id);
        let result = window.confirm("Vuoi veramente eliminare questa notizia?");
        if (result) {
            await deleteDoc(doc(db, "news", id));
            navigate(0);
        }     
    }

    const handleSubmitLink = async () => {
        setOpen(true);
        await insertLinkFirestore('palazzo','main',links);
        setOpen(false);
    }

    const handleSubmitLinkNews = async (id:string) => {
        setOpen(true);
        await insertLinkFirestore('news',id,linksNews);
        setOpen(false);
    }

    const getNewsLinks = async (path:string, id:string) => {
        setLinksNews([]);
        setExist(await existLink(path,id));
        if (exist) {       
            setLinksNews(await getLinks(path,id)); 
        } 
        setLoadingNewLinks(false);
    }

    React.useEffect(()=>{
        if (linksNews.length > 0) {
            setLoadingNewLinks(false);
        }    
    },[linksNews])

    React.useEffect(()=>{
        const getLinksFirestore = async () => {
            setLinks(await getLinks('palazzo','main'));
            setLoading(false);
            setOpen(false);
        }
        getLinksFirestore();
    },[]);

    return(
        <Content>
            {showAlert &&
               Alert(variant,message)
            }
            {open &&
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            }
            <h4>News</h4>
            {!mainContent &&
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
                </div>
                {!edit &&
                <Box
                    key={0}
                    className='form-news-content'
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                    onSubmit={handleSubmit}
                >
                    <TextField 
                        id="outlined-basic" 
                        label={
                            system.language[system.current] === 'italian' ? "Titolo dell'evento" :
                            system.language[system.current] === 'english' ? "Event title" :
                            system.language[system.current] === 'german' ? 'Veranstaltungstitel' : null
                        }
                        variant="outlined" 
                        name='title'
                    />
                    <TextField
                        id="outlined-multiline-static"
                        label={
                            system.language[system.current] === 'italian' ? "Descrizione" :
                            system.language[system.current] === 'english' ? "Description" :
                            system.language[system.current] === 'german' ? 'Beschreibung' : null
                        }
                        multiline
                        rows={4}
                        name='description'
                    />
                    <TextField 
                        id="outlined-basic" 
                        label={
                            system.language[system.current] === 'italian' ? "Indirizzo" :
                            system.language[system.current] === 'english' ? "Address" :
                            system.language[system.current] === 'german' ? 'Adresse' : null
                        }
                        variant="outlined" 
                        name='address'
                    />
                    <div className="flex-inline">
                        <TextField 
                            id="outlined-basic" 
                            label={
                                system.language[system.current] === 'italian' ? "Contatto telefonico" :
                                system.language[system.current] === 'english' ? "Contact number" :
                                system.language[system.current] === 'german' ? 'Kontakt-Telefon' : null
                            }
                            variant="outlined" 
                            name='telephone'
                            style={{marginRight: 5}}
                        />
                        <TextField 
                            id="outlined-basic" 
                            label={
                                system.language[system.current] === 'italian' ? "E-mail" :
                                system.language[system.current] === 'english' ? "Email" :
                                system.language[system.current] === 'german' ? 'Email' : null
                            }
                            variant="outlined" 
                            name='email'
                            style={{marginLeft: 5}}
                        />
                    </div>
                    <PhotoManager path='news' id={previewId} sending={confirm} />
                    <InsertLink link={newLink} setLink={setNewLink} />  
                    <Button 
                        className='button-submit'
                        type='submit' 
                        variant="contained" 
                        color='info' 
                        startIcon={<BackupIcon />}
                    >
                        {system.language[system.current] === 'italian' ? 'Salva' : null}
                        {system.language[system.current] === 'english' ? 'Save' : null}
                        {system.language[system.current] === 'german' ? 'Speichern' : null}
                    </Button>
                </Box>
                }
                {edit && 
                <Box
                    key={1}
                    className='form-news-content'
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                    onSubmit={handleUpdateSubmit}
                >
                    <TextField 
                        id="outlined-basic" 
                        label={
                            system.language[system.current] === 'italian' ? "Titolo dell'evento" :
                            system.language[system.current] === 'english' ? "Event title" :
                            system.language[system.current] === 'german' ? 'Veranstaltungstitel' : null
                        }
                        variant="outlined" 
                        name='utitle'
                        defaultValue={title}
                    />
                    <TextField
                        id="outlined-multiline-static"
                        label={
                            system.language[system.current] === 'italian' ? "Descrizione" :
                            system.language[system.current] === 'english' ? "Description" :
                            system.language[system.current] === 'german' ? 'Beschreibung' : null
                        }
                        multiline
                        rows={4}
                        name='udescription'
                        defaultValue={description}
                    />
                    <TextField 
                        id="outlined-basic" 
                        label={
                            system.language[system.current] === 'italian' ? "Indirizzo" :
                            system.language[system.current] === 'english' ? "Address" :
                            system.language[system.current] === 'german' ? 'Adresse' : null
                        }
                        variant="outlined" 
                        name='uaddress'
                        defaultValue={address}
                    />
                    <div className="flex-inline">
                        <TextField 
                            id="outlined-basic" 
                            label={
                                system.language[system.current] === 'italian' ? "Contatto telefonico" :
                                system.language[system.current] === 'english' ? "Contact number" :
                                system.language[system.current] === 'german' ? 'Kontakt-Telefon' : null
                            }
                            variant="outlined" 
                            name='utelephone'
                            style={{marginRight: 5}}
                            defaultValue={telephone}
                        />
                        <TextField 
                            id="outlined-basic" 
                            label={
                                system.language[system.current] === 'italian' ? "E-mail" :
                                system.language[system.current] === 'english' ? "Email" :
                                system.language[system.current] === 'german' ? 'Email' : null
                            }
                            variant="outlined" 
                            name='uemail'
                            style={{marginLeft: 5}}
                            defaultValue={email}
                        />
                    </div>
                    <PhotoManager path='news' id={id} sending={confirm} />
                    <h4>Links</h4>
                    {!loadingNewLinks &&
                    <InsertLink link={linksNews} setLink={setLinksNews} />  
                    }
                    {loadingNewLinks &&
                    <CircularProgress />
                    }
                    <Button 
                        className='button-submit'
                        type='submit' 
                        variant="contained" 
                        color='info' 
                        startIcon={<BackupIcon />}
                    >
                        {system.language[system.current] === 'italian' ? 'Salva' : null}
                        {system.language[system.current] === 'english' ? 'Save' : null}
                        {system.language[system.current] === 'german' ? 'Speichern' : null}
                    </Button>
                </Box>
                }
            </div>
            }
            
            {mainContent &&
            <div className="edit-news-content">
                {loading &&
                <CircularProgress className='progress'/>
                }
                {!loading &&
                <div className="photo-grid">
                    <div 
                        className="item-gallery add"
                        onClick={()=>{
                            setLinksNews([]);
                            setImgBlob('');
                            setEdit(false);
                            fn(false);
                        }}
                    >
                        <div className="add-item">
                            <AddCircleIcon />
                            {system.language[system.current] === 'italian' ? 'Aggiungi' : null}
                            {system.language[system.current] === 'english' ? 'Add' : null}
                            {system.language[system.current] === 'german' ? 'Speichern' : null}
                        </div>
                    </div>
                    {news.map((item,index)=>(
                        <div 
                            className='item-gallery'
                            style={{
                                background: `url('${item.imageUrl}') center center / cover no-repeat`
                            }}
                        >
                            <span className='delete-item'>
                                <EditIcon 
                                    style={{marginRight: 10}}
                                    onClick={()=>{
                                        setLoadingNewLinks(true);
                                        setOpen(true);
                                        setKey(key+1);
                                        setImgBlob(item.imageUrl);
                                        setId(item.id);      
                                        setTitle(item.name);
                                        setDescription(item.description);
                                        setAddress(item.address);
                                        setTelephone(item.telephone);
                                        setEmail(item.email);
                                        getNewsLinks('news',item.id); 
                                        setImgSetted(true);
                                        setOpen(false);
                                        setEdit(true);
                                        fn(false);
                                    }}
                                />
                                <DeleteForeverIcon
                                    onClick={()=> {
                                        handleRemoveItem(item.id)
                                    }}
                                />
                            </span>
                        </div>
                    ))}
                </div>                        
                }                    
            </div>
            }
            <span 
                onClick={()=>{
                    setEdit(false);
                    fn(true);
                }}
            >                
                {system.language[system.current] === 'italian' ? 'Tornare indietro' : null}
                {system.language[system.current] === 'english' ? 'To go back' : null}
                {system.language[system.current] === 'german' ? 'Zurück zu gehen' : null}
            </span>
            <hr />            
        </Content>
    );
}