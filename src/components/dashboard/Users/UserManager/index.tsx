//import react
import * as React from 'react';
//import styles
import { Content } from "./styles";
//import icons
//import components
import { UsersTable } from './UsersTable';

export const UserManager = () => {
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
            {!editView &&
            <>
            <UsersTable fn={handleEditView} />            
            </>
            }   
{/*             {!editView &&
            <>
            <EventTable en={en} fn={handleEditView} />            
            </>
            }  */}
        </Content>
    );
}