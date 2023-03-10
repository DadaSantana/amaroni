import * as React from 'react';
import { HomeHeader } from '../components/home/HomeHeader';
import { GalleryContent } from '../components/gallery';
import { Footer } from '../components/home/Footer';


export const Gallery = () => {
    
    const [en, setEn] = React.useState(false);

    const handleLanguage = (current: boolean) => {
        if (current) {
          setEn(false);
        } else {
          setEn(true);
        }
    }
    return(
        <>
        <HomeHeader logged={false} />
        <GalleryContent />
        <Footer/>
        </>
    );
}