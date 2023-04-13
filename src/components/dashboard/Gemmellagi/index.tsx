import * as React from 'react';
//impor styles
import { Content } from './styles';
import { Container } from 'react-bootstrap';
import { PhotoManager } from '../../PhotoManager';
import { InsertLink } from '../../InsertLinks';
import Button from '@mui/material/Button';
import { insertLinkFirestore, getLinks } from '../../../services/links';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

export const Gemmellagi = () => {
    const [open, setOpen] = React.useState(true);
    const [loading, setLoading] = React.useState(true);
    const [links,setLinks] = React.useState<any[]>([]);
    const [confirm,setConfirm] = React.useState(false);

    React.useEffect(()=>{
        const getLinksFirestore = async () => {
            setLinks(await getLinks('gemmellagio','rotkreuz'));
            setOpen(false);
            setLoading(false);
        }
        getLinksFirestore();
    },[])

    const handleSubmitLink = async () => {
        setOpen(true);
        await insertLinkFirestore('gemmellagio','rotkreuz',links);
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
                <PhotoManager path='gemmellagi' sending={confirm} />
                <hr />
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
            </Container>
        </Content>
    );
}