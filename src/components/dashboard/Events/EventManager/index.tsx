//import react
import * as React from 'react';
import { EventTable } from './EventTable';
import { EditContent } from './EventEdit';
//import styles
import { Content } from "./styles";
//import icons




type Props = {
   en: boolean;
}

export const EventManager = ({en}: Props) => {
    //creat const variables
    const [editView,setEditView] = React.useState(false);
    const [id,setId] = React.useState('');

    const handleEditView = (fnid?: string) => {
        if (fnid != undefined) {
            setId(fnid);
            console.log(fnid);
        }        
        setEditView(!editView);
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
            <EventTable en={en} fn={handleEditView} />            
            </>
            }            
        </Content>
    );
}