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
        value: 'Food',
        label: 'Food',
    },
    {
        value: 'Square',
        label: 'Square',
    },
    {
        value: 'Marketplace',
        label: 'Marketplace',
    },
    {
        value: 'Health',
        label: 'Health',
    },
    {
        value: 'Workshop',
        label: 'Workshop',
    },
    {
        value: 'Church',
        label: 'Church',
    },
    {
        value: 'Public Place',
        label: 'Public Place',
    },
];