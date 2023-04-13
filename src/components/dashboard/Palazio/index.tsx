import * as React from 'react';
//impor styles
import { Content } from './styles';
import { Container } from 'react-bootstrap';
import { NewsManager } from './NewsManager';
import { PhotoManager } from '../../PhotoManager';
import { InsertLink } from '../../InsertLinks';
import Button from '@mui/material/Button';
import { insertLinkFirestore, getLinks } from '../../../services/links';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

export const Palazio = () => {
    const [loading, setLoading] = React.useState(true);
    const [links,setLinks] = React.useState<any[]>([]);
    const [open, setOpen] = React.useState(true);
    const [mainContent,setMainContent] = React.useState(true);
    const [confirm,setConfirm] = React.useState(false);

    React.useEffect(()=>{
        const getLinksFirestore = async () => {
            setLinks(await getLinks('palazzo','main'));
            setLoading(false);
            setOpen(false);
        }
        getLinksFirestore();
    },[])

    const handleSubmitLink = async () => {
        setOpen(true);
        setConfirm(true);
        await insertLinkFirestore('palazzo','main',links);
        setOpen(false);
    }
    return(
        <Content>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Container>
                <NewsManager mainContent={mainContent} fn={setMainContent} />
                {mainContent &&
                <>
                <h4>Galleria</h4>
                <PhotoManager path='palazio' sending={confirm} />
                <hr />
                <h4>Links</h4>
                {!loading &&
                <InsertLink link={links} setLink={setLinks} />
                }    
                <Button 
                    style={{marginTop: 10}} 
                    variant="contained" 
                    disabled={links.length === 0 ? true : false}
                    onClick={handleSubmitLink}
                >
                    Salva
                </Button>
                <hr />
                </>                
                }
                
            </Container>
        </Content>
    );
}