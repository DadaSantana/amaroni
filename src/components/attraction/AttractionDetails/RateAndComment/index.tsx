import * as React from 'react';
import { useNavigate } from "react-router-dom";
import { useAppSelector } from '../../../../redux/hooks/useAppSelector';
import { Content } from './styles';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import AddCommentIcon from '@mui/icons-material/AddComment';
import { RatingType } from '../../../../types/Rating';
import * as RatingService from '../../../../services/ratings';
import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { UserFirebase } from '../../../../types/Users';
import { monitorAuthState } from '../../../../services/auth';

type Props = {
    id: string | undefined
}

export const RateAndComment = ({id}:Props) => {
    const user = useAppSelector(state => state.user);
    const system = useAppSelector(state => state.system);
    const navigate = useNavigate();
    const [value, setValue] = React.useState<number | null>(0);
    const [ratings,setRatings] = React.useState<RatingType[]>([]);
    const [ratingSetted,setRatingSetted] = React.useState(false);
    const [showRatings,setShowRatings] = React.useState(false);
    const [noComments,setNoComments] = React.useState(false);
    const [loading,setLoading] = React.useState(true);
    const [state,setState] = React.useState(true);
    const [textarea,setTextarea] = React.useState('');
    const [open, setOpen] = React.useState(false);

    const [userFirebase,setUserFirebase] = React.useState<UserFirebase[]>([]);
    const [startProcess,setStartProcess] = React.useState(true);

    React.useEffect(()=>{
        if (startProcess) {
            const getUserFromFirebase = async () => {
                setUserFirebase(await monitorAuthState());
            }
            getUserFromFirebase();
        } else {
            setState(!state);
        }

    }, [state]);

    React.useEffect(()=>{
        if(userFirebase.length > 0) {
            setOpen(false);
            setStartProcess(false);
        } else {
            setLoading(!state);
        }
    },[userFirebase]);

    React.useEffect(()=>{
        const getComments = async () => {
            setLoading(false);
            setRatings(await RatingService.getRatingByLocalId(id))
        }
        getComments();
    },[]);
    React.useEffect(()=>{
        if (ratings.length > 0 && !ratingSetted) {
            setShowRatings(true);
            setLoading(false);
            setNoComments(false);
        } else {
            setNoComments(true);
            setLoading(false);
        }
    },[ratings]);

    const handleRegisterRating = async () => {
        if (id != undefined && value != null && value > 0) {
            setOpen(true);
            await RatingService.newRating(id, user.name, user.id, user.photo, value, textarea);
            setRatings(await RatingService.getRatingByLocalId(id));
            setTextarea('');
            setValue(0);
            setOpen(false);
        }
    }

    const handleGetRatingsPhoto = () => {
        return 'https://firebasestorage.googleapis.com/v0/b/amaroni-it.appspot.com/o/users%2Fuser-profile.png?alt=media&token=dcbee91e-dc29-4f04-9886-cd5db5f479f9';
    }

    return(        
        <Content>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <div className="comment-box">
                {loading && 
                <Box className="circular-progress" sx={{ display: 'flex' }}>
                    <CircularProgress />
                </Box>
                }
                {!loading && noComments &&
                <Box className="circular-progress" sx={{ display: 'flex' }}>
                    <p>
                        {system.language[system.current] == 'italian' ? 'Nessuna recensione trovata.' : null}
                        {system.language[system.current] == 'english' ? 'No reviews found.' : null}
                        {system.language[system.current] == 'germna' ? 'Keine Bewertungen gefunden.' : null}
                    </p>
                </Box>
                }
                {showRatings &&
                ratings.map((item,index)=>(
                    <div className="comment-item">
                        <div className="perfil">
                            <span 
                                className="user-photo"
                                style={{
                                    background: `url(${item.userPhoto})`,
                                    backgroundPosition: open ? '' : 'center',
                                    backgroundSize: open ? '' : 'cover',
                                    backgroundRepeat: open ? 'no-repeat' : 'none'
                                }}
                            />
                            <div className="name-and-rating">   
                                <span className="user-name">{item.userName}</span>
                                <span className="user-rating">
                                    <Rating name="read-only" value={item.userRating} readOnly />
                                </span>
                            </div>
                        </div>
                        <p className='user-comment'>{item.userComment}</p>
                    </div>
                ))
                }                
            </div>
            {system.login &&
            <div className="rating-box">
                <div className="perfil">
                    <span 
                        className="user-photo"
                        style={{
                            background: `url(${user.photo})`,
                            backgroundPosition: open ? '' : 'center',
                            backgroundSize: open ? '' : 'cover',
                            backgroundRepeat: open ? 'no-repeat' : 'none'
                        }}
                    />
                    <div className="name-and-rating">
                        <span className="user-name">{user.name}</span>
                        <span className="user-rating">
                            <Rating
                                name="simple-controlled"
                                value={value}
                                onChange={(event, newValue) => {
                                setValue(newValue);
                                }}
                            />
                        </span>
                    </div>
                </div>
                <textarea 
                    name="input-comment" 
                    cols={30}
                    rows={10} 
                    value={textarea}
                    onChange={(e)=>{
                        setTextarea(e.target.value);
                    }}
                />
                <Button 
                    type='submit' 
                    variant="contained"
                    color="success" 
                    startIcon={<AddCommentIcon />}
                    onClick={handleRegisterRating}
                >
                    {system.language[system.current] === 'italian' ? 'Salva' : null}
                    {system.language[system.current] === 'english' ? 'Save Comment' : null}
                    {system.language[system.current] === 'german' ? 'Kommentar speichern' : null}
                </Button>
            </div>
            }
            {!system.login &&
            <div className="rating-box">
                <p>
                    {system.language[system.current] === 'italian' ? 'Accedi per commentare e valutare questo luogo.' : null}
                    {system.language[system.current] === 'english' ? 'Login to comment and rate this place.' : null}
                    {system.language[system.current] === 'german' ? 'Melden Sie sich an, um diesen Ort zu kommentieren und zu bewerten.' : null}
                </p>
                <Button 
                type='submit' 
                variant="contained" 
                color="success" 
                startIcon={<AddCommentIcon />}
                onClick={()=>{
                    const element: HTMLElement | null = document.querySelector('.btn-login');
                    element?.click();
                }}
                >
                    {system.language[system.current] === 'italian' ? 'Accedi' : null}
                    {system.language[system.current] === 'english' ? 'Login' : null}
                    {system.language[system.current] === 'german' ? 'Anmeldung' : null}
                </Button>
            </div>
            }
            
        </Content>
    );
}