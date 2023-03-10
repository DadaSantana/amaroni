import * as React from 'react';
//import dispatch
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../../redux/hooks/useAppSelector';
import * as UserRed from '../../../redux/reducers/userReducers';
import * as appRed from '../../../redux/reducers/appReducer';
//impor styles
import { Content } from './styles';
//import icons
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import CloseIcon from '@mui/icons-material/Close';
//import swiper component
import { Swiper, SwiperSlide, useSwiperSlide  } from 'swiper/react';
import { Navigation } from 'swiper';

import { loginEmailPassword, createAccont } from '../../../services/auth';
import { useNavigate } from "react-router-dom";
import { SetStateAction } from 'react';

import * as UserService from '../../../services/users';


type Props = {
    fn: () => void;
    state: boolean
}

export const Auth = ({fn, state}: Props) => {
    const system = useAppSelector(state => state.system);
    const navigate = useNavigate();
    const [name, setName] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [showPassword, setShowPassword] = React.useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
    const dispatch: any = useDispatch();
    const [loading, setLoading] = React.useState(false);
    const [msgError, setMsgError] = React.useState(0);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

    const handleMouseDownConfirmPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const [loginError, setLoginError] = React.useState(false);

    const handleSubmit = async () => {
        setLoading(true);
        const user = await loginEmailPassword(name,password);

        if (user !=  null) {
            const loggedAccont: any = await UserService.getUidData(user.uid);

            dispatch(UserRed.setId(user.uid));
            dispatch(UserRed.setName(user.displayName));
            dispatch(UserRed.setEmail(user.email));            
            dispatch(appRed.setLogin(true));            
            dispatch(appRed.setToken(user.getIdToken));            
       

            if (loggedAccont.levels.admin) {
                dispatch(UserRed.setLevel({admin: true, member: false, guest: false}));
                navigate("/dashboard/events"); 
            } else if (loggedAccont.levels.member) {
                dispatch(UserRed.setLevel({admin: false, member: true, guest: false}));
                navigate("/dashboard/attractions");
            } else {
                dispatch(UserRed.setLevel({admin: false, member: false, guest: true}));
                setLoading(false);
                fn();
            }
                   
        } else {
            setLoginError(true);
            setLoading(false);
        }
    };
    const handleRegisterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        //create form Data
        const formData = new FormData(e.currentTarget);
        //Get values from inputs 
        const name = formData.get('name-register') as string;
        const email = formData.get('email-register') as string;
        const password = formData.get('password-register') as string;
        const confirmPassword = formData.get('confirm-password-register') as string;

        if (
            name == '' ||
            email == '' || 
            password == '' ||
            confirmPassword == ''
        ) {
            setMsgError(4);
            setLoginError(true);
            setLoading(false);
        } else if (password != confirmPassword) {
            setMsgError(3);
            setLoginError(true);
            setLoading(false);
        } else {
            let newAccount: any = await createAccont(name, email, password);
            if (newAccount) {       
                console.log(newAccount);
                const user = await loginEmailPassword(email,password);
                if (user !=  null) {
                    console.log(user);
                    dispatch(UserRed.setId(user.uid));
                    dispatch(UserRed.setName(user.displayName));
                    dispatch(UserRed.setEmail(user.email));

                    if (newAccount.levels.admin) {
                        dispatch(UserRed.setLevel({admin: true, member: true, guest: true}));
                        navigate("/dashboard/events"); 
                    } else if (newAccount.levels.member) {
                        dispatch(UserRed.setLevel({admin: false, member: true, guest: true}));
                        navigate("/dashboard/attractions");
                    } else {
                        dispatch(UserRed.setLevel({admin: false, member: false, guest: true}));
                        navigate("/");
                    }

                    dispatch(appRed.setLogin(true));
                           
                }
            }
        }

    };

    const swiperSlide = useSwiperSlide();

    return(
        <Content
            style={{
                visibility: state ? 'visible' : 'hidden',
                opacity: state ? '1' : '0'
            }}
        >                     
            <div className="login-content" >
                <span className='btn-action'>
                    <CloseIcon onClick={fn} />
                </span>                                
                <Swiper
                    // install Swiper modules
                    modules={[Navigation]}
                    navigation={ { enabled: true, nextEl: 'span.register' }}
                    slidesPerView={1}
                >
                    <SwiperSlide className='slide-item'>
                        <h2>
                            {system.language[system.current] == 'italian' ? 'Login' : null}
                            {system.language[system.current] == 'english' ? 'Login' : null}
                            {system.language[system.current] == 'german' ? 'Einloggen' : null}
                        </h2>
                        <div 
                            className="alert-error"
                            style={{visibility: loginError ? 'visible' : 'hidden'}}
                        >
                            <span>
                                {system.language[system.current] == 'italian' ? 'Il nome utente o la password non sono validi. Riprova.' : null}
                                {system.language[system.current] == 'english' ? 'Username or password is invalid. Try again.' : null}
                                {system.language[system.current] == 'german' ? 'Der Benutzername oder das Passwort ist ungültig. Versuchen Sie es erneut.' : null}
                            </span>
                        </div>
                        <Box
                            className='input-login'
                            component="form"
                            sx={{
                                '& > :not(style)': { m: 1, width: '25ch' },
                            }}
                            defaultValue=""
                            noValidate
                            autoComplete="off"
                            >
                            <TextField 
                                id="outlined-basic" 
                                className={loginError ? 'input-login error' : 'email-login'}
                                label={
                                    system.language[system.current] == 'italian' ? 'E-mail' :
                                    system.language[system.current] == 'english' ? 'E-mail' :
                                    system.language[system.current] == 'german' ? 'Email' : null
                                } 
                                variant="outlined"
                                value={name}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                    setName(event.target.value);
                                }} 
                            />
                        </Box>
                        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">
                                {system.language[system.current] == 'italian' ? "Parola d'ordinel" : null}
                                {system.language[system.current] == 'english' ? 'Password' : null}
                                {system.language[system.current] == 'german' ? 'Passwort' : null}
                            </InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                className={loginError ? 'input-login error' : 'email-login'}
                                type={showPassword ? 'text' : 'password'}
                                endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                    >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                                }
                                label={
                                    system.language[system.current] == 'italian' ? "Parola d'ordinel" :
                                    system.language[system.current] == 'english' ? 'Password' :
                                    system.language[system.current] == 'german' ? 'Passwort' : null
                                }
                                value={password}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                    setPassword(event.target.value);
                                }} 
                            />
                        </FormControl>
                        <Stack direction="row" spacing={2}>
                            <Button 
                                className='btn-submit' 
                                variant="contained"
                                onClick={handleSubmit}
                            >
                                {system.language[system.current] == 'italian' ? 'Registrazione' : null}
                                {system.language[system.current] == 'english' ? 'Sign in' : null}
                                {system.language[system.current] == 'german' ? 'Anmelden' : null}
                            </Button>
                        </Stack>
                        <span className='loading-auth' style={{visibility: loading ? 'visible' : 'hidden'}}>
                            {system.language[system.current] == 'italian' ? 'Caricamento...' : null}
                            {system.language[system.current] == 'english' ? 'Loading...' : null}
                            {system.language[system.current] == 'german' ? 'Wird geladen...' : null}
                        </span>
                        <a href="">
                            {system.language[system.current] == 'italian' ? 'Recupera la password' : null}
                            {system.language[system.current] == 'english' ? 'Recover Password' : null}
                            {system.language[system.current] == 'german' ? 'Ihr Passwort wiederherstellen' : null}    
                        </a>
                        <span 
                            className='register'
                        >
                            {system.language[system.current] == 'italian' ? 'Creare il mio account' : null}
                            {system.language[system.current] == 'english' ? 'Create my account' : null}
                            {system.language[system.current] == 'german' ? 'Erstelle meinen Account' : null}   
                        </span>
                    </SwiperSlide>
                    <SwiperSlide className='slide-item'>
                        <h2>
                            {system.language[system.current] == 'italian' ? 'Registrati' : null}
                            {system.language[system.current] == 'english' ? 'Register' : null}
                            {system.language[system.current] == 'german' ? 'Registrieren' : null} 
                        </h2>
                        <div 
                            className="alert-error"
                            style={{visibility: loginError ? 'visible' : 'hidden'}}
                        >
                            {msgError == 3 &&
                            <span>
                                {system.language[system.current] == 'italian' ? 'Le password inserite non corrispondono' : null}
                                {system.language[system.current] == 'english' ? 'The passwords entered do not match' : null}
                                {system.language[system.current] == 'german' ? 'Die eingegebenen Passwörter stimmen nicht überein' : null}
                            </span>
                            }
                            {msgError == 4 &&
                            <span>
                                {system.language[system.current] == 'italian' ? 'Compila i campi richiesti (username, email e password)' : null}
                                {system.language[system.current] == 'english' ? 'Fill in the required fields (username, email and password)' : null}
                                {system.language[system.current] == 'german' ? 'Füllen Sie die erforderlichen Felder aus (Benutzername, E-Mail und Passwort)' : null}
                            </span>
                            }

                        </div>
                        <Box
                            className='input-login'
                            component="form"
                            method='POST'
                            sx={{
                                '& > :not(style)': { m: 1, width: '25ch' },
                            }}
                            defaultValue=""
                            noValidate
                            autoComplete="off"
                            onSubmit={handleRegisterSubmit}
                            >
                            <TextField 
                                name="name-register"
                                id="outlined-basic" 
                                label={
                                    system.language[system.current] == 'italian' ? 'Nome utente' :
                                    system.language[system.current] == 'english' ? 'Username' : 
                                    system.language[system.current] == 'german' ? 'Nutzername' : null
                                } 
                                variant="outlined"
                                type="text"
                                required={true}
                            />
                            <TextField 
                                name="email-register"
                                id="outlined-basic" 
                                label={
                                    system.language[system.current] == 'italian' ? 'E-mail' :
                                    system.language[system.current] == 'english' ? 'Email' : 
                                    system.language[system.current] == 'german' ? 'Email' : null
                                } 
                                variant="outlined"
                                type="email"
                                required={true}
                            />
                            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-password">
                                    {system.language[system.current] == 'italian' ? "Parola d'ordine" : null}
                                    {system.language[system.current] == 'english' ? 'Password' : null}
                                    {system.language[system.current] == 'german' ? 'Passwort' : null}  
                                </InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    name="password-register"
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                        aria-label="toggle confirm-password visibility"
                                        onClick={handleClickShowConfirmPassword}
                                        onMouseDown={handleMouseDownConfirmPassword}
                                        edge="end"
                                        >
                                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                    }
                                    label={
                                        system.language[system.current] == 'italian' ? "Parola d'ordine" : 
                                        system.language[system.current] == 'english' ? 'Password' :
                                        system.language[system.current] == 'german' ? 'Passwort' : null
                                    }
                                    required={true}
                                />                            
                            </FormControl>
                            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-confirm-password">
                                    {system.language[system.current] == 'italian' ? "Conferma password" : null}
                                    {system.language[system.current] == 'english' ? 'Confirm password' : null}
                                    {system.language[system.current] == 'german' ? 'Bestätige das Passwort' : null}  
                                </InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-confirm-password"
                                    name="confirm-password-register"
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                        aria-label="toggle confirm-password visibility"
                                        onClick={handleClickShowConfirmPassword}
                                        onMouseDown={handleMouseDownConfirmPassword}
                                        edge="end"
                                        >
                                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                    }
                                    label={
                                        system.language[system.current] == 'italian' ? "Conferma password" : 
                                        system.language[system.current] == 'english' ? 'Confirm password' :
                                        system.language[system.current] == 'german' ? 'Bestätige das Passwort' : null 
                                    }
                                    required={true}
                                />                            
                            </FormControl>
                            <span className='loading-auth' style={{visibility: loading ? 'visible' : 'hidden'}}>
                                {system.language[system.current] == 'italian' ? 'Caricamento...' : null}
                                {system.language[system.current] == 'english' ? 'Loading...' : null}
                                {system.language[system.current] == 'german' ? 'Wird geladen...' : null}
                            </span>
                            <Stack direction="row">
                                <Button 
                                    type='submit'
                                    className='btn-submit' 
                                    variant="contained"
                                >
                                    {system.language[system.current] == 'italian' ? "Registrati" : null}
                                    {system.language[system.current] == 'english' ? 'Sign In' : null}
                                    {system.language[system.current] == 'german' ? 'Eintragen' : null}
                                </Button>
                            </Stack>
                        </Box>
                        
                    </SwiperSlide>                    
                </Swiper> 
            </div>
        </Content>
    );
}