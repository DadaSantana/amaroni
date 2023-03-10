import * as React from 'react';
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

type Props = {
    id: string | undefined
}

export const RateAndComment = ({id}:Props) => {
    const user = useAppSelector(state => state.user);
    const system = useAppSelector(state => state.system);
    const [value, setValue] = React.useState<number | null>(0);
    const [ratings,setRatings] = React.useState<RatingType[]>([]);
    const [ratingSetted,setRatingSetted] = React.useState(false);
    const [showRatings,setShowRatings] = React.useState(false);
    const [noComments,setNoComments] = React.useState(false);
    const [loading,setLoading] = React.useState(true);
    const [textarea,setTextarea] = React.useState('');
    const [open, setOpen] = React.useState(false);

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
            await RatingService.newRating(id, user.name, user.email, value, textarea);
            setRatings(await RatingService.getRatingByLocalId(id));
            setTextarea('');
            setValue(0);
            setOpen(false);
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
            <div className="comment-box">
                {loading && 
                <Box className="circular-progress" sx={{ display: 'flex' }}>
                    <CircularProgress />
                </Box>
                }
                {!loading && noComments &&
                <Box className="circular-progress" sx={{ display: 'flex' }}>
                    <p>Sem comentários</p>
                </Box>
                }
                {showRatings &&
                ratings.map((item,index)=>(
                    <div className="comment-item">
                        <div className="perfil">
                            <span className="user-photo"/>
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
                    <span className="user-photo"/>
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
                    Registrar Avaliação
                </Button>
            </div>
            }
            {!system.login &&
            <div className="rating-box">
                <p>Faça login para comentar e avaliar este local.</p>
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
                    Fazer Login
                </Button>
            </div>
            }
            
        </Content>
    );
}