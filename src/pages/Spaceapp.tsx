import * as React from "react";
import { sendNotification } from "../services/notifications";


export const Spaceapp = () => {
    React.useEffect(()=>{
        const notification = async () => {
            await sendNotification('será?','será mesmo?');
        }
        notification();
    },[])
    return(
        <h1>API</h1>
    )
}