//import react
import * as React from 'react';
//import styles
import { Content } from "./styles";
//import components
import { Callbox } from './Callbox';
import { Callview } from './Callview';


export const SupportManager = () => {
    const [callview,setCallview] = React.useState(false);
    const [id,setId] = React.useState('');
    const handleEditView = (fnid?: string) => {
        if (fnid != undefined) {
            setId(fnid);
        }        
        setCallview(true);
    }
    return(
        <Content>   
            {callview && 
            <Callview id={id} />
            }
            {!callview &&
            <Callbox fn={handleEditView} />
            }
        </Content>
    );
}