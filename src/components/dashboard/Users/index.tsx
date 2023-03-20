//import react
import * as React from 'react';
//import styles
import * as C from "./styles";
//import icons
import AddIcon from '@mui/icons-material/Add';
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';
//import components
import { UserManager } from './UserManager';

export const Users = () => {

    return(
        <C.Content>
            <C.ViewContent>
                <UserManager />
            </C.ViewContent>
        </C.Content>
    );
}