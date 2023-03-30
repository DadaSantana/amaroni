import * as React from 'react';
import { Content } from './styles';
import LabelImportantIcon from '@mui/icons-material/LabelImportant';

type Props = {
    vetor: any[]
}

export const Links = ({vetor}:Props) => {
    return(
        <Content>            
            <div className='content-box'>
                <h4>Links</h4>
                <ul>
                {vetor.map((item,index)=>(
                    <li>
                        <LabelImportantIcon />
                        <a href={item.hrefLink} target="_blank">{item.textLink}</a>
                    </li>
                ))}
                </ul>
            </div>
        </Content>
    );
}