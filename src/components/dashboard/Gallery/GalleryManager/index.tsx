//import react
import * as React from 'react';
//import styles
import { Content } from "./styles";
//import icons




type Props = {
   en: boolean;
}

export const GalleryManager = ({en}: Props) => {
    return(
        <Content>   
            <h1>Componente em construção =D</h1>
            <p>Aqui será possível remover as imagens da galeria.</p>
            <p>A parte de adicionar imagens já está em pleno funcionamento!</p>
        </Content>
    );
}