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

import * as Photos from '../../../../services/photos';
import { Photo } from '../../../../types/Photo';

import * as Annun from '../../../../services/annuncios';
import { Annuncio } from '../../../../types/Annuncio';

//import components
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { truncate } from 'fs';
import { Container } from 'react-bootstrap';

type Props = {
    fn: () => void;
}

export const EventAdd = ({fn}: Props) => {
    //Backdrop
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(!open);
    };

    const [uploading, setUploading] = React.useState(false);
    const [photos, setPhotos] = React.useState<Photo[]>([]);
    const [state, setState] = React.useState(true);
    const [link,setLink] = React.useState<any[]>([])

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setOpen(true);

        const formData = new FormData(e.currentTarget);
        const file = formData.get('image') as File;

        if(file && file.size > 0) {
            setUploading(true);
            let result = await Photos.insertAnn(file);
            setUploading(false);
          
            if(result instanceof Error){
              alert(`${result.name} - ${result.message}`)
            } else {
                const name = formData.get('title') as string;
                const description = formData.get('description') as string;
                const dateStart = formData.get('dateStart') as string;
                const timeStart = formData.get('timeStart') as string;
                const dateEnd = formData.get('dateEnd') as string;
                const timeEnd = formData.get('timeEnd') as string;
                const address = formData.get('address') as string;
                const tel = formData.get('tel') as string;
                const email = formData.get('email') as string;
                
                await Annun.newAnnuncio(result.url,name,description,dateStart,timeStart,dateEnd,timeEnd,address,tel,email,link);
                
                setFormKey(formKey+1);
                setImgBlob('');
                setOpen(false);
                fn();
            }
        }      

    }

    const handleSimulateClick = (e: any) => {
        e.click();
    }

    const [imgSetted,setImgSetted] = React.useState(false);
    const [imgBlob,setImgBlob] = React.useState('');
    const [formKey,setFormKey] = React.useState(0);

    const handleSetLinks = (e: any[]) => {
        setLink(e);
    }
    return(
        <Content>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
            >
              <CircularProgress color="inherit" /> Evento di registrazione...
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
                    <div 
                        className="upload-image-event" 
                        onClick={(e)=>{
                            const element = e.currentTarget.lastChild;
                            console.log(element)
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
                            <label>Clicca qui per scegliere l'immagine</label>
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

                                            console.log(blob);
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
                            required
                            id="outlined-required"
                            label="Titolo dell'evento"
                            defaultValue=""
                        />
                    </div>
                    <div className="input-group">
                    <TextField
                        name='description'
                        className='multiline'
                        id="outlined-multiline-flexible"
                        label="Descrizione dell'evento"
                        multiline
                        maxRows={10}
                    />
                    </div>
                    <div className="input-group inline">
                        <div className="date-content">
                            <label htmlFor="dateInit">Data d'inizio:</label>
                            <input type="date" name="dateStart" id="dateInit" />
                            <input type="time" name="timeStart" id="timeStart" />
                        </div>
                        <div className="date-content">
                            <label htmlFor="dateEnd">Data di fine:</label>
                            <input type="date" name="dateEnd" id="dateEnd" />
                            <input type="time" name="timeEnd" id="timeEnd" />
                        </div>

                    </div>
                    <div className="input-group">
                        <TextField
                            className='address'
                            name='address'
                            required
                            id="outlined-required"
                            label="Indirizzo"
                            defaultValue=""
                        />
                        <TextField 
                            className='telephone'
                            name='tel'
                            id="outlined-basic" 
                            label="Numero di telefono" 
                            variant="outlined" 
                        />
                        <TextField
                            className='email'
                            name='email'
                            required
                            id="outlined-required"
                            label="E-mail"
                            defaultValue=""
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
                        Registra evento
                    </Button>
                </div>                             
            </Box>
        </Content>
    );
}