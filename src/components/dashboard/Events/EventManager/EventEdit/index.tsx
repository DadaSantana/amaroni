//import react
import * as React from 'react';
//import styles
import { Content } from './styles';

//import components
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { InsertLink } from './InsertLink';
//import icons 
import UploadIcon from '@mui/icons-material/Upload';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import BackupIcon from '@mui/icons-material/Backup';

import * as Photos from '../../../../../services/photos';
import { Photo } from '../../../../../types/Photo';

import * as Annun from '../../../../../services/annuncios';
import { Annuncio } from '../../../../../types/Annuncio';

//import components
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { truncate } from 'fs';
import { Container } from 'react-bootstrap';

type Props = {
    id: string
}

export const EditContent = ({id}: Props) => {
    //Backdrop
    const [open, setOpen] = React.useState(false);
    const [eventItem,setEditItem] = React.useState<Annuncio[]>([]);
    const handleClose = () => {
        setOpen(!open);
    };

    const [uploading, setUploading] = React.useState(false);
    const [link,setLink] = React.useState<any[]>([]);
    //Event values
    const [img,setImg] = React.useState('');
    const [title,setTitle] = React.useState('');
    const [description,setDescription] = React.useState('');
    const [dateStart,setDateStart] = React.useState('');
    const [timeStart,setTimeStart] = React.useState('');
    const [dateEnd,setDateEnd] = React.useState('');
    const [timeEnd,setTimeEnd] = React.useState('');
    const [address,setAddress] = React.useState('');
    const [tel,setTel] = React.useState('');
    const [email,setEmail] = React.useState('');

    React.useEffect(()=>{
        const getEventToEdit = async () => {
            setOpen(true);
            setEditItem(await Annun.getEventById(id));
        }
        getEventToEdit();
    },[])
    React.useEffect(()=>{
        if(eventItem.length > 0) {
            setImg(eventItem[0].imageUrl);
            setTitle(eventItem[0].name);
            setDescription(eventItem[0].description);
            setDateStart(eventItem[0].dateStart);
            setTimeStart(eventItem[0].timeStart);
            setDateEnd(eventItem[0].dateEnd)
            setTimeEnd(eventItem[0].timeEnd);
            setAddress(eventItem[0].address);
            setTel(eventItem[0].tel);
            setEmail(eventItem[0].email);
            setLink(eventItem[0].links);
            setOpen(false);
        }
    },[eventItem])

    const handleUpdateFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setOpen(true);

        const formData = new FormData(e.currentTarget);
        const file = formData.get('image') as File;
        console.log(file);

        if(file && file.size > 0) {
            setUploading(true);
            let result: any = await Photos.insertAnn(file);
            setUploading(false);
            console.log('entrou');
          
            if(result instanceof Error){
              alert(`${result.name} - ${result.message}`)
            } else {
                const imageUrl = result.url;
                console.log(imageUrl);
                await Annun.updateEventPhoto(imageUrl,id);
            }
        }

        const name = formData.get('title') as string;
        const description = formData.get('description') as string;
        const dateStart = formData.get('dateStart') as string;
        const timeStart = formData.get('timeStart') as string;
        const dateEnd = formData.get('dateEnd') as string;
        const timeEnd = formData.get('timeEnd') as string;
        const address = formData.get('address') as string;
        const tel = formData.get('tel') as string;
        const email = formData.get('email') as string;

        await Annun.updateEvent(id,name,description,dateStart,timeStart,dateEnd,timeEnd,address,tel,email,link);

        setTitle(name);
        setDescription(description);
        setDateStart(dateStart);
        setTimeStart(timeStart);
        setDateEnd(dateEnd)
        setTimeEnd(timeEnd);
        setAddress(address);
        setTel(tel);
        setEmail(email);
        setOpen(false);
    }

    const handleSimulateClick = (e: any) => {
        e.click();
    }

    const [imgSetted,setImgSetted] = React.useState(false);
    const [imgBlob,setImgBlob] = React.useState('');
    const [formKey,setFormKey] = React.useState(0);

    const [styleUrl,setStyleUrl] = React.useState({
        
    })


    const handleSetLinks = (e: any[]) => {
        setLink(e);
    }
    return(
        <Content>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
            >
              <CircularProgress color="inherit" /> Cadastrando Evento...
            </Backdrop>
            {!open &&
            <Box
                key={formKey}
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
                onSubmit={handleUpdateFormSubmit}
            > 
                <div className="input-top">
                    <div 
                        className={imgSetted ? 'upload-image-event' : 'upload-image-event'} 
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
                            <label>Clique aqui para escolher a imagem</label>
                        </span>
                        <input 
                            name='image'
                            type="file" 
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
                <div className="input-bottom">
                    <div className="input-group">
                        <TextField
                            className='title'
                            name='title'
                            id="outlined-required"
                            label="Titolo dell'evento"
                            defaultValue={title}
                        />
                    </div>
                    <div className="input-group">
                    <TextField
                        name='description'
                        className='multiline'
                        id="outlined-multiline-flexible"
                        multiline
                        maxRows={10}
                        defaultValue={description}
                    />
                    </div>
                    <div className="input-group inline">
                        <div className="date-content">
                            <label htmlFor="dateInit">Data d'inizio</label>
                            <input type="date" name="dateStart" id="dateInit" defaultValue={dateStart} />
                            <input type="time" name="timeStart" id="timeStart" defaultValue={timeStart} />
                        </div>
                        <div className="date-content">
                            <label htmlFor="dateEnd">Data di fine</label>
                            <input type="date" name="dateEnd" id="dateEnd" defaultValue={dateEnd} />
                            <input type="time" name="timeEnd" id="timeEnd" defaultValue={timeEnd} />
                        </div>
                    </div>
                    <div className="input-group">
                        <TextField
                            className='address'
                            name='address'
                            required
                            id="outlined-required"
                            label="Indirizzo"
                            defaultValue={address}
                        />
                        <TextField 
                            className='telephone'
                            name='tel'
                            id="outlined-basic" 
                            label="Numero di telefono" 
                            variant="outlined" 
                            defaultValue={tel}
                        />
                        <TextField
                            className='email'
                            name='email'
                            required
                            id="outlined-required"
                            label="E-mail"
                            defaultValue={email}
                        />
                    </div>
                    <div className="input-group">
                        <InsertLink link={link} setLink={setLink} />
                        <div className="box-item">
                            <div className="upper-add-file">
                                <input type="file" name="" id="" />                               
                            </div>
                            <div className="bottom-add-file">
                                <span className='file-item'>
                                    <label>file.pdf</label>
                                    <DeleteForeverIcon />
                                </span>
                            </div>
                        </div>
                    </div>
                    <Button type='submit' variant="contained" color="success" startIcon={<BackupIcon />}>
                    Salva le edizioni
                    </Button>
                </div>                             
            </Box>
            }

        </Content>
    );
}