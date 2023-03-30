//import react
import * as React from 'react';
//import styles
import { Content } from "./styles";
//import components
import { Callbox } from './Callbox';
import { Callview } from './Callview';
import { ResolvedCalls } from './ResolvedCalls';

type Props = {
    render: string
}

export const SupportManager = ({render}:Props) => {
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
            {!callview && render === 'Callbox' &&
            <Callbox fn={handleEditView} />
            }
            {!callview && render === 'ResolvedCalls' &&
            <ResolvedCalls fn={handleEditView} />
            }
        </Content>
    );
}