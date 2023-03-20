//import react
import * as React from 'react';
import { Link, useNavigate } from "react-router-dom";
//import redux
import { useAppSelector } from '../../redux/hooks/useAppSelector';
import { useDispatch } from 'react-redux';
import { setPhoto, setPhone } from '../../redux/reducers/userReducers';
//import styles
import { Container } from "react-bootstrap";
import { Content } from "./styles";
//import components
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import Input from '@mui/material/Input';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
//import icons 
import EditIcon from '@mui/icons-material/Edit';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import BackupIcon from '@mui/icons-material/Backup';
//import user data from firebase
import { monitorAuthState, newPasswordUser } from '../../services/auth';
import { UserFirebase } from '../../types/Users';
import { InputFiles } from 'typescript';
//import types and services
import * as PhotoService from '../../services/photos';
import * as UserService from '../../services/users';
import { Photo } from '../../types/Photo';

export const UserPerfil = () => {
    const system = useAppSelector(state => state.system);
    const user = useAppSelector(state => state.user);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [userFirebase,setUserFirebase] = React.useState<UserFirebase[]>([]);
    const [open, setOpen] = React.useState(true);
    const [isChange,setIsChange] = React.useState(false);
    const [nameInput,setNameInput] = React.useState('');
    const [phoneInput,setPhoneInput] = React.useState('');
    const [startProcess,setStartProcess] = React.useState(true);
    const [loading,setLoading] = React.useState(false);

    React.useEffect(()=>{
        if (startProcess) {
            const getUserFromFirebase = async () => {
                setUserFirebase(await monitorAuthState());
                setStartProcess(false);
            }
            getUserFromFirebase();
        } else {
            setLoading(!loading);
        }

    }, [loading]);

    React.useEffect(()=>{
        console.log(userFirebase);
        if(userFirebase.length > 0) {
            setOpen(false);
            setStartProcess(false);
        } else {
            setLoading(!loading);
        }
    },[userFirebase]);

    React.useEffect(()=>{
        if (system.login === false) {
            navigate('/');
        } 
    }, [system.login]);

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
    };

    const [redefinePassword,setRedefinePassword] = React.useState(false);
    const [imgSetted,setImgSetted] = React.useState(false);
    const [imgBlob,setImgBlob] = React.useState('');
    const [file,setFile] = React.useState<File>();
    const handleSimulateClick = (e: any) => {
        e.click();
    }

    const handleUpdateImage = async () => {
        if(file && file.size > 0) {
            setOpen(true);
            let result: any = await PhotoService.inserUserPhoto(file);

          
            if(result instanceof Error){
              alert(`${result.name} - ${result.message}`)
            } else {
                const imageUrl = result.url;
                if (userFirebase[0].uid != null) {
                    let update = await UserService.updateUserPhoto(imageUrl,userFirebase[0].uid);
                    dispatch(setPhoto(imageUrl));
                    setOpen(false);
                }                
            }
        }
    }

    const [nameEdit,setNameEdit] = React.useState(false);
    const handleNameEdit = () => {
        setNameEdit(true);
        setIsChange(true);
    }

    const [phoneEdit,setPhoneEdit] = React.useState(false);
    const handlePhoneEdit = () => {
        setPhoneEdit(true);
        setIsChange(true);
    }

    const handleSubmitEdit = async () => {
        setOpen(true);
        if (nameEdit && userFirebase[0].uid != null) {
            await UserService.updateUserName(userFirebase[0].uid,nameInput);
        }
        if (phoneEdit && userFirebase[0].uid != null) {
            await UserService.updateUserPhone(userFirebase[0].uid,phoneInput);
            dispatch(setPhone(phoneInput));
        }
        if (nameEdit || phoneEdit) {
            navigate(0);
        }
    }

    const [newPassword,setNewPassword] = React.useState('');
    const [confirmNewPassword,setConfirmNewPassword] = React.useState('');

    const changePassword = async () => {
        console.log('entrou na função')
        if (newPassword != '' && confirmNewPassword != '') {
            console.log('tudo preenchido')
            if (newPassword == confirmNewPassword) {
                console.log('senhas conferem')
                await newPasswordUser(newPassword);
                alert('A senha foi alterada!');
                navigate(0);
            } else {
                alert('As senhas não conferem');
            }
        } 
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
            <Container>
                <div className="top-between">
                    <h4>
                        {system.language[system.current] === 'italian' ? 'Impostazioni utente' : null}
                        {system.language[system.current] === 'english' ? 'User settings' : null}
                        {system.language[system.current] === 'german' ? 'Benutzereinstellungen' : null}
                    </h4>
                    <Link to="/dashboard">
                        <SwapHorizIcon />
                        {system.language[system.current] === 'italian' ? 'Torna alla dashboard' : null}
                        {system.language[system.current] === 'english' ? 'Back to Dashboard' : null}
                        {system.language[system.current] === 'german' ? 'Zurück zum Dashboard' : null}
                    </Link>
                </div>                
                <div className="user-perfil">
                    <div className="user-photo">
                        <div 
                            className='image-preview'
                            style={{
                                background: imgSetted ? 
                                    `url('${imgBlob}') center center / cover no-repeat` : 
                                    `url('${userFirebase[0].photoURL}') center center / cover no-repeat`
                                }
                            }
                            onClick={(e)=>{
                                const element = e.currentTarget.lastChild;
                                handleSimulateClick(element);
                            }}
                        >
                            <span className='hover-image'>
                                <CameraAltIcon />
                                <label>
                                    {system.language[system.current] === 'italian' ? "Carica una foto" : null}
                                    {system.language[system.current] === 'english' ? 'Upload photo' : null}
                                    {system.language[system.current] === 'german' ? 'Foto hochladen' : null}
                                </label>
                            </span>
                            <input 
                                id='inputImageFile'
                                type="file" 
                                name='image' 
                                hidden 
                                onChange={(e)=>{
                                    setImgSetted(false);
                                    const fr = new FileReader();
                                    if (e.target.files != null) {
                                        const fileInput = (e.target.files[0]);
                                        setFile(e.target.files[0]);
                                        fr.readAsArrayBuffer(fileInput);
                                        fr.onload = function() {
                                            if (fr.result != null) {
                                                const blob = new Blob([fr.result], { type: "image/png" });
                                                const url = URL.createObjectURL(blob);
                                                setImgBlob(url);
                                                setImgSetted(true);
                                            }
                                        }                                   
                                    }
                                }}
                            />
                        </div>
                        <label>
                            {system.language[system.current] === 'italian' ? "Foto dell'utente" : null}
                            {system.language[system.current] === 'english' ? 'User photo' : null}
                            {system.language[system.current] === 'german' ? 'Benutzerfoto' : null}
                        </label>
                        {imgSetted &&
                        <Button variant="outlined" onClick={handleUpdateImage}>Change Photo</Button>  
                        }
                        
                    </div>
                    <div className="user-details">
                        <h5>
                            {system.language[system.current] === 'italian' ? 'Informazione personale' : null}
                            {system.language[system.current] === 'english' ? 'Personal information' : null}
                            {system.language[system.current] === 'german' ? 'Persönliche Angaben' : null}
                        </h5>
                        <div className="user-name">
                            <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                                <Input
                                    id="standard-adornment-password"
                                    type='text'
                                    endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        >
                                        {showPassword ? <EditIcon /> : <EditIcon />}
                                        </IconButton>
                                    </InputAdornment>
                                    }
                                    defaultValue={userFirebase[0].displayName}
                                    onChange={(e)=>{
                                        handleNameEdit();
                                        setNameInput(e.target.value);
                                    }}
                                />
                            </FormControl>
                        </div>                    
                        <TextField
                            id="standard-read-only-input"
                            label={
                                system.language[system.current] === 'italian' ? "E-mail dell'utente" :
                                system.language[system.current] === 'english' ? "User Email" :
                                system.language[system.current] === 'german' ? "Benutzer Email" : null
                            }
                            defaultValue={userFirebase[0].email}
                            InputProps={{
                                readOnly: true,
                            }}
                            variant="standard"
                        />
                        <div className="user-phone">
                            <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                                <InputLabel htmlFor="standard-adornment-password">Phone</InputLabel>
                                <Input
                                    id="standard-adornment-password"
                                    type='text'
                                    endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        >
                                        {showPassword ? <EditIcon /> : <EditIcon />}
                                        </IconButton>
                                    </InputAdornment>
                                    }
                                    defaultValue={user.phone}
                                    onChange={(e)=>{
                                        handlePhoneEdit();
                                        setPhoneInput(e.target.value);
                                    }}
                                />
                            </FormControl>
                        </div>  
                        <h5>
                            {system.language[system.current] === 'italian' ? 'Informazioni di sistema' : null}
                            {system.language[system.current] === 'english' ? 'System information' : null}
                            {system.language[system.current] === 'german' ? 'System Information' : null}
                        </h5>                     
                        <TextField
                            id="standard-read-only-input"
                            label={
                                system.language[system.current] === 'italian' ? "Permessi utente" :
                                system.language[system.current] === 'english' ? "User permissions" :
                                system.language[system.current] === 'german' ? "Benutzerberechtigungen" : null
                            }
                            defaultValue={
                                user.level.admin ? 
                                    system.language[system.current] === 'italian' ? "Amministratore" :
                                    system.language[system.current] === 'english' ? "Admin" :
                                    system.language[system.current] === 'german' ? "Administrator" : null :
                                user.level.member ? 
                                    system.language[system.current] === 'italian' ? "Membro" :
                                    system.language[system.current] === 'english' ? "Member" :
                                    system.language[system.current] === 'german' ? "Mitglied" : null  :
                                    system.language[system.current] === 'italian' ? "Ospite" :
                                    system.language[system.current] === 'english' ? "Guest" :
                                    system.language[system.current] === 'german' ? "Gast" : null

                            }
                            InputProps={{
                                readOnly: true,
                            }}
                            variant="standard"
                        />
                        <div className="redefine-password">
                            {redefinePassword &&
                            <>
                            <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                                <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                                <Input
                                    id="standard-adornment-password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={newPassword}
                                    onChange={(e)=>{
                                        setNewPassword(e.target.value);
                                    }}
                                    endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                    }
                                />
                            </FormControl>          
                            <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                                <InputLabel htmlFor="standard-adornment-password">Confirm Password</InputLabel>
                                <Input
                                    id="standard-adornment-password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={confirmNewPassword}
                                    onChange={(e)=>{
                                        setConfirmNewPassword(e.target.value);
                                    }}
                                    endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                    }
                                />
                            </FormControl>    
                            <Button variant="outlined" onClick={changePassword}>Change Passoword</Button> 
                            </>                            
                            }
                            {!redefinePassword &&
                            <Button variant="outlined" onClick={()=>{setRedefinePassword(true)}}>
                                {system.language[system.current] === 'italian' ? 'Ridefinisci password' : null}
                                {system.language[system.current] === 'english' ? 'Redefine password' : null}
                                {system.language[system.current] === 'german' ? 'Passwort neu definieren' : null}
                            </Button>  
                            }                               
                        </div>
                        <Button 
                            className={isChange ? '' : 'disable'}  
                            type='submit' 
                            variant="contained" 
                            color="success" 
                            startIcon={<BackupIcon />}
                            onClick={()=>{
                                if (isChange) {
                                    handleSubmitEdit();
                                }
                            }}
                        >
                            {system.language[system.current] === 'italian' ? 'Salva' : null}
                            {system.language[system.current] === 'english' ? 'Save' : null}
                            {system.language[system.current] === 'german' ? 'Speichern' : null}
                        </Button>
                    </div>                                                                 
                </div>            
            </Container>
            }            
        </Content>
    );
}