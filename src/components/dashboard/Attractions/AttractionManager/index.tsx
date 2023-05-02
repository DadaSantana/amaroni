//import react
import * as React from 'react';
import { AttractionTable } from './AttactionTable';
import { EditContent } from './EditContent';
//import styles
import { Content } from "./styles";
//import icons




type Props = {
   en: boolean;
}

export const AttractionManager = ({en}: Props) => {
    //creat const variables
    const [editView,setEditView] = React.useState(false);
    const [id,setId] = React.useState('');

    const handleEditView = (fnid?: string) => {
        if (fnid != undefined) {
            setId(fnid);
        }        
        setEditView(true);
    }

    return(
        <Content>   
            {editView &&
            <>
            <EditContent id={id}/>            
            </>
            }   
            {!editView &&
            <>
            <AttractionTable en={en} fn={handleEditView} />            
            </>
            }            
        </Content>
    );
}

export const currencies = [
    {
        value: 'Art',
        label: 'Arte e Cultura',
    },
    {
        value: 'Food',
<<<<<<< HEAD
        label: 'Dove Mangiare',
    },
    {
        value: 'Square',
        label: 'Dove Dormire',
=======
        label: 'Cibo',
    },
    {
        value: 'Square',
        label: 'Piazza',
>>>>>>> c415e8aca664a869c148a9d52dfce3b6b3bf6b24
    },
    {
        value: 'Marketplace',
        label: 'Associazioni',
    },
    {
        value: 'Health',
        label: 'Salute',
    },
    {
        value: 'Public Place',
        label: 'Luogo pubblico',
    },
];