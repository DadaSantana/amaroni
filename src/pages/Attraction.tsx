import * as React from 'react';


import { HomeHeader } from '../components/home/HomeHeader';
import { Footer } from '../components/home/Footer';
import { AttractionDetails } from '../components/attraction/AttractionDetails';

export const Attraction = () => {
    return(
        <div id='app'>
            <HomeHeader logged={false}/>
            <AttractionDetails />
            <Footer/>
        </div>
    );
}