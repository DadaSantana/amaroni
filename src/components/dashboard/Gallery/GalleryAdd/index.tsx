//import react
import * as React from 'react';
//import styles
import { Content } from './styles';

//import components
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
//import icons 
import UploadIcon from '@mui/icons-material/Upload';

import * as Photos from '../../../../services/photos';
import { Photo } from '../../../../types/Photo';

import * as ServiceGallery from '../../../../services/gallery';
import { Gallery } from '../../../../types/Gallery';

//import components
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { truncate } from 'fs';
import { Container } from 'react-bootstrap';

type Props = {
    fn: () => void;
}

export const GalleryAdd = ({fn}: Props) => {
    //Backdrop
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(!open);
    };

    const [uploading, setUploading] = React.useState(false);
    const [photos, setPhotos] = React.useState<Photo[]>([]);
    const [state, setState] = React.useState(true);

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setOpen(true);

        const formData = new FormData(e.currentTarget);
        const file = formData.get('image') as File;

        if(file && file.size > 0) {
            setUploading(true);
            let result = await Photos.insertImageGallery(file);
            setUploading(false);
          
            if(result instanceof Error){
              alert(`${result.name} - ${result.message}`)
            } else {
                const title = formData.get('title') as string;
                const alt = formData.get('alt') as string;
                const tag = formData.get('tag') as string;
                
                let add = await ServiceGallery.addImage(result.url,title,alt,tag);
                
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

    return(
        <Content>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
            >
              <CircularProgress color="inherit" /> Adicionando imagem à galeria...
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
                            <label>Clique aqui para escolher a imagem</label>
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
                            label="Título da imagem"
                            defaultValue=""
                        />
                    </div>
                    <div className="input-group">
                        <TextField 
                            className='alt-input'
                            name='alt'
                            id="outlined-basic" 
                            label="Descrição resumida da imagem" 
                            variant="outlined" 
                        />
                    </div>
                    <div className="input-group">
                        <TextField
                            className='tag-input'
                            name='tag'
                            required
                            id="outlined-required"
                            label="Tag"
                            defaultValue=""
                        />
                    </div>
                    
                    <div className="group-buttons">
                        <input type="submit" value="Cadastrar" />
                    </div>
                </div>                             
            </Box>
        </Content>
    );
}